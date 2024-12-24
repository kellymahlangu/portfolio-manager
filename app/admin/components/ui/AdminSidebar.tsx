"use client";

import { NavUser } from "@/components/admin/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CircleUser, LucideProps, Mailbox, PencilRuler } from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

const items = [
  {
    title: "Basic Information",
    url: "/about",
    icon: CircleUser,
  },
  {
    title: "Skills and Projects",
    url: "/skillsandprojects",
    icon: PencilRuler,
  },
  {
    title: "Contact List",
    url: "/contact",
    icon: Mailbox,
  },
];
interface AdminSidebarProps {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined | undefined;
  };
}

const AdminSidebar = ({ user }: AdminSidebarProps) => {
  const [activeItem, setActiveItem] = useState<{
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }>();
  return (
    <Sidebar>
      <SidebarHeader>
        <NavUser
          user={{
            name: user.name,
            email: user.email,
            avatar: "",
          }}
        />
      </SidebarHeader>
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
  );
};

export default AdminSidebar;
