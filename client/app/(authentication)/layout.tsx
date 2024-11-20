import { ReactNode } from "react";
import { Metadata } from "next";

import ReactQueryProvider from "@providers/ReactQueryProvider";

import Logo from "@components/Common/Logo";

import "./globals.scss";

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
      <main>
        <Logo />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </main>
    </body>
  );
}
