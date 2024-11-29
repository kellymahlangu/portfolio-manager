"use server";

import { disconnectPrisma, prisma } from "@/lib/prisma";

export async function fetchAbout() {
  try {
    const record = await prisma.about.findUnique({
      where: {
        id: "USER",
      },
    });
    if (!record) {
      console.error("No About Data found");
    }

    return record;
  } catch (error) {
    console.error("An error has occured:", error);
    return null;
  } finally {
    await disconnectPrisma();
  }
}
