/* components/landing-page-header.tsx */
"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ColorModeSwitcher } from "./color-mode-switcher";
import { Button, buttonVariants } from "./ui/button";

interface NavItem {
  title: string;
  href: string;
  external?: boolean;
  disabled?: boolean;
}
interface HeaderProps {
  items: NavItem[];
}

function DesktopNav({ items }: { items: NavItem[] }) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="hidden gap-6 md:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.disabled ? "#" : item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          className={cn(
            "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
            item.href.startsWith(`/${segment}`)
              ? "text-foreground"
              : "text-foreground/60",
            item.disabled && "cursor-not-allowed opacity-60",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="md:hidden"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {open && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 animate-in slide-in-from-bottom-80 md:hidden">
          <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
            <nav className="grid gap-4 text-sm">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.disabled ? "#" : item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className={cn(
                    "w-full rounded-md p-2 font-medium hover:underline",
                    item.disabled && "cursor-not-allowed opacity-60",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default function LandingPageHeader({ items }: HeaderProps) {
  const { user } = useUser();

  /** se admin, injeta link “Admin” */
  const isAdmin = user?.publicMetadata?.role === "ADMIN";
  const fullMenu: NavItem[] = React.useMemo(
    () =>
      isAdmin ? [...items, { title: "Admin", href: "/admin/theme" }] : items,
    [items, isAdmin],
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo & Nav */}
        <div className="flex items-center gap-4">
          <Logo />
          <DesktopNav items={fullMenu} />
        </div>

        {/* Right-side controls */}
        <div className="flex items-center gap-2">
          <ColorModeSwitcher />
          <MobileNav items={fullMenu} />
          {/* Clerk UserButton já é exibido no header global (layout) */}
        </div>
      </div>
    </header>
  );
}
