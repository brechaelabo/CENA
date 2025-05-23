"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Sidebar from "./sidebar";
import { sidebarMenuItems } from "./sidebar-menu-items";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isLoaded) {
    return <div className="flex min-h-screen bg-background" />;
  }

  // Defina menuItems dinâmicos de acordo com user.publicMetadata.role se desejar.
  const menuItems = sidebarMenuItems;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        menuItems={menuItems}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        currentPath={pathname}
      />
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
