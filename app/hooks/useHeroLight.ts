"use client";

import { useEffect, useRef } from "react";

/**
 * useHeroLight — service hero "tonal lighting" interaction.
 *
 * Spec: design-system playbooks/section-01-hero.md → "Hero interaction".
 *
 * The hero background is a single-hue radial vignette (deep-olive base,
 * leaf-pale wash at low opacity). At rest, the light sits at the
 * service's documented angle (e.g. Tax = `82% 15%`, late-morning). When
 * the cursor enters the hero, the light eases toward the cursor with a
 * slow lerp; when the cursor leaves, it eases back to the resting angle.
 *
 * Motion contract:
 *   · "Slow elegant" → lerp factor 0.04 per frame (~600ms to converge)
 *   · `prefers-reduced-motion: reduce` → no motion; stays at rest
 *   · `(hover: none)` touch devices → no motion; stays at rest
 *   · Single source of truth for the gradient string lives here, so the
 *     six service heroes can never drift from each other on stops /
 *     opacities — only the resting `defaultX/Y` differs.
 *
 * Returns a ref to attach to the hero `<section>` (or any block element
 * carrying the background). The hook also writes the initial inline
 * `background-image` so SSR / no-JS / reduced-motion users still see the
 * correct resting vignette.
 */
export function useHeroLight({
  defaultX,
  defaultY,
  ellipse,
}: {
  /** Resting X position of the light, 0–100 (per-service from the playbook). */
  defaultX: number;
  /** Resting Y position of the light, 0–100 (per-service from the playbook). */
  defaultY: number;
  /** Optional ellipse size override, e.g. "55% 95%" for a narrower focused
      beam. Defaults to "80% 90%" — the canonical broad wash. Only override
      where the playbook documents a per-service variation (e.g. Assurance). */
  ellipse?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const ellipseSize = ellipse ?? "80% 90%";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Canonical gradient string — locked to the playbook spec.
    // The only variables are the `at <x>% <y>%` origin and the optional
    // ellipse size (per-service variation knob, see Assurance).
    const buildGradient = (x: number, y: number) =>
      `radial-gradient(ellipse ${ellipseSize} at ${x.toFixed(2)}% ${y.toFixed(2)}%, ` +
      `rgba(229,229,189,0.22) 0%, ` +
      `rgba(229,229,189,0.07) 35%, ` +
      `transparent 65%)`;

    // Paint the resting state immediately. (JSX also sets this for SSR;
    // we reassert here so the hook owns the value going forward.)
    el.style.backgroundImage = buildGradient(defaultX, defaultY);

    // Respect platform & user preferences — no motion on touch / reduced-motion.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noHover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;
    if (reduce || noHover) return;

    let targetX = defaultX;
    let targetY = defaultY;
    let currentX = defaultX;
    let currentY = defaultY;
    let rafId: number | null = null;

    const LERP = 0.04; // slow, elegant — ~600ms to settle
    const EPSILON = 0.05; // stop repainting once we're effectively there

    const tick = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      if (Math.abs(dx) > EPSILON || Math.abs(dy) > EPSILON) {
        currentX += dx * LERP;
        currentY += dy * LERP;
        el.style.backgroundImage = buildGradient(currentX, currentY);
      }
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const onLeave = () => {
      targetX = defaultX;
      targetY = defaultY;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [defaultX, defaultY, ellipseSize]);

  return ref;
}
