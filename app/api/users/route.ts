

import { db, eq } from '@/db/index';
import { users } from "@/db/schema";
// import { getServerSession } from 'next-auth';

export async function GET(request: Request) {
  try {

    // const session = await getServerSession();
    // const userName = session.user.name

    const result = await db.select().from(users).where(eq(users.name, "Fabou"));
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error', error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
