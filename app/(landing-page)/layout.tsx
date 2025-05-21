// app/(landing-page)/layout.tsx
"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { ColorModeSwitch } from "@/components/color-mode-switcher";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useAuth();

  // Only show landing (no sidebar) if NOT logged in
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API!}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="relative min-h-screen">
          <div className="absolute right-4 top-4">
            <ColorModeSwitch />
          </div>
          {children}
        </div>
      </ThemeProvider>
    </ClerkProvider>
  );
}
