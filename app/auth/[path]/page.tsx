import { AuthView } from "@daveyplate/better-auth-ui";
import { authViewPaths } from "@daveyplate/better-auth-ui/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({ params }: PageProps<"/auth/[path]">) {
  const { path } = await params;
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthView path={path} />
    </div>
  );
}
