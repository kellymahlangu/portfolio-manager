import React from "react";
import Image from "next/image";
import { $Enums } from "@prisma/client";
import { CustomIcon } from "../ui/icon";
import { Button } from "../ui/button";

type project = {
  stack: {
    name: string;
    icon: string;
    id: number;
    level: number;
    category: $Enums.SkillCategory;
  }[];
} & {
  name: string;
  id: string;
  img: string;
  description: string;
  liveUrl: string;
  repoUrl: string | null;
  isOpenSource: boolean;
};
interface ProjectsProps {
  projects: project[];
}
export function Projects({ projects }: ProjectsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            className="border rounded-lg overflow-hidden shadow-md"
            key={index}
          >
            <Image
              src={project.img}
              width={30}
              height={45}
              alt={project.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-sm mb-4">{project.description}</p>
              <div className="flex space-x-2 mb-4">
                {project.stack.map((skill) => (
                  <span key={skill.id} className="text-2xl">
                    <CustomIcon src={skill.icon} className="mr-1.5" />
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <a href={project.liveUrl}>
                  <Button variant="default">Live Demo</Button>
                </a>
                {project.isOpenSource && (
                  <a href={`${project.repoUrl}`}>
                    <Button variant="secondary">View Code</Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
