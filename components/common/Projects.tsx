import { FaReact, FaNodeJs, FaPython, FaDatabase } from "react-icons/fa";
import { SiTailwindcss, SiTypescript } from "react-icons/si";
import React from "react";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  summary: string;
  image: string;
  techStack: string[];
  demoLink: string;
  codeLink: string;
};

// Sample project data
const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    summary:
      "A full-stack e-commerce solution with real-time inventory management.",
    image:
      "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
    techStack: ["react", "node", "mongodb"],
    demoLink: "https://demo.example.com",
    codeLink: "https://github.com/example/project",
  },
  {
    id: 2,
    title: "Task Management App",
    summary: "A responsive task manager with drag-and-drop functionality.",
    image:
      "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
    techStack: ["react", "typescript", "tailwind"],
    demoLink: "https://demo.example.com",
    codeLink: "https://github.com/example/project",
  },
  // Add more projects as needed
];

// Map tech stack strings to icons
const techStackIcons: { [key: string]: React.ReactNode } = {
  react: <FaReact className="w-6 h-6" />,
  node: <FaNodeJs className="w-6 h-6" />,
  python: <FaPython className="w-6 h-6" />,
  mongodb: <FaDatabase className="w-6 h-6" />,
  tailwind: <SiTailwindcss className="w-6 h-6" />,
  typescript: <SiTypescript className="w-6 h-6" />,
};

export function Projects() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div className="border rounded-lg overflow-hidden shadow-md" key={index}>
            <Image
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm mb-4">{project.summary}</p>
              <div className="flex space-x-2 mb-4">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-2xl">
                    {techStackIcons[tech]}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <a
                  href={project.demoLink}
                  className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100"
                >
                  Live Demo
                </a>
                <a
                  href={project.codeLink}
                  className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100"
                >
                  View Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
