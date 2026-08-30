import Hero from "@/sections/Hero";
import About from "@/sections/About";
import WhatIBuild from "@/sections/WhatIBuild";
import Stack from "@/sections/Stack";
import Projects from "@/sections/Projects";
import CurrentlyBuilding from "@/sections/CurrentlyBuilding";
import Timeline from "@/sections/Timeline";
import Activity from "@/sections/Activity";
import Contact from "@/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <WhatIBuild />
      <Stack />
      <Projects />
      <CurrentlyBuilding />
      <Timeline />
      <Activity />
      <Contact />
    </>
  );
}
