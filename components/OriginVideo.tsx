"use client";

import { useEffect, useRef, useState } from "react";
import { story } from "@/lib/content";

/**
 * The client's origin-story video, shot vertical for social (720x1280) and
 * played at its own 9:16 rather than cropped — a landscape crop would keep
 * ~31% of the frame and cut through the subtitles burned into its lower third.
 *
 * A client component only because `controls` is an HTML attribute, not a
 * class: CSS can't add it at one breakpoint and drop it at another, so the
 * breakpoint has to be read in JS. The second client component on the site,
 * after MenuCarousel, and it follows that file's matchMedia pattern.
 *
 * Three things follow from autoplay, and they're linked:
 *
 * 1. It has to be muted. Every browser blocks autoplay with sound. The video
 *    carries burned-in English and Chinese subtitles, so it still reads
 *    silent — but nobody hears the audio track unless they unmute it on
 *    mobile, where the controls are.
 * 2. The 6.3MB file now downloads on every page load, on phones included.
 *    Autoplay and `preload="none"` are contradictory, so the earlier choice
 *    to not spend a visitor's data until they asked for it is gone. The
 *    poster still covers first paint.
 * 3. It loops. Without controls on desktop there is otherwise no way to see
 *    it again, and it would sit frozen on its end card after 35 seconds.
 *
 * `prefers-reduced-motion` is not a nicety here. WCAG 2.2.2 asks that motion
 * running longer than five seconds can be stopped, and on desktop this has no
 * visible control at all — so for anyone who has asked their OS for less
 * motion, it does not autoplay and the controls come back.
 */
const MOBILE = "(max-width: 1023.98px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

export function OriginVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  // Both start false so the first client render matches the server's.
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const watch = (query: string, set: (v: boolean) => void) => {
      const mq = window.matchMedia(query);
      const sync = () => set(mq.matches);
      sync();
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    };
    const stopMobile = watch(MOBILE, setIsMobile);
    const stopReduced = watch(REDUCED, setReducedMotion);
    return () => {
      stopMobile();
      stopReduced();
    };
  }, []);

  // The autoplay attribute has already fired by the time the media query is
  // read, so honouring the preference means pausing it back.
  useEffect(() => {
    if (reducedMotion) ref.current?.pause();
  }, [reducedMotion]);

  return (
    <video
      ref={ref}
      autoPlay={!reducedMotion}
      muted
      loop
      playsInline
      controls={isMobile || reducedMotion}
      poster="/story/origin-story-poster.jpg"
      aria-label={story.videoCaption}
      className="aspect-[9/16] w-full rounded-lg object-cover"
      style={{ background: "var(--ground-alt)" }}
    >
      <source src="/story/origin-story.mp4" type="video/mp4" />
    </video>
  );
}
