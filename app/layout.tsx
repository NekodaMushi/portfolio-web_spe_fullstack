// import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { jetBrainsMono } from "../fonts";
import { ThemeProvider } from "@/components/themes/theme-provider";
import NavBar from "@/components/NavBar";
// const inter = Inter({ subsets: ["latin"] });
import AuthProvider from "@/components/AuthProvider";
import StoreProvider from "./redux/StoreProvider";

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
    <StoreProvider>
      <AuthProvider>
        <html lang="en" className={jetBrainsMono.variable}>
          <head>
            <link rel="icon" href="/favicon/favicon.ico" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            />
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
    </StoreProvider>
  );
}
