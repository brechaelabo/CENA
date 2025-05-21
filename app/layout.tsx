import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "CENA Self-tape Club",
  description: "MVP de Selftape Club para atores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
