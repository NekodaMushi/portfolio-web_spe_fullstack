import React from "react";
import Providers from "@/components/chat/Providers";
import Chat from "@/components/chat/Chat";

const ChatWithProviders: React.FC = () => {
  return (
    <Providers>
      <Chat />
    </Providers>
  );
};

export default ChatWithProviders;
