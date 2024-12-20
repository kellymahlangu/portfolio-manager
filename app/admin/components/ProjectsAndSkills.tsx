"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Project, PartialProject } from "../../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  hasIconsLoaded,
} from "@/app/actions";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { UploadCloud } from "lucide-react";
function ProjectsAndSkills() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<PartialProject>({});
  const [editingProject, setEditingProject] = useState<
    Project | PartialProject
  >({});
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false);
  const [selectedStack, setSelectedStack] = useState<number[]>([]);
  const [hasIcons, setHasIcons] = useState<boolean>();

  useEffect(() => {
    getProjects().then(setProjects);
    hasIconsLoaded().then(setHasIcons);
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

  const FileUploadForm = () => {
    const [jsonContent, setJsonContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (file.type !== "application/json") {
          setError("Please upload a JSON file");
          setJsonContent(null);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            JSON.parse(content); // Validate JSON
            setJsonContent(content);
            setError(null);
          } catch (err) {
            setError(`Invalid JSON file ${err}`);
            setJsonContent(null);
          }
        };
        reader.readAsText(file);
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Upload JSON File</CardTitle>
          <CardDescription>
            Drag and drop your JSON file or click to browse
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <Label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-8 h-8 mb-4" />
                <p className="mb-2 text-sm">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs">JSON file only</p>
              </div>
              <Input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".json"
                onChange={handleFileUpload}
              />
            </Label>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {jsonContent && (
            <div>
              <h3 className="text-lg font-semibold mb-2">JSON Content:</h3>
              <pre className="p-4 rounded-lg overflow-x-auto">
                {jsonContent}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

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
        {!hasIcons && <FileUploadForm />}
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
