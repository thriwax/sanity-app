import Hero from "@/components/Hero";
import Heading from "@/components/Heading";
import Experience from "@/components/Experience";
import LatestProjects from "@/components/LatestProjects";
import Banner from "@/components/Banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "I'm a Web Developer | My Portfolio – Fedor Tatarintsev",
  description: "Leveraging 2 years of user-centered design experience across B2B, B2C, SaaS, and Web3, alongside 6+ years in project management and implementation, I deliver comprehensive digital solutions that propel businesses toward growth.",
};

export default async function IndexPage() {

  return (
    <main className="mx-5 lg:mx-0">
      <Hero />
      <Banner />
      <Heading>Experience</Heading>
      <Experience />
      <Heading>Projects</Heading>
      <LatestProjects />
    </main>
  );
}