import AboutMe from "@/components/common/About";
import Contact from "@/components/common/Contact";
import Experiance from "@/components/common/Experience";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import HeroSection from "@/components/common/Hero";
import { Projects } from "@/components/common/Projects";
import Skills from "@/components/common/Skills";
import InDevPop from "@/components/InDev";
import {
  getAboutInfo,
  getBasicInfo,
  getProjects,
  getSkills,
} from "@/app/actions";
import { fetchExperience } from "./_actions/expreience";

type componentType = {
  id: string;
  component: JSX.Element;
};
export default async function Home() {
  const basicRecord = await getBasicInfo();
  const aboutRecord = await getAboutInfo();
  const skillRecord = await getSkills();
  const projectRecord = await getProjects();

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
          img={basicRecord.summeryVid}
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
    <main className="w-screen">
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
        <div className="max-w-full w-full">
          <Header
            title={basicRecord.title}
            hasExp={experienceRecord.length > 0}
          />
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
    </main>
  );
}
