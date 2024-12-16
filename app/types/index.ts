import { Skill, Project as PrismaProject, SkillCategory } from "@prisma/client";

export interface Project extends Omit<PrismaProject, "stack"> {
  stack: Skill[];
}

export type PartialProject = Partial<Omit<Project, "id" | "stack">> & {
  id?: string;
  stack?: Skill[];
};

export interface SkillForm extends Omit<Skill, "id"> {
  id?: number;
}

export type Stack = {
  id: number;
  name: string;
  icon: string;
  level: number;
  category: SkillCategory;
};
