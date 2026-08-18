import { story } from "@/lib/content";
import { Photo } from "./Photo";

/**
 * Mid-page band: the shop's opening era and lineage, flanked by the family
 * photo on one side and the client's origin-story video on the other.
 *
 * The video replaced a sourcing photo (aussie-beef.jpg) that used to stand
 * under the "Australian beef · soup bone · quality pork" line. That line is
 * an unillustrated claim again as a result — worth a photo of its own if one
 * ever arrives, but not worth keeping a stock-ish still over the client's own
 * footage.
 *
 * The DiamondGrid that used to close this row moved out to make room for the
 * third column; it still appears in Hero and Footer.
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

      {/*
       * The client's origin-story video, in place of the sourcing photo that
       * used to sit here. Shot vertical for social (720x1280) and played at
       * its own 9:16 rather than cropped: a landscape crop would keep ~31% of
       * the frame and cut through the subtitles burned into its lower third.
       *
       * Never autoplayed, and preload="none": the file is 6.3MB and plenty of
       * people open this on mall wifi, so nothing but the poster loads until
       * someone presses play. The poster is the video's own opening card, so
       * the still frame already says what it is.
       */}
      <figure className="m-0">
        <video
          controls
          preload="none"
          playsInline
          poster="/story/origin-story-poster.jpg"
          aria-label={story.videoCaption}
          className="aspect-[9/16] w-full rounded-lg object-cover"
          style={{ background: "var(--ground-alt)" }}
        >
          <source src="/story/origin-story.mp4" type="video/mp4" />
        </video>
        <figcaption className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
          {story.videoCaption}
        </figcaption>
      </figure>
    </section>
  );
}
