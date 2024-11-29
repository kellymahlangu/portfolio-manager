import AboutMe from "@/components/common/About";
import Contact from "@/components/common/Contact";
import Experiance from "@/components/common/Experiance";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import HeroSection from "@/components/common/Hero";
import { Projects } from "@/components/common/Projects";
import Skills from "@/components/common/Skills";
import { Testimonials } from "@/components/common/Testimonials";
import { fetchBasic } from "./_actions/basic";
import InDevPop from "@/components/InDev";
import { fetchAbout } from "./_actions/about";

export default async function Home() {
  const basicRecord = await fetchBasic();
  const aboutRecord = await fetchAbout();
  if (!basicRecord || !aboutRecord) {
    return (
      <div className="min-h-screen flex flex-col">
        <InDevPop />
      </div>
    );
  }

  const components = [
    <HeroSection
      firstName={basicRecord.name}
      lastName={basicRecord.surname}
      occupation={basicRecord.occupation}
      slogan={basicRecord.tagline}
      img={null}
    />,
    <AboutMe
      img={aboutRecord.img}
      p1={aboutRecord.p1}
      p2={aboutRecord.p2}
      p3={aboutRecord.p3}
      cv={aboutRecord.cv}
    />,
    <Skills />,
    <Projects />,
    <Experiance />,
    <Testimonials />,
    <Contact />,
    <Footer />,
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="max-w-full w-full">
        <Header title={basicRecord.title} />
        {components.map((component, index) => (
          <section
            className={`h-screen w-full flex flex-col items-center justify-center`}
            key={index}
          >
            {component}
          </section>
        ))}
      </div>
    </div>
  );
}
