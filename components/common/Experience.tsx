"use server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { $Enums } from "@prisma/client";
import React from "react";
import { CustomIcon } from "../ui/icon";

type experienceRecord = {
  skills: {
    id: number;
    name: string;
    icon: string;
    level: number;
    category: $Enums.SkillCategory;
  }[];
} & {
  id: number;
  company: string;
  role: string;
  start: Date;
  end: Date | null;
  summary: string;
  achievements: string[];
};
interface ExperianceProps {
  experiances: experienceRecord[];
}

export default async function Experiance({ experiances }: ExperianceProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
      <div className="space-y-6">
        {experiances.map((exp, index) => (
          <Card key={index} className="border-none shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {exp.company} | {exp.role}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {exp.start.getDate()} to{" "}
                {exp.end ? exp.end.getDate() : "present"}
              </p>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm">{exp.summary}</p>
              <ul className="list-disc list-inside mb-4 text-sm">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <CustomIcon src={skill.icon} className="h-4 w-4"/>
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
