import Hero from "@/components/Hero";
import Heading from "@/components/Heading";
import Experience from "@/components/Experience";

export default async function IndexPage() {

  return (
    <main>
      <Hero />
      <Heading>Experience</Heading>
      <Experience />
    </main>
  );
}