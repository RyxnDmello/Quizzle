import { ReactNode } from "react";
import { Metadata } from "next";

import "./globals.scss";
import AuthContextProvider from "@contexts/AuthContext";

export const metadata: Metadata = {
  title: "Quizzle",
  description: "Quizzes and Puzzles",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
