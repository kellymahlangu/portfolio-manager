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
import { fetchSkill } from "./_actions/skill";

export default async function Home() {
  const basicRecord = await fetchBasic();
  const aboutRecord = await fetchAbout();
  const skillRecord = await fetchSkill();

  if (!basicRecord || !aboutRecord || !skillRecord) {
    return (
      <div className="min-h-screen flex flex-col">
        <InDevPop />
      </div>
    );
  }

  const experienceRecord = [];
  const testimonialsRecord = [];

  const components = [
    <HeroSection
      key={0}
      firstName={basicRecord.name}
      lastName={basicRecord.surname}
      occupation={basicRecord.occupation}
      slogan={basicRecord.tagline}
      img={basicRecord.mainImg}
    />,
    <AboutMe
      key={1}
      img={aboutRecord.img}
      p1={aboutRecord.p1}
      p2={aboutRecord.p2}
      p3={aboutRecord.p3}
      cv={aboutRecord.cv}
    />,
    <Skills skillList={skillRecord} key={2} />,
    <Projects key={3} />,
    ...(experienceRecord.length > 0 ? [<Experiance key={4} />] : []),
    ...(testimonialsRecord.length > 0 ? [<Testimonials key={5} />] : []),
    <Contact key={6} />,
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
        <Footer />,
      </div>
    </div>
  );
}
