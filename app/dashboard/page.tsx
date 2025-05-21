"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.replace("/");
      return;
    }
    // Assume roles are in user.publicMetadata.role (string or array)
    const roles = user.publicMetadata.role || [];
    if (roles.includes("admin")) router.replace("/admin");
    else if (roles.includes("tutor")) router.replace("/tutor");
    else if (roles.includes("ator")) router.replace("/ator");
    else if (roles.includes("convidado")) router.replace("/convidado");
    else router.replace("/perfil"); // fallback profile page
  }, [user, isSignedIn, isLoaded, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <span>Carregando...</span>
    </div>
  );
}
