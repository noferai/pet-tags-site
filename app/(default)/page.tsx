export const metadata = {
  title: "pet-tags-site",
  description: "Page description",
};

import Hero from "@/components/hero-home";
import Configurator from "@/components/configurator";

export default function Home() {
  return (
    <>
      <Hero />
      <Configurator />
    </>
  );
}
