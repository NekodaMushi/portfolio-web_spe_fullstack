import { auth, signOut } from "@/lib/auth/auth";

import { redirect } from "next/navigation";

import SignoutButton from "./sign-out-button";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/profil");
  }
  console.log(session.user);

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-sm rounded-lg border  p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              className="object-cover"
              src={
                session.user.image || "https://www.gravatar.com/avatar/?d=mp"
              }
              alt={session.user.name || "user profile image"}
              quality={100}
              priority={true}
              fill={true}
              sizes="40px"
            />
          </div>
          <h2 className="mb-2 text-xl font-semibold">{session.user.name}</h2>
          <p className="mb-4 text-gray-600">{session.user.email}</p>
          <SignoutButton
            signOut={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          />
        </div>
      </div>
    </div>
  );
}
