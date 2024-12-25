"use client";

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
import { useEffect, useState } from "react";
import { $Enums } from "@prisma/client";
import { useSession } from "@/lib/auth-client";
import { Check, X } from "lucide-react";

type componentType = {
  id: string;
  component: JSX.Element;
};

type ProjectWithDetails = {
  id: string;
  img: string;
  name: string;
  description: string;
  stack: {
    id: number;
    level: number;
    category: $Enums.SkillCategory;
    isKnown: boolean;
    details: {
      id: number;
      name: string;
      altnames: string[];
      tags: string[];
      color: string;
      versions: {
        id: number;
        svg: string[];
        font: string[];
      };
    };
  }[];
  liveUrl: string;
  repoUrl?: string | null;
  isOpenSource: boolean;
};

type ExperienceWithDetails = {
  id: number;
  company: string;
  role: string;
  start: Date;
  end?: Date | null;
  summary: string;
  achievements: string[];
  skills: {
    id: number;
    level: number;
    category: $Enums.SkillCategory;
    isKnown: boolean;
    details: {
      id: number;
      name: string;
      altnames: string[];
      tags: string[];
      color: string;
      versions: {
        id: number;
        svg: string[];
        font: string[];
      };
    };
  }[];
};

export default function Home() {
  const [basicRecord, setBasicRecord] = useState<{
    id: "USER";
    name: string;
    surname: string;
    occupation: string;
    tagline: string;
    summeryVid: string | null;
    title: string;
  } | null>(null);
  const [aboutRecord, setAboutRecord] = useState<{
    id: "USER";
    img: string | null;
    paragraph: string;
    cv: string;
  } | null>(null);
  const [skillRecord, setSkillRecord] = useState<
    ({ details: { name: string; versions: { svg: string[] } } } & {
      id: number;
      level: number;
      category: $Enums.SkillCategory;
      isKnown: boolean;
      deviconId: number;
    })[]
  >([]);
  const [projectRecord, setProjectRecord] = useState<ProjectWithDetails[]>([]);
  const [experienceRecord, setExperienceRecord] = useState<
    ExperienceWithDetails[]
  >([]);
  const { data } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [basicInfo, aboutInfo, activeSkills, projects, experiences] =
          await Promise.all([
            getBasicInfo(),
            getAboutInfo(),
            getActiveSkills(),
            getProjects(),
            getExperiences(),
          ]);

        setBasicRecord(basicInfo);
        setAboutRecord(aboutInfo);
        setSkillRecord(activeSkills);
        setProjectRecord(projects);
        setExperienceRecord(experiences);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!basicRecord || !aboutRecord) {
    if (data) {
      console.log(data);
      return (
        <div className="min-h-screen flex flex-col">
          <p>
            <strong>Basic Details</strong>
            {basicRecord ? <Check /> : <X />}
          </p>
          <p>
            <strong>About Details</strong>
            {aboutRecord ? <Check /> : <X />}
          </p>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex flex-col">
        <InDevPop />
      </div>
    );
  }

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
    ...(skillRecord.length > 0
      ? [
          {
            id: "skills",
            component: <Skills skillList={skillRecord} key={2} />,
          },
        ]
      : []),

    ...(projectRecord.length > 0
      ? [
          {
            id: "projects",
            component: <Projects key={3} projects={projectRecord} />,
          },
        ]
      : []),

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
