import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { jetBrainsMono } from "../fonts";
import { ThemeProvider } from "@/components/themes/theme-provider";
import NavBar from "@/components/NavBar";
// const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className={jetBrainsMono.variable}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
      </head>
      <body className="bg-gray-400">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
