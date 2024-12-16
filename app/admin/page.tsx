"use client";
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
} from "@/components/ui/sidebar";
import AboutMeCard from "./components/AboutInfoForm";
import ProjectsAndSkillsCard from "./components/ProjectsAndSkills";
import { CircleUser, PencilRuler } from "lucide-react";
import { useState } from "react";

const items = [
  {
    title: "Basic Information",
    url: "#basic",
    content: <AboutMeCard />,
    icon: CircleUser,
  },
  {
    title: "Skills and Projects",
    url: "#skillsandprojects",
    content: <ProjectsAndSkillsCard />,
    icon: PencilRuler,
  },
];

function AdminPage() {
  const [activeItem, setActiveItem] = useState(items[0]);
  return (
    <>
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
                      isActive={activeItem.title === item.title}
                      onClick={() => setActiveItem(item)}
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
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
        <div className="container mx-auto p-4 w-9/12">{activeItem.content}</div>
      </main>
    </>
  );
}

export default AdminPage;
