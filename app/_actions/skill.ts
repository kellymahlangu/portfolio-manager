"use server";

import { disconnectPrisma, prisma } from "@/lib/prisma";

export async function fetchSkill() {
  try {
    const record = await prisma.skill.findMany();
    if (!record) {
      console.error("No Skill Data found");
    }

    return record;
  } catch (error) {
    console.error("An error has occured:", error);
    return null;
  } finally {
    await disconnectPrisma();
  }
}
