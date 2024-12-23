"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { CustomIcon } from "../ui/icon";
import { GetExperiencesReturnType } from "@/app/types";

interface ExperianceProps {
  experiances: GetExperiencesReturnType[];
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
                    <CustomIcon
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.details.name}/${skill.details.name}-${skill.details.versions.svg[0]}.svg`}
                      className="h-4 w-4"
                    />
                    {skill.details.name}
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
