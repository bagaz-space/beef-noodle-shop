import { story } from "@/lib/content";
import { Photo } from "./Photo";

/**
 * Mid-page photo band: the shop's opening era and lineage, flanked by the two
 * photos that carry it — the founding family on one side, the sourcing the
 * text names on the other. The DiamondGrid that used to close this row moved
 * out to make room for the second photo; it still appears in Hero and Footer.
 */
export function Heritage() {
  return (
    <section className="grid items-center gap-10 pt-14 pb-6 sm:pt-20 sm:pb-8 lg:grid-cols-[20rem_1fr_20rem] lg:gap-12">
      {/* Real photo from the client: two generations preparing food
          together — the family tradition the narrative in Values.tsx
          describes. No caption yet — pending, see Photo.tsx for how the
          label behaves once one arrives. Left undimmed — per client
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

      {/* Real photo from the client. Gives the sourcing line above it
          something to stand on — until now "Australian beef · soup bone ·
          quality pork" was an unillustrated claim. */}
      <Photo
        src="/menu/aussie-beef.jpg"
        alt="Cuts of Australian beef being trimmed on a board, beside star anise and cinnamon"
        rounded
        className="h-[18rem] w-full sm:h-[22rem] lg:h-[24rem]"
      />
    </section>
  );
}
