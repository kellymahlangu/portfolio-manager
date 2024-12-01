"use server";

import { disconnectPrisma, prisma } from "@/lib/prisma";

interface submitContactProps {
  name: string;
  email: string;
  subject: string | null;
  message: string;
}
export async function submitContact({
  name,
  email,
  subject,
  message,
}: submitContactProps) {
  try {
    // send notification to mobile phone using a Push Notification Service
    await prisma.contact.create({
      data: {
        name,
        email: email.toLowerCase(),
        subject,
        message,
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
