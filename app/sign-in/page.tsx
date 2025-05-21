
"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn 
        afterSignInUrl={async () => {
          const user = await fetch('/api/user/role').then(r => r.json());
          return user.role === 'ADMIN' ? '/admin' : 
                 user.role === 'TUTOR' ? '/tutor' : '/ator';
        }}
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
