"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Invaded Map</CardTitle>
          <CardDescription>
            {session?.user
              ? `Hello, ${session.user.name ?? session.user.email}`
              : "Sign in to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {session?.user ? (
            <>
              <div className="rounded-lg border p-4">
                <p className="font-medium text-sm">Account Details</p>
                <p className="text-muted-foreground text-sm">
                  {session.user.email}
                </p>
                {session.user.image && (
                  <div
                    className="mt-2 size-16 rounded-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${session.user.image})` }}
                  />
                )}
              </div>
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/account/settings">Manage Account</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/api/auth/sign-out">Sign Out</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/auth/sign-up">Create Account</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
