"use server";

import { disconnectPrisma, prisma } from "@/lib/prisma";

export async function fetchBasic() {
  try {
    const record = await prisma.basic.findUnique({
      where: {
        id: "USER",
      },
    });
    if (!record) {
      console.error("No Basic Data found");
    }

    return record;
  } catch (error) {
    console.error("An error has occured:", error);
    return null;
  } finally {
    await disconnectPrisma();
  }
}
