import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutMe() {
  const data = {
    img: "/placeholder.svg?height=200&width=200",
    cv: "/resume.pdf",
    p1: "Hello! I'm Jane Doe, currently serving as a Senior Software Engineer at TechCorp. With over a decade of experience in web development, I specialize in creating robust and scalable applications.",
    p3: "When I'm not coding, you can find me exploring hiking trails, experimenting with new recipes in the kitchen, or mentoring aspiring developers. I'm passionate about fostering diversity in tech and regularly speak at conferences on this topic.",
    p2: "Throughout my career, I've led numerous successful projects, including the development of a high-traffic e-commerce platform that increased sales by 200%. I'm also proud to have contributed to several open-source projects and have been recognized as a Google Developer Expert.",
  };
  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">About Me</h2>
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
        <div className="md:w-1/3 flex justify-center md:justify-start order-first">
          <Image
            src={data.img}
            alt="Professional headshot of Jane Doe"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
        <div className="space-y-4 md:w-2/3">
          <p>{data.p1}</p>
          <p>{data.p2}</p>
          <p>{data.p3}</p>
          <Button asChild className="mt-4">
            <Link href={data.cv}>View Full Resume</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
