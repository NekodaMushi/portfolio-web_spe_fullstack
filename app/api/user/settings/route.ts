import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/db/index";
import { userSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "auth";

// Handle GET requests
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionUser = session.user;

    const settingsData = await db
      .select({
        settings: userSettings.settings,
        createdAt: userSettings.createdAt,
        updatedAt: userSettings.updatedAt,
      })
      .from(userSettings)
      .where(eq(userSettings.userId, sessionUser.id))
      .limit(1);

    if (settingsData.length === 0) {
      return NextResponse.json({ error: "No settings found for the user" }, { status: 404 });
    }

    // Set user settings in a cookie
    const response = NextResponse.json(settingsData[0], { status: 200 });
    
    response.cookies.set('userSettings', JSON.stringify(settingsData[0].settings), {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    });

    return response;
  } catch (error: any) {
    console.error("Error in user settings route (GET):", error);
    return NextResponse.json({ error: "Failed to handle user settings" }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionUser = session.user;
    const { settings } = await req.json();

    if (!settings) {
      return NextResponse.json({ error: "Missing settings data" }, { status: 400 });
    }

    await db
      .insert(userSettings)
      .values({
        userId: sessionUser.id,
        settings,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [userSettings.userId],
        set: { settings, updatedAt: new Date() },
      });

    // Update the cookie with the new settings
    const response = NextResponse.json({ message: "Settings updated" }, { status: 200 });
    response.cookies.set('userSettings', JSON.stringify(settings), {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    });

    return response;
  } catch (error: any) {
    console.error("Error in user settings route (POST):", error);
    return NextResponse.json({ error: "Failed to handle user settings" }, { status: 500 });
  }
}
