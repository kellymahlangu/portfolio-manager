"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SkillCategory } from "@prisma/client";
import { Project, PartialProject, SkillForm } from "../../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "@/app/actions";
import { MultiSelect } from "@/components/ui/multi-select";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";

function ProjectsAndSkills() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillForm[]>([]);
  const [newProject, setNewProject] = useState<PartialProject>({});
  const [editingProject, setEditingProject] = useState<
    Project | PartialProject
  >({});
  const [newSkill, setNewSkill] = useState<SkillForm>({
    name: "",
    icon: "",
    level: 0,
    category: SkillCategory.FRONTEND,
  });
  const [editingSkill, setEditingSkill] = useState<SkillForm | null>(null);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false);
  const [selectedStack, setSelectedStack] = useState<number[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
    getSkills().then(setSkills);
  }, []);

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdProject = await createProject(newProject);
    setProjects([...projects, createdProject]);
    setNewProject({});
    setIsNewProjectDialogOpen(false);
    router.refresh();
  };

  const handleUpdateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;
    if (!editingProject.id) return;
    const updatedProject = await updateProject(
      editingProject.id,
      editingProject
    );
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    setEditingProject({});
    setIsEditProjectDialogOpen(false);
    router.refresh();
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id);
    setProjects(projects.filter((project) => project.id !== id));
    router.refresh();
  };

  const handleCreateSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdSkill = await createSkill(newSkill);
    setSkills([...skills, createdSkill]);
    setNewSkill({
      name: "",
      icon: "",
      level: 0,
      category: SkillCategory.FRONTEND,
    });
    router.refresh();
  };

  const handleUpdateSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingSkill || typeof editingSkill.id !== "number") return;

    const updatedSkill = await updateSkill(editingSkill.id, editingSkill);
    setSkills(
      skills.map((skill) =>
        skill.id === updatedSkill.id ? updatedSkill : skill
      )
    );
    setEditingSkill(null);
    router.refresh();
  };

  const handleDeleteSkill = async (id: number) => {
    await deleteSkill(id);
    setSkills(skills.filter((skill) => skill.id !== id));
    router.refresh();
  };

  const ProjectForm = ({
    project,
    onSubmit,
    buttonText,
  }: {
    project: PartialProject | Project;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    buttonText: string;
  }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={project.name || ""}
          onChange={(e) => {
            if ("id" in project) {
              setEditingProject({ ...project, name: e.target.value });
            } else {
              setNewProject({ ...project, name: e.target.value });
            }
          }}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={project.description || ""}
          onChange={(e) => {
            if ("id" in project) {
              setEditingProject({ ...project, description: e.target.value });
            } else {
              setNewProject({ ...project, description: e.target.value });
            }
          }}
        />
      </div>
      <div>
        <Label htmlFor="img">Image URL</Label>
        <Input
          id="img"
          value={project.img || ""}
          onChange={(e) => {
            if ("id" in project) {
              setEditingProject({ ...project, img: e.target.value });
            } else {
              setNewProject({ ...project, img: e.target.value });
            }
          }}
        />
      </div>
      <div>
        <Label htmlFor="liveUrl">Live URL</Label>
        <Input
          id="liveUrl"
          value={project.liveUrl || ""}
          onChange={(e) => {
            if ("id" in project) {
              setEditingProject({ ...project, liveUrl: e.target.value });
            } else {
              setNewProject({ ...project, liveUrl: e.target.value });
            }
          }}
        />
      </div>
      <div>
        <Label htmlFor="repoUrl">Repo URL</Label>
        <Input
          id="repoUrl"
          value={project.repoUrl || ""}
          onChange={(e) => {
            if ("id" in project) {
              setEditingProject({ ...project, repoUrl: e.target.value });
            } else {
              setNewProject({ ...project, repoUrl: e.target.value });
            }
          }}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isOpenSource"
          checked={project.isOpenSource || false}
          onCheckedChange={(checked) => {
            if ("id" in project) {
              setEditingProject({
                ...project,
                isOpenSource: checked === true,
              });
            } else {
              setNewProject({ ...project, isOpenSource: checked as boolean });
            }
          }}
        />
        <Label htmlFor="isOpenSource">Is Open Source</Label>
      </div>
      <div>
        <Label htmlFor="stack">Stack</Label>
        <MultiSelect
          options={project.stack ? project.stack : []}
          selected={selectedStack}
          onChange={setSelectedStack}
        />
        {/* <Select
          defaultValue="python"
          value={project.stack?.map((s) => s.id.toString()) || []}
          onValueChange={(value) => {
            const selectedSkills = skills.filter((s) =>
              value.includes(s.id.toString())
            );
            if ("id" in project) {
              setEditingProject({ ...project, stack: selectedSkills });
            } else {
              setNewProject({ ...project, stack: selectedSkills });
            }
          }}
          multiple
        >
          <SelectTrigger id="stack">
            <SelectValue placeholder="Select skills" />
          </SelectTrigger>
          <SelectContent>
            {skills.map((skill) => (
              <SelectItem key={skill.id} value={skill.id!.toString()}>
                {skill.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
      <Button type="submit">{buttonText}</Button>
    </form>
  );

  const SkillForm = ({
    skill,
    onSubmit,
    buttonText,
  }: {
    skill: SkillForm;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    buttonText: string;
  }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={skill.name}
          onChange={(e) =>
            skill === newSkill
              ? setNewSkill({ ...newSkill, name: e.target.value })
              : setEditingSkill({ ...editingSkill!, name: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="icon">Icon</Label>
        <Input
          id="icon"
          value={skill.icon}
          onChange={(e) =>
            skill === newSkill
              ? setNewSkill({ ...newSkill, icon: e.target.value })
              : setEditingSkill({ ...editingSkill!, icon: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="level">Level</Label>
        <Input
          id="level"
          type="number"
          value={skill.level}
          onChange={(e) =>
            skill === newSkill
              ? setNewSkill({ ...newSkill, level: parseInt(e.target.value) })
              : setEditingSkill({
                  ...editingSkill!,
                  level: parseInt(e.target.value),
                })
          }
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={skill.category}
          onValueChange={(value) =>
            skill === newSkill
              ? setNewSkill({ ...newSkill, category: value as SkillCategory })
              : setEditingSkill({
                  ...editingSkill!,
                  category: value as SkillCategory,
                })
          }
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(SkillCategory).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">{buttonText}</Button>
    </form>
  );

  return (
    <Tabs defaultValue="projects" className="w-full">
      <TabsList>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
      </TabsList>
      <TabsContent value="projects">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Projects</h3>
            <Dialog
              open={isNewProjectDialogOpen}
              onOpenChange={setIsNewProjectDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>Add New Project</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <ProjectForm
                  project={newProject}
                  onSubmit={handleCreateProject}
                  buttonText="Add Project"
                />
              </DialogContent>
            </Dialog>
          </div>
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between"
              >
                <span>{project.name}</span>
                <div>
                  <Dialog
                    open={isEditProjectDialogOpen}
                    onOpenChange={setIsEditProjectDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button onClick={() => setEditingProject(project)}>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                      </DialogHeader>
                      {editingProject && (
                        <ProjectForm
                          project={editingProject}
                          onSubmit={handleUpdateProject}
                          buttonText="Update Project"
                        />
                      )}
                    </DialogContent>
                  </Dialog>
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
        </div>
      </TabsContent>
      <TabsContent value="skills">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Skills</h3>
          <ul className="space-y-2">
            {skills.map((skill) => (
              <li key={skill.id} className="flex items-center justify-between">
                <span>
                  {skill.name} - {skill.category} (Level: {skill.level})
                </span>
                <div>
                  <Button onClick={() => setEditingSkill(skill)}>Edit</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteSkill(skill.id!)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          {editingSkill ? (
            <SkillForm
              skill={editingSkill}
              onSubmit={handleUpdateSkill}
              buttonText="Update Skill"
            />
          ) : (
            <SkillForm
              skill={newSkill}
              onSubmit={handleCreateSkill}
              buttonText="Add Skill"
            />
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default function ProjectsAndSkillsCard() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Skills And Projects</h1>
      <div>
        <Card className="">
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <ProjectsAndSkills />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
