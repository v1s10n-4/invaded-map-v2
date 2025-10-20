"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { authClient } from "@/lib/auth-client";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      account
      authClient={authClient}
      avatar
      changeEmail
      deleteUser
      emailVerification
      gravatar
      Link={Link}
      navigate={router.push}
      onSessionChange={router.refresh}
      replace={router.replace}
    >
      {children}
    </AuthUIProvider>
  );
}
