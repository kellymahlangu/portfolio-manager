"use server";

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaToolbox,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiWebpack,
  SiFigma,
  SiExpress,
} from "react-icons/si";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { FiMonitor } from "react-icons/fi";
import { GrServerCluster } from "react-icons/gr";

type skill = {
  icon: React.JSX.Element | null;
  name: string;
  percent: number | null;
};

type category = {
  icon: React.JSX.Element;
  name: "frontend" | "backend" | "tools";
  tools: skill[];
};

const exampleSkills: category[] = [
  {
    name: "frontend",
    tools: [
      {
        icon: <SiJavascript className="mr-1.5" />,
        name: "javascript",
        percent: 80,
      },
      {
        icon: <SiTypescript className="mr-1.5" />,
        name: "typescript",
        percent: 75,
      },
      { icon: <FaReact className="mr-1.5" />, name: "react", percent: 85 },
      { icon: <SiHtml5 className="mr-1.5" />, name: "html", percent: 90 },
      { icon: <SiCss3 className="mr-1.5" />, name: "css", percent: 85 },
    ],
    icon: <FiMonitor className="mr-2" />,
  },
  {
    name: "backend",
    tools: [
      { icon: <SiPython className="mr-1.5" />, name: "python", percent: 65 },
      { icon: <FaNodeJs className="mr-1.5" />, name: "node.js", percent: 70 },
      {
        icon: <SiExpress className="mr-1.5" />,
        name: "express.js",
        percent: 65,
      },
      {
        icon: <SiPostgresql className="mr-1.5" />,
        name: "postgresql",
        percent: 70,
      },
      { icon: <SiMongodb className="mr-1.5" />, name: "mongodb", percent: 60 },
    ],
    icon: <GrServerCluster className="mr-2" />,
  },
  {
    name: "tools",
    tools: [
      { icon: <FaGitAlt className="mr-1.5" />, name: "git", percent: null },
      {
        icon: <SiWebpack className="mr-1.5" />,
        name: "webpack",
        percent: null,
      },
      { icon: <FaDocker className="mr-1.5" />, name: "docker", percent: null },
      { icon: <SiFigma className="mr-1.5" />, name: "figma", percent: null },
    ],
    icon: <FaToolbox className="mr-2" />,
  },
];

export default async function Skills() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exampleSkills.map((category, index) => {
            if (category.name === "tools") {
              return (
                <div className="p-6 rounded-lg shadow-md" key={index}>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    {category.icon}
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </h3>
                  <ul className="grid grid-cols-2 gap-4">
                    {category.tools.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center space-x-2  rounded-full px-3 py-1"
                      >
                        {skill.icon}
                        <span>
                          {skill.name.charAt(0).toUpperCase() +
                            skill.name.slice(1)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            return (
              <div className="p-6 rounded-lg shadow-md" key={index}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  {category.icon}
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </h3>
                <ul className="space-y-4">
                  {category.tools.map((skill) => (
                    <li key={skill.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="flex items-center space-x-2  rounded-full px-3 py-1">
                          {skill.icon}
                          {skill.name.charAt(0).toUpperCase() +
                            skill.name.slice(1)}
                        </span>
                        <span>{skill.percent}%</span>
                      </div>
                      <Progress value={skill.percent} className="w-full" />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
