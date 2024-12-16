import { AppSidebar } from "@/components/common/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar />
      <main className="w-screen">
        <SidebarTrigger />
        {children}
      </main>
    </>
  );
}
