import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "../components/ui/AdminSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminSidebar />
      <main className="w-screen">
        <SidebarTrigger />
        <ScrollArea>
          <div className="container mx-auto p-4 w-9/12">{children}</div>
        </ScrollArea>
      </main>
    </>
  );
}
