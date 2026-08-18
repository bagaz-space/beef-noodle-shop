import { nav, story } from "@/lib/content";
import { Character } from "./Character";
import { Photo } from "./Photo";

/**
 * The three real beats from the brief, told as a short numbered story
 * instead of a data-fact row — no invented wording, just story.beats
 * rendered in order.
 */
const facts = [
  { n: "01", value: story.beats[0] },
  { n: "02", value: story.beats[1] },
  { n: "03", value: story.beats[2] },
];

export function Story() {
  return (
    <section id="story" className="py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--ink-muted)" }}>
            {nav.story}
          </p>
          <h2
            className="mt-5 max-w-3xl text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: "var(--ink)" }}
          >
            {story.pullQuote}
          </h2>
        </div>

        {/* A real heritage stat, standing in for a "5.0 stars" trust block we
            have no rating data for. */}
        <p
          className="text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-right"
          style={{ color: "var(--ink)" }}
        >
          {story.era}
        </p>
      </div>

      {/* Three blocks: character, beats, photo. The chef used to sit above the
          eyebrow at the top of the section; down here it shares a row instead
          of floating alone over the headline. */}
      <div className="mt-12 grid gap-8 border-t pt-8 lg:grid-cols-[9rem_1fr_14rem_20rem] lg:gap-12" style={{ borderColor: "var(--line)" }}>
        <Character name="chef" className="w-24 self-center sm:w-32 lg:w-full" />

        <div className="flex flex-col justify-center divide-y" style={{ borderColor: "var(--line)" }}>
          {facts.map((fact) => (
            <div key={fact.n} className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
              <span className="text-sm" style={{ color: "var(--ink-muted)" }}>
                {fact.n}
              </span>
              <span className="max-w-md text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
                {fact.value}
              </span>
            </div>
          ))}
        </div>

        {/*
         * The client's origin-story video, shot vertical for social (720x1280).
         * Played at its own 9:16 rather than cropped to fit a landscape slot:
         * a 16:9 crop would keep only ~31% of the frame and cut straight
         * through the subtitles burned into its lower third. This is also why
         * it isn't the hero background — it runs 35s, carries its own text,
         * and ends on a logo card, none of which a background loop can do.
         *
         * Not autoplayed and preload="none": the file is 6.3MB, and plenty of
         * people open this on mall wifi. The poster is the video's own opening
         * card, so the still frame already says what it is.
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

        {/* Real photo from the client, with its own caption — see
            konten-baru/foto/README.md for the full copy this is drawn from. */}
        <Photo
          src="/menu/classic-beef-noodles.jpg"
          alt="A bowl of the shop's classic beef noodles"
          rounded
          caption="A bowl that tells a story."
          className="aspect-[3/2] w-full"
        />
      </div>
    </section>
  );
}
