"use client";
import Image from "next/image";

const CHAT = () => {
  return (
    <div>
      <span>
        <Image
          className="h-10 w-10"
          src="/images/logos/chat.png"
          alt="CHAT"
          width={64}
          height={64}
          unoptimized={true}
        />
      </span>
    </div>
  );
};

export default CHAT;
