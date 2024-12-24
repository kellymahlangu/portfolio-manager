"use client";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { OrbitProgress } from "react-loading-indicators";
import { useTheme } from "next-themes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const { data, isPending, error } = useSession();
  if (isPending) {
    return (
      <div className="absolute flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div>
            {theme === "light" ? (
              <OrbitProgress
                variant="spokes"
                color="#000000"
                size="large"
                text="loading..."
                textColor="#000000"
              />
            ) : (
              <OrbitProgress
                variant="spokes"
                color="#ffffff"
                size="large"
                text="loading..."
                textColor="#ffffff"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error(error.message);
  }

  if (data !== null) {

    redirect("/about");
  }
  return <>{children}</>;
}
