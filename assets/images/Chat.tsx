"use client";
import Image from "next/image";
import React from "react";

interface ChatProps {
  width?: number;
  height?: number;
}

const Chat: React.FC<ChatProps> = ({ width = 64, height = 64 }) => {
  return (
    <div>
      <span>
        <Image
          src="/images/logos/chat.png"
          alt="CHAT"
          width={width}
          height={height}
          unoptimized={true}
          priority
        />
      </span>
    </div>
  );
};

export default Chat;
