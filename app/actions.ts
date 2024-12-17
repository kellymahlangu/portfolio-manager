"use server";

import {
  PrismaClient,
  BasicId,
  Prisma,
  AboutQuestions,
  Basic,
} from "@prisma/client";
import { Project, PartialProject, SkillForm } from "@/app/types";

const prisma = new PrismaClient();

export async function getBasicInfo() {
  return await prisma.basic.findUnique({ where: { id: BasicId.USER } });
}

export async function updateBasicInfo(data: Prisma.BasicUpdateInput) {
  return await prisma.basic.update({
    where: { id: BasicId.USER },
    data,
  });
}

export async function getAboutInfo() {
  return await prisma.about.findUnique({ where: { id: BasicId.USER } });
}

export async function updateAboutInfo(data: Prisma.AboutUpdateInput) {
  return await prisma.about.update({
    where: { id: BasicId.USER },
    data,
  });
}

export async function getSkills() {
  return await prisma.skill.findMany();
}

export async function createSkill(data: SkillForm): Promise<SkillForm> {
  return (await prisma.skill.create({ data })) as SkillForm;
}

export async function updateSkill(
  id: number,
  data: SkillForm
): Promise<SkillForm> {
  return (await prisma.skill.update({
    where: { id },
    data,
  })) as SkillForm;
}

export async function deleteSkill(id: number) {
  return await prisma.skill.delete({ where: { id } });
}

export async function getProjects() {
  return await prisma.project.findMany({ include: { stack: true } });
}

export async function createProject(data: PartialProject): Promise<Project> {
  const { stack, ...projectData } = data;
  const sanitizedProjectData = {
    ...projectData,
    img: projectData.img || "",
    name: projectData.name || "",
    description: projectData.description || "",
    liveUrl: projectData.liveUrl || "",
    repoUrl: projectData.repoUrl || null,
    isOpenSource: projectData.isOpenSource ?? false,
  };
  return (await prisma.project.create({
    data: {
      ...sanitizedProjectData,
      stack: {
        connect: stack?.map((skill) => ({ id: skill.id })) || [],
      },
    },
    include: { stack: true },
  })) as Project;
}

export async function updateProject(
  id: string,
  data: PartialProject
): Promise<Project> {
  const { stack, ...projectData } = data;
  return (await prisma.project.update({
    where: { id },
    data: {
      ...projectData,
      stack: {
        set: stack?.map((skill) => ({ id: skill.id })) || [],
      },
    },
    include: { stack: true },
  })) as Project;
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({ where: { id } });
}

export async function getExperiences() {
  return await prisma.experience.findMany({ include: { skills: true } });
}

export async function createExperience(data: Prisma.ExperienceCreateInput) {
  return await prisma.experience.create({ data, include: { skills: true } });
}

export async function updateExperience(
  id: number,
  data: Prisma.ExperienceUpdateInput
) {
  return await prisma.experience.update({
    where: { id },
    data,
    include: { skills: true },
  });
}

export async function deleteExperience(id: number) {
  return await prisma.experience.delete({ where: { id } });
}

export async function getContacts() {
  return await prisma.contact.findMany();
}

export async function updateContact(
  id: string,
  data: Prisma.ContactUpdateInput
) {
  return await prisma.contact.update({
    where: { id },
    data,
  });
}

export async function deleteContact(id: string) {
  return await prisma.contact.delete({ where: { id } });
}

export async function getAboutQuestions() {
  return await prisma.aboutQuestions.findUnique({
    where: { id: BasicId.USER },
  });
}

export async function updateAboutMe({
  about,
  basic,
  files,
}: {
  about: AboutQuestions;
  basic: Basic;
  files: { headshot: string; cv: string };
}) {
  const basicDb = await getBasicInfo();
  const aboutDB = await getAboutInfo();

  if (!basicDb) {
    await prisma.basic.create({
      data: basic,
    });
  }
  if (!aboutDB) {
    await prisma.about.create({
      data: {
        id: "USER",
        p1: "Paragraph 1",
        p2: "Paragraph 2",
        p3: "Paragraph 3",
        img: files.headshot,
        cv: files.cv,
      },
    });
  }
  try {
    updateBasicInfo(basic);

    await prisma.aboutQuestions.update({
      where: { id: BasicId.USER },
      data: about,
    });

    await prisma.about.update({
      where: { id: BasicId.USER },
      data: {
        p1: "Paragraph 1",
        p2: "Paragraph 2",
        p3: "Paragraph 3",
        img: files.headshot,
        cv: files.cv,
      },
    });
  } catch (error) {
    return { succes: false, data: null, error };
  }

  return { succes: true, data: "" };
}

export async function generateAboutMeParagraph() {
  const questions = await getAboutQuestions();
  const me = await getBasicInfo();
  if (!questions || !me) {
    return {
      status: false,
      data: { p1: "", p2: "", p3: "" },
    };
  }
  const promt = `Write a 3-paragraph "About Me" for a professional. Here's some information to guide the writing:
    - name: ${me.name}
    - surname: ${me.surname}
    - occupation: ${me.occupation}
    - tagline/slogan: ${me.tagline} (just use as insperation but not include the actual tagline)
    - Specialization: ${questions.specialization}
    - Excitement: ${questions.excitement}
    - Years of Experience: ${questions.yearsOfExperience}
    - Problems Solved: ${questions.problemsSolved}
    - Motivation: ${questions.motivation}
    - Interests: ${questions.interests}
  `;
  console.log(promt);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    status: true,
    data: { p1: "Paragraph 1", p2: "Paragraph 2", p3: "Paragraph 3" },
  };
}

export async function hasIconsLoaded() {
  const icons = await prisma.devicon.findMany();
  return icons.length !== 0;
}

async function loadSkillAndToolData(fileContent: string) {
  try {
    const deviconData = JSON.parse(fileContent);

    // Loop through each entry and insert into the database
    for (const entry of deviconData) {
      // Create the versions entry first
      const versions = await prisma.versions.create({
        data: {
          svg: entry.versions.svg,
          font: entry.versions.font,
        },
      });

      // Create the devicon entry
      const devicon = await prisma.devicon.create({
        data: {
          name: entry.name,
          altnames: entry.altnames,
          tags: entry.tags,
          color: entry.color,
          versionsId: versions.id,
        },
      });

      // Create the aliases
      if (entry.aliases && entry.aliases.length > 0) {
        for (const alias of entry.aliases) {
          await prisma.alias.create({
            data: {
              base: alias.base,
              alias: alias.alias,
              deviconId: devicon.id,
            },
          });
        }
      }

      console.log(`Inserted data for ${entry.name}`);
    }

    console.log("All data has been successfully loaded into the database.");
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    await prisma.$disconnect();
  }
}
