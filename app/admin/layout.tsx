"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { CircleUser, LucideProps, Mailbox, PencilRuler } from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

const items = [
  {
    title: "Basic Information",
    url: "/admin/about",
    icon: CircleUser,
  },
  {
    title: "Skills and Projects",
    url: "/admin/skillsandprojects",
    icon: PencilRuler,
  },
  {
    title: "Contact List",
    url: "/admin/contact",
    icon: Mailbox,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeItem, setActiveItem] = useState<{
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }>();
  return (
    <>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={activeItem?.title === item.title}
                        onClick={() => setActiveItem(item)}
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="w-screen">
          <SidebarTrigger />
          <ScrollArea>
            <div className="container mx-auto p-4 w-9/12">{children}</div>
          </ScrollArea>
        </main>
      </SidebarProvider>
    </>
  );
}
