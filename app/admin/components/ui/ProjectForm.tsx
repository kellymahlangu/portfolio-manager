/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { getActiveSkills } from "@/app/actions";
import { PartialProject, Project } from "@/app/types";
import { Button } from "@/components/ui/button";
import { CustomIcon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderClosed, FolderOpen } from "lucide-react";
import { $Enums } from "@prisma/client";

interface ProjectFormProps {
  project: PartialProject | Project;
  headingText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setEditingProject: Dispatch<SetStateAction<Project | PartialProject | null>>;
  setNewProject: Dispatch<SetStateAction<PartialProject>>;
}

type allSkills = ({ details: { name: string; versions: { svg: string[] } } } & {
  id: number;
  level: number;
  category: $Enums.SkillCategory;
  isKnown: boolean;
  deviconId: number;
})[];

function ProjectForm({
  project,
  onSubmit,
  headingText,
  setEditingProject,
  setNewProject,
}: ProjectFormProps) {
  // const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [allSkills, setAllSkills] = useState<allSkills>();
  const [skillList, setSkillList] = useState<
    {
      label: string;
      value: string;
      icon?: (props: any) => JSX.Element;
    }[]
  >([]);
  useEffect(() => {
    onLoadList().then(setSkillList);
  }, []);

  const updateSkill = (newList: string[]) => {
    const arr = new Set(newList);
    const all = allSkills || [];
    const stack = all.filter((item) => arr.has(item.id.toString()));
    if ("id" in project) {
      setEditingProject({ ...project, stack });
    } else {
      setNewProject({ ...project, stack });
    }
  };

  const onLoadList = async () => {
    const list = await getActiveSkills();
    if (list) {
      // const projectIds = project.stack?.map((item) => item.id.toString());
      // setSelectedSkills(projectIds || []);
      setAllSkills(list);
      return list.map((skill) => ({
        label: skill.details.name,
        value: skill.id.toString(),
        icon: (props: any) => (
          <CustomIcon
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.details.name}/${skill.details.name}-${skill.details.versions.svg[0]}.svg`}
            {...props}
          />
        ),
      }));
    }

    return [];
  };

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    console.log(`{id: ${e.target.id}, value: ${e.target.value}}`);
    if ("id" in project) {
      setEditingProject({ ...project, [id]: value });
    } else {
      setNewProject({ ...project, [id]: value });
    }
  };

  function handleSwitchChange(e: { preventDefault: () => void }): void {
    e.preventDefault();
    if ("id" in project) {
      setEditingProject({ ...project, isOpenSource: !project.isOpenSource });
    } else {
      setNewProject({ ...project, isOpenSource: !project.isOpenSource });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{headingText}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={project.name || ""}
              onChange={handleTextChange}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={project.description || ""}
              onChange={handleTextChange}
            />
          </div>
          <div>
            <Label htmlFor="stack">Select Tech Stack Used</Label>
            <MultiSelect
              options={skillList}
              value={project.stack?.map((item) => item.id.toString()) || []}
              onValueChange={updateSkill}
              defaultValue={
                project.stack?.map((item) => item.id.toString()) || []
              }
              placeholder="Select frameworks"
              animation={2}
              maxCount={3}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              id="isOpenSource"
              variant="ghost"
              size="icon"
              onClick={handleSwitchChange}
            >
              {project.isOpenSource ? (
                <FolderOpen className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <FolderClosed className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
            <Label htmlFor="isOpenSource">
              This Project Is{!project.isOpenSource ? " Not" : ""} Open Source
            </Label>
          </div>

          <div>
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              id="liveUrl"
              value={project.liveUrl}
              onChange={handleTextChange}
            />
          </div>
          {project.isOpenSource && (
            <div>
              <Label htmlFor="repoUrl">Repo URL</Label>
              <Input
                id="repoUrl"
                value={project.repoUrl || ""}
                onChange={handleTextChange}
              />
            </div>
          )}

          <div>
            <Label htmlFor="img">Image URL</Label>
            <Input id="img" value={project.img} onChange={handleTextChange} />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProjectForm;
