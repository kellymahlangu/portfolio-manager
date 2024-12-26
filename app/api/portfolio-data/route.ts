import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [basic, about, skills, projects, experiences] = await Promise.all([
      prisma.basic.findFirst(),
      prisma.about.findFirst(),
      prisma.skill.findMany({
        where: { isKnown: true },
        include: { details: { include: { versions: true } } },
      }),
      prisma.project.findMany({
        include: {
          stack: { include: { details: { include: { versions: true } } } },
        },
      }),
      prisma.experience.findMany({
        include: {
          skills: { include: { details: { include: { versions: true } } } },
        },
      }),
    ]);

    return NextResponse.json({ basic, about, skills, projects, experiences });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
