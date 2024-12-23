import { Skill, Project as PrismaProject, $Enums } from "@prisma/client";

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
  category: $Enums.SkillCategory;
};

export type DeviconEntry = {
  name: string;
  altnames: string[];
  tags: string[];
  versions: {
    svg: string[];
    font: string[];
  };
  color: string;
  aliases: {
    base: string;
    alias: string;
  }[];
};

export type FetchSkill = {
  details: {
    name: string;
    versions: {
      svg: string[];
    };
  };
} & {
  id: number;
  level: number;
  category: $Enums.SkillCategory;
  isKnown: boolean;
  deviconId: number;
};

export interface UpdateCardProps {
  name: string;
  type: $Enums.SkillCategory;
  progress: number;
  icon: string;
  isActive: boolean;
  skillId: number;
}

export interface UpdateSkill {
  id: number;
  name: string;
  type: $Enums.SkillCategory;
  progress: number;
  icon: string;
  isActive: boolean;
}

export type FetchExperience = {
  id: number;
  role: string;
  summary: string;
  company: string;
  start: Date;
  end: Date | null;
  achievements: string[];
  skills: {
    id: number;
    level: number;
    category: $Enums.SkillCategory;
    isKnown: boolean;
    deviconId: number;
  }[];
};

// Type for the return value of getExperiences
export type GetExperiencesReturnType = {
  id: number;
  company: string;
  role: string;
  start: Date;
  end?: Date | null;
  summary: string;
  achievements: string[];
  skills: {
    id: number;
    level: number;
    details: {
      id: number;
      name: string;
      altnames: string[];
      tags: string[];
      color: string;
      versions: {
        id: number;
        svg: string[];
        font: string[];
      };
    };
    category: $Enums.SkillCategory;
    isKnown: boolean;
  }[];
};

// Type for the return value of getProjects
export type GetProjectsReturnType = {
  id: string;
  img: string;
  name: string;
  description: string;
  stack: {
    id: number;
    level: number;
    details: {
      id: number;
      name: string;
      altnames: string[];
      tags: string[];
      color: string;
      versions: {
        id: number;
        svg: string[];
        font: string[];
      };
    };
    category: $Enums.SkillCategory;
    isKnown: boolean;
  }[];
  liveUrl: string;
  repoUrl?: string | null;
  isOpenSource: boolean;
};

export type ContactProps = {
  name: string;
  email: string;
  subject: string | null;
  message: string;
  atm: boolean;
};
