import AboutMe from "@/components/common/About";
import Contact from "@/components/common/Contact";
import Experiance from "@/components/common/Experience";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import HeroSection from "@/components/common/Hero";
import { Projects } from "@/components/common/Projects";
import Skills from "@/components/common/Skills";
import { fetchBasic } from "./_actions/basic";
import InDevPop from "@/components/InDev";
import { fetchAbout } from "./_actions/about";
import { fetchSkill } from "./_actions/skill";
import { fetchProject } from "./_actions/project";
import { fetchExperience } from "./_actions/expreience";

type componentType = {
  id: string;
  component: JSX.Element;
};
export default async function Home() {
  const basicRecord = await fetchBasic();
  const aboutRecord = await fetchAbout();
  const skillRecord = await fetchSkill();
  const projectRecord = await fetchProject();

  if (!basicRecord || !aboutRecord || !skillRecord || !projectRecord) {
    return (
      <div className="min-h-screen flex flex-col">
        <InDevPop />
      </div>
    );
  }

  const experienceRecord = await fetchExperience();

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
          img={basicRecord.mainImg}
        />
      ),
    },
    {
      id: "about",
      component: (
        <AboutMe
          key={1}
          img={aboutRecord.img}
          p1={aboutRecord.p1}
          p2={aboutRecord.p2}
          p3={aboutRecord.p3}
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="max-w-full w-full">
        <Header title={basicRecord.title} />
        {components.map((comp, index) => (
          <section
            className={`h-screen w-full flex flex-col items-center justify-center`}
            key={index}
            id={comp.id}
          >
            {comp.component}
          </section>
        ))}
        <Footer />,
      </div>
    </div>
  );
}
