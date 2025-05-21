// app/admin/page.tsx
"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// ...import theme editor components

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata.role !== "admin") {
      router.replace("/");
    }
  }, [isLoaded, user, router]);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Painel do Administrador</h1>
      {/* Monthly theme editor and admin features go here */}
      {/* ... */}
    </main>
  );
}
