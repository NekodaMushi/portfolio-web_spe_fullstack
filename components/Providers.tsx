"use client";

import { MessagesProvider } from "@/context/messages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode, useState } from "react";
import AuthProvider from "@/components/AuthProvider";
import StoreProvider from "@/app/redux/StoreProvider";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <StoreProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <MessagesProvider>{children}</MessagesProvider>
        </QueryClientProvider>
      </AuthProvider>
    </StoreProvider>
  );
};

export default Providers;
