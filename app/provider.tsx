"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function Provider({ children }: { children?: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API!}
      fallbackRedirectUrl="https://28c30371-4b63-409a-ba1b-6b8598b6751c-00-31skkb4u0i5t.picard.replit.dev"
    >
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </ClerkProvider>
  );
}
