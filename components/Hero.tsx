import { brand } from "@/lib/content";
import { DiamondGrid } from "./DiamondGrid";
import { OutlineMark } from "./OutlineMark";
import { Photo } from "./Photo";

// Forced break after the comma, per the client's revision: "Good food," on
// its own line, "better mood." on the next — never left to wrap wherever
// the container happens to run out of room.
const [taglineLead, taglineRest] = brand.tagline.en.split(", ");

export function Hero() {
  return (
    <section id="home" className="pt-12 sm:pt-20">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-5">
          <DiamondGrid />
          <p className="max-w-sm text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
            {brand.tagline.zh}
          </p>
        </div>

        <p
          className="text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          style={{ color: "var(--ink)" }}
        >
          {taglineLead},
          <br />
          <span className="whitespace-nowrap">{taglineRest}</span>
        </p>
      </div>

      <div className="relative mt-14">
        <Photo
          src="https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?auto=format&fit=crop&w=2400&q=80"
          alt="Reference: warm-wood restaurant dining room — stand-in for the shop's own 30-pax room"
          credit="Unsplash"
          dark
          rounded
          className="h-[23rem] w-full sm:h-[34rem] lg:h-[46rem]"
        />
        <OutlineMark text={brand.chinese} className="text-[24vw] sm:text-[15vw] lg:text-[13vw]" />
      </div>
    </section>
  );
}
