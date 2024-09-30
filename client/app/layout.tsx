import { ReactNode } from "react";
import { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
