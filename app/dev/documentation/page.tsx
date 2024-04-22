import React from "react";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth/auth";

export const Documentation = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  return <div>Documentation</div>;
};

export default Documentation;
