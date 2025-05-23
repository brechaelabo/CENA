"use client";
import { useState } from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Sidebar({
  menuItems,
  open,
  onOpenChange,
  currentPath,
}: {
  menuItems: Array<{ href: string; title: string }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPath: string;
}) {
  const { user } = useUser();

  return (
    <>
      {/* Botão hamburger para mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-muted p-2 rounded"
        onClick={() => onOpenChange(!open)}
        aria-label="Abrir menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-muted border-r z-40 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:block`}
        onClick={() => onOpenChange(false)}
      >
        <div className="p-4 border-b flex items-center gap-2">
          {user?.imageUrl && (
            <img src={user.imageUrl} className="h-10 w-10 rounded-full" />
          )}
          <div>
            <div className="font-bold">{user?.firstName}</div>
            <div className="text-xs">{user?.publicMetadata?.role}</div>
            <div className="text-xs">{user?.publicMetadata?.plan}</div>
          </div>
        </div>
        <nav className="flex flex-col p-4 gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded px-2 py-2 hover:bg-accent ${item.href === currentPath ? "bg-accent" : ""}`}
            >
              {item.title}
            </Link>
          ))}
          <div className="mt-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </nav>
      </aside>
    </>
  );
}
