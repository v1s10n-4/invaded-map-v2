"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-3xl">Dashboard</h1>
          <Button asChild variant="outline">
            <Link href="/">Home</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back!</CardTitle>
              <CardDescription>
                {session.user.name ?? session.user.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-muted-foreground text-sm">
                    {session.user.email}
                  </p>
                </div>
                {session.user.emailVerified && (
                  <div>
                    <p className="font-medium text-sm">Email Status</p>
                    <p className="text-green-600 text-sm">Verified</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/account/settings">View Profile</Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href="/account/security">Security Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Protected Content</CardTitle>
            <CardDescription>
              This page is only accessible to authenticated users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              You are viewing protected content. Only authenticated users can
              see this information. Try signing out and accessing this page -
              you will be redirected to the sign-in page.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
