"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GetProjectsReturnType } from "@/app/types";
import { CustomIcon } from "../ui/icon";

interface ProjectsProps {
  projects: GetProjectsReturnType[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
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
          {projects.map((project) => (
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
  );
}
