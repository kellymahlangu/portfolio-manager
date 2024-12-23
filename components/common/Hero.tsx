"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  firstName: string;
  lastName: string;
  occupation: string;
  slogan: string;
  img?: string;
};

export default async function HeroSection({
  img,
  firstName,
  lastName,
  occupation,
  slogan,
}: HeroSectionProps) {
  if (img) {
    return (
      <section className="relative items-center">
        {/* Background image for small screens */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src={img}
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-opacity-50" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="relative z-10 lg:w-1/2 xl:w-2/5">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">Hi, {"I'm"}</span>
                <span className="block mt-1">
                  {firstName.charAt(0).toUpperCase() + firstName.slice(1)}{" "}
                  {lastName.charAt(0).toUpperCase() + lastName.slice(1)}
                </span>
              </h1>
              <p className="mt-3 text-base sm:mt-5 sm:text-xl">
                A {occupation}
              </p>
              <p className="mt-2 text-base sm:text-lg">{slogan}</p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="#contact">
                  <Button variant="default">Contac Me</Button>
                </Link>
                <Link href="#projects">
                  <Button variant="secondary">View my Projects</Button>
                </Link>
              </div>
            </div>

            {/* Image for large screens */}
            <div className="hidden lg:block lg:w-1/2 xl:w-3/5 mt-10 lg:mt-0 lg:ml-8 xl:ml-16">
              <Image
                src={img}
                alt="Decorative illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex-grow flex items-center">
      {/* Background image for small screens */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="relative z-10 w-full">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-foreground">
              <span className="block">Hi, I&apos;m</span>
              <span className="block mt-1">
                {firstName.charAt(0).toUpperCase() + firstName.slice(1)}{" "}
                {lastName.charAt(0).toUpperCase() + lastName.slice(1)}
              </span>
            </h1>
            <p className="mt-3 text-base sm:mt-5 sm:text-xl lg:text-foreground">
              A {occupation}
            </p>
            <p className="mt-2 text-base sm:text-lg lg:text-foreground">
              {slogan}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-primary-dark"
              >
                View My Work
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-primary text-base font-medium rounded-md text-primary bg-background hover:bg-muted"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
