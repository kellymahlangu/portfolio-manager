import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  // Prevents multiple Prisma Client instances in development
  // when using hot-reloading.
  var __prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"], // Enable detailed logs in development
    });
  }
  prisma = global.__prisma;
}

// Middleware to handle errors and log queries (optional)
prisma.$use(async (params, next) => {
  try {
    const result = await next(params);
    return result;
  } catch (error) {
    console.error(`[Prisma Error]: ${error.message}`);
    throw error; // Re-throw the error so the calling code is aware
  }
});

// Graceful disconnect for Prisma Client on app shutdown
async function disconnectPrisma() {
  await prisma.$disconnect();
}

export { prisma, disconnectPrisma };
