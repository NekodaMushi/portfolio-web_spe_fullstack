import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { jetBrainsMono } from "../fonts";
import { ThemeProvider } from "@/components/themes/theme-provider";
import NavBar from "@/components/NavBar";
// const inter = Inter({ subsets: ["latin"] });
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "NexLearn | Interactive Video Based Learning",
  description:
    "Learn by challenging your knowledge with quizzes and recall method",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className={jetBrainsMono.variable}>
        <head>
          <link rel="icon" href="/favicon/favicon.ico" />
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <div className="p-8">{children}</div>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
