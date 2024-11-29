"use server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, FileJson, Globe, Laptop } from "lucide-react";
import React from "react";

interface Experience {
  company: string;
  role: string;
  dates: string;
  summary: string;
  achievements: string[];
  skills: string[];
}

const skillIcons: { [key: string]: React.JSX.Element } = {
  JavaScript: <Code className="h-4 w-4" />,
  React: <Globe className="h-4 w-4" />,
  "Node.js": <FileJson className="h-4 w-4" />,
  SQL: <Database className="h-4 w-4" />,
  "Machine Learning": <Laptop className="h-4 w-4" />,
};

const defaultExperiences: Experience[] = [
  {
    company: "Tech Innovators Inc.",
    role: "Senior Software Engineer",
    dates: "Jan 2020 - Present",
    summary:
      "Lead developer for the company's flagship product, focusing on scalability and performance improvements.",
    achievements: [
      "Increased application performance by 40% through optimized database queries and caching strategies",
      "Led a team of 5 developers in successfully delivering a major feature update ahead of schedule",
      "Implemented automated testing procedures, reducing bug reports by 30%",
    ],
    skills: ["JavaScript", "React", "Node.js", "SQL"],
  },
  {
    company: "Data Dynamics Ltd.",
    role: "Machine Learning Engineer",
    dates: "Mar 2018 - Dec 2019",
    summary:
      "Developed and deployed machine learning models to improve customer segmentation and targeted marketing efforts.",
    achievements: [
      "Created a customer churn prediction model with 85% accuracy, helping reduce churn rate by 15%",
      "Optimized data processing pipeline, reducing model training time by 50%",
      "Collaborated with the marketing team to implement personalized recommendation systems",
    ],
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
  },
];

export default async function Experiance() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
      <div className="space-y-6">
        {defaultExperiences.map((exp, index) => (
          <Card key={index} className="border-none shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {exp.company} | {exp.role}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{exp.dates}</p>
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
                    key={skill}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {skillIcons[skill] || <Code className="h-4 w-4" />}
                    {skill}
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
