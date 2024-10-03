import { ReactNode } from "react";
import { Metadata } from "next";

import "./globals.scss";

import Logo from "@components/Common/Logo";

export const metadata: Metadata = {
  title: "Quizzle | Authentication",
  description: "Authenticate Quizzle",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function AuthenticationLayout({ children }: RootLayoutProps) {
  return (
    <body>
      <Logo />
      <main>{children}</main>
    </body>
  );
}
