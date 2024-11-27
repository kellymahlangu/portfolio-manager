"use server";

import { disconnectPrisma, prisma } from "@/lib/prisma";

export async function fetchBasic() {
  try {
    const basicRecord = await prisma.basic.findUnique({
      where: {
        id: "USER",
      },
    });
    if (!basicRecord) {
      console.error("No Basic Data found");
    }

    return basicRecord;
  } catch (error) {
    console.error("An error has occured:", error);
    return null;
  } finally {
    await disconnectPrisma();
  }
}
