import { story } from "@/lib/content";
import { DiamondGrid } from "./DiamondGrid";
import { Photo } from "./Photo";

/** Mid-page photo band: the shop's opening era and lineage. */
export function Heritage() {
  return (
    <section className="grid items-center gap-10 pt-14 pb-6 sm:pt-20 sm:pb-8 lg:grid-cols-[24rem_1fr_11rem] lg:gap-12">
      {/* Real photo from the client: two generations preparing food
          together — the family tradition the narrative in Values.tsx
          describes. No caption yet — pending, see Photo.tsx for how the
          label behaves once one arrives. No `dark` filter — per client
          feedback, the darkening layer was hiding the photo. */}
      <Photo
        src="/story/family-tradition.jpg"
        alt="Two generations preparing food together in the kitchen, grinding spices and wrapping dumplings by hand"
        rounded
        className="h-[22rem] w-full sm:h-[26rem] lg:h-[28rem]"
      />

      <div>
        <p
          className="text-4xl font-black uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          style={{ color: "var(--ink)" }}
        >
          Since {story.era}
        </p>
        {/* Sourcing, not a beat — the beats are told as a sequence just
            above in Story; repeating one here would duplicate it. */}
        <p
          className="mt-8 max-w-2xl text-sm uppercase tracking-tight"
          style={{ color: "var(--ink-muted)" }}
        >
          {story.sourcing.join(" · ")}
        </p>
      </div>

      <DiamondGrid className="mx-auto hidden lg:grid" />
    </section>
  );
}
