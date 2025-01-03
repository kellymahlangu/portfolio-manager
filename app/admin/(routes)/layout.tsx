"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "../components/ui/AdminSidebar";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { OrbitProgress } from "react-loading-indicators";
import { useTheme } from "next-themes";

export default function ProtectedLayout({
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

  if (data === null) {
    toast.error(
      "You have been loged out of your account please login to proceed"
    );
    redirect("/login");
  }
  return (
    <>
      <AdminSidebar user={data.user} />
      <main className="w-screen">
        <SidebarTrigger />
        <ScrollArea>
          <div className="container mx-auto p-4 w-9/12">{children}</div>
        </ScrollArea>
      </main>
    </>
  );
}
