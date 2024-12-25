"use client"

import AboutMe from "@/components/common/About";
import Contact from "@/components/common/Contact";
import Experiance from "@/components/common/Experience";
import { Header } from "@/components/common/Header";
import HeroSection from "@/components/common/Hero";
import { Projects } from "@/components/common/Projects";
import Skills from "@/components/common/Skills";
import InDevPop from "@/components/InDev";
import {
  getAboutInfo,
  getActiveSkills,
  getBasicInfo,
  getExperiences,
  getProjects,
} from "@/app/actions";

type componentType = {
  id: string;
  component: JSX.Element;
};
export default async function Home() {
  const basicRecord = await getBasicInfo();
  const aboutRecord = await getAboutInfo();
  const skillRecord = await getActiveSkills();
  const projectRecord = await getProjects();

  if (!basicRecord || !aboutRecord || !skillRecord || !projectRecord) {
    return (
      <div className="min-h-screen flex flex-col">
        <InDevPop />
      </div>
    );
  }

  const experienceRecord = await getExperiences();

  const components: componentType[] = [
    {
      id: "",
      component: (
        <HeroSection
          key={0}
          firstName={basicRecord.name}
          lastName={basicRecord.surname}
          occupation={basicRecord.occupation}
          slogan={basicRecord.tagline}
          img={basicRecord.summeryVid || ""}
        />
      ),
    },
    {
      id: "about",
      component: (
        <AboutMe
          key={1}
          img={aboutRecord.img}
          paragraph={aboutRecord.paragraph}
          cv={aboutRecord.cv}
        />
      ),
    },
    { id: "skills", component: <Skills skillList={skillRecord} key={2} /> },
    {
      id: "projects",
      component: <Projects key={3} projects={projectRecord} />,
    },
    ...(experienceRecord.length > 0
      ? [
          {
            id: "exp",
            component: <Experiance key={4} experiances={experienceRecord} />,
          },
        ]
      : []),
    {
      id: "contact",
      component: <Contact key={6} />,
    },
  ];

  return (
    <main>
      {/* <div className="min-w-screen">
      <div> */}
      <Header title={basicRecord.title} hasExp={experienceRecord.length > 0} />
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {components.map((comp, index) => (
          <section
            className={`min-h-screen w-full flex flex-col items-center justify-center snap-start`}
            key={index}
            id={comp.id}
          >
            {comp.component}
          </section>
        ))}
      </div>
      {/* </div>
      </div> */}
    </main>
  );
}
