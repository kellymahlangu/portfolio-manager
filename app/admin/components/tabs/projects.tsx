"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Project, PartialProject } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/app/actions";
import ProjectForm from "../ui/ProjectForm";
import { motion, AnimatePresence } from "framer-motion";

const ProjectsTab = () => {
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<PartialProject>({});
  const [editingProject, setEditingProject] = useState<
    Project | PartialProject | null
  >(null);
  const [isNewProjectCardVisible, setIsNewProjectCardVisible] = useState(false);
  const [isEditProjectCardVisible, setIsEditProjectCardVisible] =
    useState(false);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetIsLoading(true);
    const createdProject = await createProject(newProject);
    setProjects([...projects, createdProject]);
    setNewProject({});
    // SetIsLoading()
    setIsNewProjectCardVisible(false);
    router.refresh();
  };

  const handleUpdateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetIsLoading(true);
    if (!editingProject || !editingProject.id) return;
    const updatedProject = await updateProject(
      editingProject.id,
      editingProject
    );
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    setEditingProject(null);
    setIsEditProjectCardVisible(false);
    router.refresh();
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id);
    setProjects(projects.filter((project) => project.id !== id));
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button
          onClick={() => setIsNewProjectCardVisible(!isNewProjectCardVisible)}
        >
          {isNewProjectCardVisible
            ? "Hide New Project Form"
            : "Add New Project"}
        </Button>
      </div>

      <AnimatePresence>
        {isNewProjectCardVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.0 }}
          >
            <ProjectForm
              project={newProject}
              onSubmit={handleCreateProject}
              headingText={"Add New Project"}
              setEditingProject={setEditingProject}
              setNewProject={setNewProject}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="flex items-center justify-between">
            <span>{project.name}</span>
            <div>
              <Button
                onClick={() => {
                  setEditingProject(project);
                  setIsEditProjectCardVisible(!isEditProjectCardVisible);
                }}
              >
                {isEditProjectCardVisible && editingProject?.id === project.id
                  ? "Hide Edit Form"
                  : "Edit"}
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteProject(project.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {isEditProjectCardVisible && editingProject && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.3 }}
          >
            <ProjectForm
              project={editingProject}
              onSubmit={handleUpdateProject}
              headingText="Edit Project"
              setEditingProject={setEditingProject}
              setNewProject={setNewProject}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsTab;
