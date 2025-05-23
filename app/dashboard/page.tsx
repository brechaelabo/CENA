// app/dashboard/page.tsx
"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirect() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      const role = user.publicMetadata?.role;
      if (role === "ADMIN") router.replace("/admin");
      else if (role === "TUTOR") router.replace("/tutor");
      else if (role === "ATOR") router.replace("/ator");
      // ...etc.
    }
  }, [user, isLoaded, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-lg">Carregando...</span>
    </div>
  );
}
