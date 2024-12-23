"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AboutMeProps {
  img: string | null;
  paragraph: string;
  cv: string;
}
export default async function AboutMe({ img, paragraph, cv }: AboutMeProps) {
  if (img) {
    return (
      <section className="w-full mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">About Me</h2>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
          <div className="md:w-1/3 flex md:justify-start order-first">
            <Image
              src={img}
              alt="headshot Image"
              width={300}
              height={250}
              className="rounded-full"
            />
          </div>
          <div className="space-y-4 md:w-2/3">
            <p>{paragraph}</p>
            <Button asChild className="mt-4">
              <Link href={cv}>View Full Resume</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">About Me</h2>
      <div className="space-y-4">
      <p>{paragraph}</p>
        <Button asChild className="mt-4">
          <Link href={cv}>View Full Resume</Link>
        </Button>
      </div>
    </section>
  );
}
