import { auth, signOut } from "@/lib/auth/auth";

import { redirect } from "next/navigation";

import SignoutButton from "./sign-out-button";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/profil");
  }
  console.log(session.user);

  return (
    // <pre>{JSON.stringify(session.user, null, 2)}</pre>
    <>
      {session.user.id}
      {session.user.name}
      {session.user.email}
      {/* <Image src={session.user.image} /> */}
      <br />
      <SignoutButton
        signOut={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      />
    </>
  );
}
