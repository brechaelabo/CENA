
'use client';

import { SidebarLayout } from "@/components/sidebar-layout";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || !user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return <SidebarLayout>{children}</SidebarLayout>;
}
