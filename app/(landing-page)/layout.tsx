import "../globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "../providers"; // import seu novo Providers
import { ColorModeSwitch } from "@/components/color-mode-switcher";

export const metadata: Metadata = {
  title: "CENA Self-tape Club",
  description: "Comunidade de atores para self-tapes e mentorias.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="pt-BR" className="scroll-smooth">
          <body>
            {/* Botão dark/light mode fixo no canto */}
            <div className="fixed right-4 top-4 z-50">
              <ColorModeSwitch />
            </div>
            {children}
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
