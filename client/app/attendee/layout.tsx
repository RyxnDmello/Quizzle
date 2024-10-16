import { ReactNode } from "react";
import { Metadata } from "next";

import "./globals.scss";

import Navbar from "@components/Common/Navbar";

export const metadata: Metadata = {
  title: "Quizzle | Attendee",
  description: "Your Completed Quizzes",
};

interface CreatorLayoutProps {
  children: ReactNode;
}

export default function CreatorLayout({ children }: CreatorLayoutProps) {
  return (
    <body>
      <Navbar name="Ryan Nolasco D Mello" url="/attendee" />
      <main>{children}</main>
    </body>
  );
}
