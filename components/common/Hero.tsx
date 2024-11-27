import { Button } from "@/components/ui/button";
import Image from "next/image";

type commonInfo = {
  name: string;
  middleName: string;
  lastName: string;
  occupation: string;
  slogan: string;
  img: string;
};

const testCommonInfo: commonInfo = {
  name: "kelly",
  middleName: "",
  lastName: "mahlangu",
  occupation: "Full Stack Developer",
  slogan: "Better tech for all!!",
  img: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
};

export default function HeroSection() {
  return (
    <section className="relative flex-grow flex items-center">
      {/* Background image for small screens */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src={testCommonInfo.img}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="relative z-10 lg:w-1/2 xl:w-2/5">
            <h1 className="text-4xl font-extrabold tracking-tight  sm:text-5xl md:text-6xl ">
              <span className="block">{"Hi, I'm"}</span>
              <span className="block  mt-1">
                {`${
                  testCommonInfo.name.charAt(0).toUpperCase() +
                  testCommonInfo.name.slice(1)
                } ${
                  testCommonInfo.lastName.charAt(0).toUpperCase() +
                  testCommonInfo.lastName.slice(1)
                }`}
              </span>
            </h1>
            <p className="mt-3 text-base  sm:mt-5 sm:text-xl">
              {testCommonInfo.occupation}
            </p>
            <p className="mt-2 text-base sm:text-lg ">
              {testCommonInfo.slogan}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
              <Button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md">
                Contact Me
              </Button>
              <Button
                variant="ghost"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md "
              >
                View My Work
              </Button>
            </div>
          </div>

          {/* Image for large screens */}
          <div className="hidden lg:block lg:w-1/2 xl:w-3/5 mt-10 lg:mt-0 lg:ml-8 xl:ml-16">
            <Image
              src={testCommonInfo.img}
              alt="Decorative illustration"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
