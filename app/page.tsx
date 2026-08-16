import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Heritage } from "@/components/Heritage";
import { Hero } from "@/components/Hero";
import { InfoStrip } from "@/components/InfoStrip";
import { MenuList } from "@/components/MenuList";
import { Signature } from "@/components/Signature";
import { Story } from "@/components/Story";
import { Values } from "@/components/Values";
import { Welcome } from "@/components/Welcome";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[112rem] px-5 sm:px-8 lg:px-14">
      <Header />
      <Hero />
      <Welcome />
      <Story />
      <Heritage />
      <Values />
      <Signature />
      <MenuList />
      <InfoStrip />
      <Footer />
    </main>
  );
}
