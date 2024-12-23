"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import ProjectsTab from "@/app/admin/components/tabs/projects";
import SkillsTab from "@/app/admin/components/tabs/skills";

export default function ProjectsAndSkillsCard() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Skills And Projects</h1>
      <div className="h-[calc(100vh-100px)] overflow-hidden">
        <Card className="h-full">
          <CardContent className="h-full overflow-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <Tabs
                defaultValue="projects"
                className="w-full h-full flex flex-col"
              >
                <TabsList>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="projects"
                  className="flex-grow overflow-auto"
                >
                  <ProjectsTab />
                </TabsContent>
                <TabsContent value="skills" className="flex-grow overflow-auto">
                  <SkillsTab />
                </TabsContent>
              </Tabs>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
