"use server";

import { Progress } from "@/components/ui/progress";
import React from "react";
import { CustomIcon } from "../ui/icon";
import { Skill } from "@prisma/client";

interface SkillsProps {
  skillList: Skill[];
}
export default async function Skills({ skillList }: SkillsProps) {
  const frontendList = skillList.filter(
    (skill) => skill.category === "FRONTEND"
  );
  const backendList = skillList.filter((skill) => skill.category === "BACKEND");
  const toolList = skillList.filter((skill) => skill.category === "TOOL");
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg shadow-md" key={0}>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              {/* Frontend Icon */}
              Frontend
            </h3>
            <ul className="space-y-4">
              {frontendList.map((skill) => (
                <li key={skill.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="flex items-center space-x-2  rounded-full px-3 py-1">
                      <CustomIcon src={skill.icon} className="mr-1.5" />
                      {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                    </span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="w-full" />
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-lg shadow-md" key={1}>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              {/* Backend Icon */}
              Backend
            </h3>
            <ul className="space-y-4">
              {backendList.map((skill) => (
                <li key={skill.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="flex items-center space-x-2  rounded-full px-3 py-1">
                      <CustomIcon src={skill.icon} className="mr-1.5" />
                      {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                    </span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="w-full" />
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-lg shadow-md" key={2}>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              {/* Tool Icon */}
              Tools
            </h3>
            <ul className="grid grid-cols-2 gap-4">
              {toolList.map((skill) => (
                <li
                  key={skill.id}
                  className="flex items-center space-x-2  rounded-full px-3 py-1"
                >
                  <CustomIcon src={skill.icon} className="mr-1.5" />
                  <span>
                    {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
