import { nav, story } from "@/lib/content";
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

      <div className="mt-12 grid gap-8 border-t pt-8 lg:grid-cols-[1fr_18rem] lg:gap-12" style={{ borderColor: "var(--line)" }}>
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

        {/* Real photo from the client, with its own caption — see
            konten-baru/foto/README.md for the full copy this is drawn from. */}
        <Photo
          src="/menu/classic-beef-noodles.jpg"
          alt="A bowl of the shop's classic beef noodles"
          rounded
          caption="A bowl that tells a story."
          className="h-56 w-full sm:h-72 lg:h-full"
        />
      </div>
    </section>
  );
}
