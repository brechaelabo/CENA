
"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp 
        afterSignUpUrl="/dashboard"
        appearance={{
          elements: {
            card: "bg-background",
            headerTitle: "text-foreground",
            headerSubtitle: "text-muted-foreground",
          }
        }}
      />
    </div>
  );
}
