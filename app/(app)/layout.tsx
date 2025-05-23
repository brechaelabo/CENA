/* app/(app)/layout.tsx
   → CLIENT component porque usa useUser e dark-mode switch */
"use client";

import "../globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { useUser } from "@clerk/nextjs";
import { SidebarLayout } from "@/components/sidebar-layout";
import { ColorModeSwitch } from "@/components/color-mode-switcher";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isLoaded, user } = useUser();

  return (
    <ClerkProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <html lang="pt-BR">
          <body className="flex">
            <SignedIn>
              <SidebarLayout />
              <main className="flex-1 min-h-screen">{children}</main>
            </SignedIn>

            <SignedOut>
              {/* caso o usuário bata numa rota interna sem login */}
              <main className="w-full min-h-screen flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <p className="text-lg">Faça login para continuar.</p>
                  <ColorModeSwitch />
                </div>
              </main>
            </SignedOut>
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
