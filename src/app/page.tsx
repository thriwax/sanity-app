import Hero from "@/components/Hero";
import Heading from "@/components/Heading";
import Experience from "@/components/Experience";
import LatestProjects from "@/components/LatestProjects";
import Banner from "@/components/Banner";

export default async function IndexPage() {

  return (
    <main>
      <Hero />
      <Banner />
      <Heading>Experience</Heading>
      <Experience />
      <Heading>Projects</Heading>
      <LatestProjects />
    </main>
  );
}