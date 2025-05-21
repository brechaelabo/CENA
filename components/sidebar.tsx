
"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface SidebarProps {
  menuItems: Array<{
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPath: string;
}

export default function Sidebar({ menuItems, open, onOpenChange, currentPath }: SidebarProps) {
  const { user } = useUser();

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-background border"
        onClick={() => onOpenChange(!open)}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden",
          open ? "block" : "hidden"
        )}
        onClick={() => onOpenChange(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            {user?.imageUrl && (
              <img src={user.imageUrl} alt={user.fullName || ''} className="h-10 w-10 rounded-full" />
            )}
            <div className="flex flex-col">
              <span className="font-semibold">{user?.firstName}</span>
              <span className="text-xs text-muted-foreground">{user?.emailAddresses[0]?.emailAddress}</span>
            </div>
          </div>
        </div>

        <nav className="space-y-1 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md gap-3 transition-colors",
                currentPath === item.href 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-accent/50"
              )}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </aside>
    </>
  );
}
