"use client";

import { useEffect, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   HeroTypewriterCycle

   The about cluster's hero rhythmic device (Decision I · playbook
   about/section-hero.md). One word at a time, fades word-to-word.

   Differs from the existing `TypewriterText`:
     · TypewriterText reveals a single fixed string char-by-char
       with a blinking cursor (homepage typewriter).
     · This cycles through a list of WORDS, each word visible whole,
       with no cursor — fades in, holds, fades out, next word.

   Motion contract:
     · `prefers-reduced-motion: reduce` → freezes on the first word.
       No fade, no rotation, no flicker.
     · Plays infinitely otherwise.
     · Defaults: 2200ms hold per word, 350ms fade.
   ────────────────────────────────────────────────────────────── */

interface Props {
  /** Words to cycle through, in order. Repeats forever. */
  words: string[];
  /** ms each word stays fully visible. Default 2200. */
  holdMs?: number;
  /** ms for the fade in/out between words. Default 350. */
  fadeMs?: number;
  /** Extra classes for the typography (size / weight / color). */
  className?: string;
}

export default function HeroTypewriterCycle({
  words,
  holdMs = 2200,
  fadeMs = 350,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  /* Detect reduced-motion once on mount. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  /* Drive the cycle. Skipped if reduced motion or only one word. */
  useEffect(() => {
    if (reduced) return;
    if (!words || words.length <= 1) return;

    const cycle = holdMs + fadeMs * 2;
    const fadeOut = setTimeout(() => setVisible(false), holdMs + fadeMs);
    const advance = setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
      setVisible(true);
    }, cycle);

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(advance);
    };
  }, [index, reduced, words, holdMs, fadeMs]);

  const word = words?.[index] ?? "";

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        opacity: reduced ? 1 : visible ? 1 : 0,
        transition: reduced ? "none" : `opacity ${fadeMs}ms ease`,
      }}
    >
      {word}
    </span>
  );
}
