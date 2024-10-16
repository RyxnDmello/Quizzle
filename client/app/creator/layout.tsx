import { ReactNode } from "react";
import { Metadata } from "next";

import "./globals.scss";

import Navbar from "@components/Common/Navbar";

export const metadata: Metadata = {
  title: "Quizzle | Creator",
  description: "Your Created Quizzes",
};

interface CreatorLayoutProps {
  children: ReactNode;
}

export default function CreatorLayout({ children }: CreatorLayoutProps) {
  return (
    <body>
      <Navbar name="Ryan Nolasco D Mello" url="/creator" />
      <main>{children}</main>
    </body>
  );
}
