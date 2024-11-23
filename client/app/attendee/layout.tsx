import { ReactNode } from "react";
import { Metadata } from "next";

import ReactQueryProvider from "@providers/ReactQueryProvider";

import Navbar from "@components/Common/Navbar";

import "./globals.scss";

export const metadata: Metadata = {
  title: "Quizzle | Attendee",
  description: "Quizzes For Everyone",
};

interface CreatorLayoutProps {
  children: ReactNode;
}

export default function CreatorLayout({ children }: CreatorLayoutProps) {
  return (
    <body>
      <Navbar url="/attendee" />
      <main>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </main>
    </body>
  );
}
