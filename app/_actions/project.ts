"use server";

import { disconnectPrisma, prisma } from "@/lib/prisma";

export async function fetchProject() {
  try {
    const record = await prisma.project.findMany({
      include: {
        stack: true,
      },
    });
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
