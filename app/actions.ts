/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  PrismaClient,
  BasicId,
  Prisma,
  AboutQuestions,
  Basic,
} from "@prisma/client";
import {
  Project,
  PartialProject,
  DeviconEntry,
  UpdateSkill,
  ContactProps,
} from "@/app/types";
import { disconnectPrisma } from "@/lib/prisma";

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

export async function totalSkills() {
  return await prisma.skill.count();
}

export async function getSkills(page: number, skillId?: number) {
  if (skillId) {
    const item = await prisma.skill.findUnique({
      where: { id: skillId },
      include: {
        details: {
          select: {
            name: true,
            versions: {
              select: {
                svg: true,
              },
            },
          },
        },
      },
    });
    if (item) {
      return [item];
    } else {
      return [];
    }
  }
  const startIndex = (page - 1) * 10;

  return await prisma.skill.findMany({
    skip: startIndex,
    take: 10,
    include: {
      details: {
        select: {
          name: true,
          versions: {
            select: {
              svg: true,
            },
          },
        },
      },
    },
  });
}

export async function getActiveSkills() {
  const list = await prisma.skill.findMany({
    where: {
      isKnown: true,
    },
    include: {
      details: {
        select: {
          name: true,
          versions: {
            select: {
              svg: true,
            },
          },
        },
      },
    },
  });

  return list;
}

export async function updateSkill({
  id,
  type,
  progress,
  isActive,
}: UpdateSkill) {
  try {
    await prisma.skill.update({
      where: { id },
      data: {
        level: progress,
        category: type,
        isKnown: isActive,
      },
    });

    return { success: true, msg: "Skill updated successfully" };
  } catch (error) {
    console.log(error);

    return { success: false, msg: "Someting went wrong" };
  }
}

export async function deleteSkill(id: number) {
  return await prisma.skill.delete({ where: { id } });
}

export async function getProjects() {
  return await prisma.project.findMany({
    include: {
      stack: { include: { details: { include: { versions: true } } } },
    },
  });
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
  return await prisma.experience.findMany({
    include: {
      skills: { include: { details: { include: { versions: true } } } },
    },
  });
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

export async function submitContact({
  name,
  email,
  subject,
  message,
  atm,
}: ContactProps) {
  try {
    // send notification to mobile phone using a Push Notification Service
    await prisma.contact.create({
      data: {
        name,
        email: email.toLowerCase(),
        subject,
        message,
        isSubscribed: atm,
      },
    });

    return true;
  } catch (error) {
    console.error("An error has occured:", error);
    return false;
  } finally {
    await disconnectPrisma();
  }
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
  files: { headshot: string; cv: string; paragraph: string };
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
        paragraph: files.paragraph,
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
        paragraph: files.paragraph,
        img: files.headshot,
        cv: files.cv,
      },
    });
  } catch (error) {
    return { succes: false, data: null, error };
  }

  return { succes: true, data: "" };
}

export async function hasIconsLoaded() {
  const icons = await prisma.devicon.findMany();
  return icons.length !== 0;
}

export async function stringToObject(jsonContent: string) {
  const cleanedArray: DeviconEntry[] = [];
  let errorCount = 0;
  const jsonData = JSON.parse(jsonContent);

  for (const entry of jsonData) {
    const isValid = isDeviconEntry(entry);
    if (isValid) {
      cleanedArray.push(entry);
    } else {
      errorCount++;
    }
  }

  return { icons: cleanedArray, errorCount };
}
export async function cleanIcons(data: DeviconEntry[]) {
  const existingIcons = await prisma.devicon.findMany({
    where: { name: { in: data.map((item) => item.name) } },
    select: { name: true },
  });

  const newIcons = data.filter(
    (item) => !existingIcons.some((existing) => existing.name === item.name)
  );

  return newIcons;
}

export async function createIconInDb(entry: DeviconEntry) {
  try {
    const devicon = await prisma.devicon.create({
      data: {
        name: entry.name,
        altnames: entry.altnames,
        tags: entry.tags,
        versions: {
          create: {
            svg: entry.versions.svg,
            font: entry.versions.font,
          },
        },
        color: entry.color,
        aliases: {
          create: entry.aliases.map((alias) => ({
            base: alias.base,
            alias: alias.alias,
          })),
        },
      },
    });

    await prisma.skill.create({
      data: {
        level: 0,
        isKnown: false,
        deviconId: devicon.id,
      },
    });

    return { success: true, msg: "success" };
  } catch (error) {
    return { success: false, msg: "Something went wrong!", error };
  }
}

function isDeviconEntry(entry: any): entry is DeviconEntry {
  return (
    typeof entry.name === "string" &&
    Array.isArray(entry.altnames) &&
    entry.altnames.every((altname: any) => typeof altname === "string") &&
    Array.isArray(entry.tags) &&
    entry.tags.every((tag: any) => typeof tag === "string") &&
    typeof entry.versions === "object" &&
    Array.isArray(entry.versions.svg) &&
    entry.versions.svg.every((svg: any) => typeof svg === "string") &&
    Array.isArray(entry.versions.font) &&
    entry.versions.font.every((font: any) => typeof font === "string") &&
    typeof entry.color === "string" &&
    Array.isArray(entry.aliases) &&
    entry.aliases.every(
      (alias: { base: any; alias: any }) =>
        typeof alias.base === "string" && typeof alias.alias === "string"
    )
  );
}
