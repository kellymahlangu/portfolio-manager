"use server";

import { disconnectPrisma, prisma } from "@/lib/prisma";

export async function fetchExperience() {
  try {
    const record = await prisma.experience.findMany({
      include: {
        skills: true,
      },
    });
    if (!record) {
      console.error("No Experiance Data found");
    }

    return record;
  } catch (error) {
    console.error("An error has occured:", error);
    return [];
  } finally {
    await disconnectPrisma();
  }
}
