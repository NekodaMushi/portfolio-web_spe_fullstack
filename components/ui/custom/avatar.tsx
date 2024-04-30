// avatar.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

type UserProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

const Avatar: React.FC<UserProps> = ({ user }) => {
  return (
    <Link href="/profil">
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        <Image
          className="object-cover"
          src={user.image || "https://www.gravatar.com/avatar/?d=mp"}
          alt={user.name || "user profile image"}
          quality={100}
          priority={true}
          fill={true}
          sizes="40px"
        />
      </div>
    </Link>
  );
};

export default Avatar;
