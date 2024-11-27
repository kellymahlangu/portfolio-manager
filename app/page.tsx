import AboutMe from "@/components/common/About";
import Contact from "@/components/common/Contact";
import { Experiance } from "@/components/common/Experiance";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import HeroSection from "@/components/common/Hero";
import { Projects } from "@/components/common/Projects";
import { Skills } from "@/components/common/Skills";
import { Testimonials } from "@/components/common/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <AboutMe />
      <Skills />
      <Projects />
      <Experiance />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
