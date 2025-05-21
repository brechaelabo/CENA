"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function PageClient() {
  const router = useRouter();
  const { user } = useUser();

  React.useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="max-w-xs w-full">
        <h1 className="text-center text-2xl font-semibold">Welcome!</h1>
        <p className="text-center text-gray-500">
          {user?.emailAddresses[0]?.emailAddress}
        </p>
      </div>
    </div>
  );
}