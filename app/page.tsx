/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Contact from "@/components/common/Contact";
import { Header } from "@/components/common/Header";
import { useEffect, useState } from "react";
import { $Enums } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomIcon } from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/common/Footer";
import { toast } from "sonner";
import Loader from "@/components/common/Loader";
import { FaGithub } from "react-icons/fa";

type ProjectWithDetails = {
  id: string;
  img: string;
  name: string;
  description: string;
  stack: {
    id: number;
    level: number;
    category: $Enums.SkillCategory;
    isKnown: boolean;
    details: {
      id: number;
      name: string;
      altnames: string[];
      tags: string[];
      color: string;
      versions: {
        id: number;
        svg: string[];
        font: string[];
      };
    };
  }[];
  liveUrl: string;
  repoUrl?: string | null;
  isOpenSource: boolean;
};

type ExperienceWithDetails = {
  id: number;
  company: string;
  role: string;
  start: Date;
  end?: Date | null;
  summary: string;
  achievements: string[];
  skills: {
    id: number;
    level: number;
    category: $Enums.SkillCategory;
    isKnown: boolean;
    details: {
      id: number;
      name: string;
      altnames: string[];
      tags: string[];
      color: string;
      versions: {
        id: number;
        svg: string[];
        font: string[];
      };
    };
  }[];
};

type BasicDetails = {
  id: "USER";
  name: string;
  surname: string;
  occupation: string;
  tagline: string;
  summeryVid: string | null;
  title: string;
};

type AboutDetails = {
  id: "USER";
  img: string | null;
  paragraph: string;
  cv: string;
};

type SkillWithDetails = {
  details: { name: string; versions: { svg: string[] } };
} & {
  id: number;
  level: number;
  category: $Enums.SkillCategory;
  isKnown: boolean;
  deviconId: number;
};

type MainRes = {
  basic: BasicDetails;
  about: AboutDetails;
  skills: SkillWithDetails[];
  projects: ProjectWithDetails[];
  experiences: ExperienceWithDetails[];
};

function isMainRes(value: any): value is MainRes {
  if (typeof value !== "object" || value === null) return false;

  const isBasicDetails = (obj: any): obj is BasicDetails => {
    if (obj === null) return true;
    return (
      typeof obj === "object" &&
      obj.id === "USER" &&
      typeof obj.name === "string" &&
      typeof obj.surname === "string" &&
      typeof obj.occupation === "string" &&
      typeof obj.tagline === "string" &&
      (typeof obj.summeryVid === "string" || obj.summeryVid === null) &&
      typeof obj.title === "string"
    );
  };

  const isAboutDetails = (obj: any): obj is AboutDetails => {
    if (obj === null) return true;
    return (
      typeof obj === "object" &&
      obj.id === "USER" &&
      (typeof obj.img === "string" || obj.img === null) &&
      typeof obj.paragraph === "string" &&
      typeof obj.cv === "string"
    );
  };

  const isSkillWithDetails = (obj: any): obj is SkillWithDetails => {
    return (
      typeof obj === "object" &&
      typeof obj.id === "number" &&
      typeof obj.level === "number" &&
      typeof obj.category === "string" && // Replace with actual validation for $Enums.SkillCategory
      typeof obj.isKnown === "boolean" &&
      typeof obj.deviconId === "number" &&
      typeof obj.details === "object" &&
      typeof obj.details.name === "string" &&
      Array.isArray(obj.details.versions.svg) &&
      obj.details.versions.svg.every((svg: any) => typeof svg === "string")
    );
  };

  const isProjectWithDetails = (obj: any): obj is ProjectWithDetails => {
    return (
      typeof obj === "object" &&
      typeof obj.id === "string" &&
      typeof obj.img === "string" &&
      typeof obj.name === "string" &&
      typeof obj.description === "string" &&
      Array.isArray(obj.stack) &&
      obj.stack.every(
        (stack: any) =>
          typeof stack === "object" &&
          typeof stack.id === "number" &&
          typeof stack.level === "number" &&
          typeof stack.category === "string" && // Replace with actual validation for $Enums.SkillCategory
          typeof stack.isKnown === "boolean" &&
          typeof stack.details === "object" &&
          typeof stack.details.id === "number" &&
          typeof stack.details.name === "string" &&
          Array.isArray(stack.details.altnames) &&
          Array.isArray(stack.details.tags) &&
          typeof stack.details.color === "string" &&
          typeof stack.details.versions === "object" &&
          typeof stack.details.versions.id === "number" &&
          Array.isArray(stack.details.versions.svg) &&
          Array.isArray(stack.details.versions.font)
      ) &&
      typeof obj.liveUrl === "string" &&
      (typeof obj.repoUrl === "string" || obj.repoUrl === null) &&
      typeof obj.isOpenSource === "boolean"
    );
  };

  const isExperienceWithDetails = (obj: any): obj is ExperienceWithDetails => {
    return (
      typeof obj === "object" &&
      typeof obj.id === "number" &&
      typeof obj.company === "string" &&
      typeof obj.role === "string" &&
      obj.start instanceof Date &&
      (obj.end instanceof Date || obj.end === null) &&
      typeof obj.summary === "string" &&
      Array.isArray(obj.achievements) &&
      obj.achievements.every((ach: any) => typeof ach === "string") &&
      Array.isArray(obj.skills) &&
      obj.skills.every(isSkillWithDetails)
    );
  };

  return (
    isBasicDetails(value.basic) &&
    isAboutDetails(value.about) &&
    Array.isArray(value.skills) &&
    value.skills.every(isSkillWithDetails) &&
    Array.isArray(value.projects) &&
    value.projects.every(isProjectWithDetails) &&
    Array.isArray(value.experiences) &&
    value.experiences.every(isExperienceWithDetails)
  );
}

function Page() {
  const [info, setInfo] = useState<MainRes>({
    basic: {
      name: "",
      id: "USER",
      surname: "",
      occupation: "",
      tagline: "",
      summeryVid: null,
      title: "",
    },
    about: {
      id: "USER",
      img: null,
      paragraph: "",
      cv: "",
    },
    skills: [],
    projects: [],
    experiences: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const query = await fetch("/api/portfolio-data");
      const response = await query.json();
      if (isMainRes(response)) {
        response.basic.summeryVid = null;
        response.about.img = null;
        setInfo(response);
        setIsLoading(false);
        return;
      }
      toast.error("Something Unexpected Happened");
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) {
    return (
      <main>
        <section
          className={`min-h-screen w-full flex flex-col items-center justify-center snap-start`}
          key={2}
          id="loader"
        >
          <Loader />
        </section>
      </main>
    );
  }

  return (
    <main>
      <Header title={"Portfolio Site"} hasExp={info.experiences.length > 0} />
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {/* Header Section */}
        <section
          className={`min-h-screen w-full flex flex-col items-center justify-center snap-start`}
          key={0}
          id="home"
        >
          <section className="relative items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:flex lg:items-center lg:justify-between">
                <div className="relative z-10 lg:w-1/2 xl:w-2/5">
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                    <span className="block">Hi, {"I'm"}</span>
                    <span className="block mt-1">
                      {info.basic.name} {info.basic.surname}
                    </span>
                  </h1>
                  <p className="mt-3 text-base sm:mt-5 sm:text-xl">
                    {info.basic.occupation}
                  </p>
                  <p className="mt-2 text-base sm:text-lg">
                    <Link
                      target="_blank"
                      href="https://github.com/kellymahlangu"
                      className="hover:text-primary"
                    >
                      <FaGithub className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </p>
                  <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
                    <Link href="#contact">
                      <Button variant="default">Contac Me</Button>
                    </Link>
                    <Link href="#projects">
                      <Button variant="secondary">View my Projects</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        {/* About Section */}
        <section
          className={`min-h-screen w-full flex flex-col items-center justify-center snap-start`}
          key={1}
          id="about"
        >
          <div className="w-full max-w-3xl mx-auto py-12 px-4">
            <h2 className="text-2xl font-bold mb-6">Who Am I?</h2>
            <div className="space-y-4">
              <p>{info.about.paragraph}</p>
              <Button asChild className="mt-4">
                <Link href={info.about.cv}>View Full Resume</Link>
              </Button>
            </div>
          </div>
        </section>
        {/* Skills */}
        <section
          className={`min-h-screen w-full flex flex-col items-center justify-center snap-start`}
          key={2}
          id="skills"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg shadow-md" key={0}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  {/* Frontend Icon */}
                  Frontend
                </h3>
                <ul className="space-y-4">
                  {info.skills
                    .filter((skill) => skill.category === "FRONTEND")
                    .map((skill) => (
                      <li key={skill.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="flex items-center space-x-2  rounded-full px-3 py-1">
                            <CustomIcon
                              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.details.name}/${skill.details.name}-${skill.details.versions.svg[0]}.svg`}
                              className="mr-1.5"
                            />
                            <span>{skill.details.name}</span>
                          </span>
                          <span>{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="w-full" />
                      </li>
                    ))}
                </ul>
              </div>

              <div className="p-6 rounded-lg shadow-md" key={1}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  {/* Backend Icon */}
                  Backend
                </h3>
                <ul className="space-y-4">
                  {info.skills
                    .filter((skill) => skill.category === "BACKEND")
                    .map((skill) => (
                      <li key={skill.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="flex items-center space-x-2  rounded-full px-3 py-1">
                            <CustomIcon
                              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.details.name}/${skill.details.name}-${skill.details.versions.svg[0]}.svg`}
                              className="mr-1.5"
                            />
                            <span>{skill.details.name}</span>
                          </span>
                          <span>{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="w-full" />
                      </li>
                    ))}
                </ul>
              </div>

              <div className="p-6 rounded-lg shadow-md" key={2}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  {/* Tool Icon */}
                  Tools
                </h3>
                <ul className="grid grid-cols-2 gap-4">
                  {info.skills
                    .filter((skill) => skill.category === "TOOL")
                    .map((skill) => (
                      <li
                        key={skill.id}
                        className="flex items-center space-x-2  rounded-full px-3 py-1"
                      >
                        <CustomIcon
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.details.name}/${skill.details.name}-${skill.details.versions.svg[0]}.svg`}
                          className="mr-1.5"
                        />
                        <span>{skill.details.name}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Projects */}
        <section
          className={`min-h-screen w-full flex flex-col items-center justify-center snap-start`}
          key={2}
          id="projects"
        >
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Projects</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {info.projects.map((project) => (
                  <CarouselItem
                    key={project.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card>
                        <CardHeader className="p-0">
                          <Image
                            src={project.img}
                            alt={project.name}
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        </CardHeader>
                        <CardContent className="p-4">
                          <CardTitle className="text-xl mb-2">
                            {project.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mb-4">
                            {project.description}
                          </p>
                          <div className="flex space-x-2 mb-4">
                            {project.stack.map((skill) => (
                              <span key={skill.id} className="text-2xl">
                                <CustomIcon
                                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.details.name}/${skill.details.name}-${skill.details.versions.svg[0]}.svg`}
                                  className="mr-1.5"
                                />
                              </span>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button asChild variant="default">
                            <Link href={project.liveUrl}>Live Demo</Link>
                          </Button>
                          {project.isOpenSource && (
                            <Button asChild variant="secondary">
                              <Link href={`${project.repoUrl}`}>View Code</Link>
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
        {info.experiences.length > 0 && (
          <section
            className={`min-h-screen w-full flex flex-col items-center justify-center snap-start`}
            key={2}
            id="about"
          >
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
              <div className="space-y-6">
                {info.experiences.map((exp, index) => (
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
          </section>
        )}
        {/* Contact */}
        <section
          className={`min-h-screen w-full flex flex-col items-center justify-center snap-start`}
          key={2}
          id="contact"
        >
          <Contact />
          <Footer />
        </section>
      </div>
    </main>
  );
}

export default Page;
