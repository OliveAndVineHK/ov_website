"use client";

/* ──────────────────────────────────────────────────────────────
   CurveMotif — Pattern 02 right-edge signature

   Per-service decorative curve, slipping off the section's right edge.
   The design intent (corrected · 2026-05-28) is **elegance**, not
   motion-graphic mimicry. Each service gets a different curve, but the
   shapes are designed to look composed and intentional on their own —
   they don't try to encode a metaphor.

   Invariants (from playbooks/section-02-explainer.md):
     · single olive hue — stroke is --ov-olive (#627F38)
     · stroke opacity 0.30–0.50
     · cropped at the section's right edge
     · never overlaps the text
     · only appears in Pattern 02
     · asymmetric > symmetric; long sweeping lines > short stubby arcs

   The motif is hidden below md (the right column of the explainer
   collapses to mobile single-column, where decoration is noise).
   ────────────────────────────────────────────────────────────── */

import type { ServiceIconKey } from "@/app/components/ServiceIconMotion";

interface Props {
  service: ServiceIconKey;
  className?: string;
}

/* All curves render inside a fixed 520×520 viewBox, positioned with
   `-right-40 -top-24` on the host section so the geometry slips off
   the right edge as required. */
const VIEW = "0 0 520 520";

function TaxCurve() {
  /* Concentric — symbol of the recurring fiscal year. */
  return (
    <svg aria-hidden width="520" height="520" viewBox={VIEW} fill="none">
      <circle cx="260" cy="260" r="240" stroke="#627F38" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="260" cy="260" r="170" stroke="#627F38" strokeOpacity="0.50" strokeWidth="1" />
    </svg>
  );
}

function AccountingCurve() {
  /* One long elegant sweep cutting diagonally through the panel, with a
     single quieter parallel behind it. Asymmetric, anchored — feels
     composed rather than three wobbly horizontals stacked. */
  return (
    <svg aria-hidden width="520" height="520" viewBox={VIEW} fill="none">
      {/* Primary sweep — upper-left to lower-right, long and shallow */}
      <path
        d="M 30 80 C 180 200 320 320 510 470"
        stroke="#627F38"
        strokeOpacity="0.50"
        strokeWidth="1.25"
        fill="none"
      />
      {/* Secondary — softer parallel, slightly offset */}
      <path
        d="M 110 40 C 240 170 360 290 520 410"
        stroke="#627F38"
        strokeOpacity="0.30"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

function CorporateCurve() {
  /* Two long sweeping curves crossing at the panel's right edge, forming
     a lens-like intersection that points off-canvas. Anchored, asymmetric,
     elegant — no decorative third stroke. */
  return (
    <svg aria-hidden width="520" height="520" viewBox={VIEW} fill="none">
      <path
        d="M 0 100 C 200 200 360 300 520 220"
        stroke="#627F38"
        strokeOpacity="0.50"
        strokeWidth="1.25"
        fill="none"
      />
      <path
        d="M 0 420 C 200 320 360 220 520 300"
        stroke="#627F38"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

function ConsultingCurve() {
  /* One large quarter-arc anchored at the upper-right, with a single
     smaller arc nested inside it. Asymmetric, leaving negative space
     at the lower-left for a sense of breath. */
  return (
    <svg aria-hidden width="520" height="520" viewBox={VIEW} fill="none">
      <path
        d="M 520 110 A 410 410 0 0 0 110 520"
        stroke="#627F38"
        strokeOpacity="0.45"
        strokeWidth="1.25"
        fill="none"
      />
      <path
        d="M 520 240 A 280 280 0 0 0 240 520"
        stroke="#627F38"
        strokeOpacity="0.30"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

function HrCurve() {
  /* Sweep — a single long arc passing through the section (Orbit). */
  return (
    <svg aria-hidden width="520" height="520" viewBox={VIEW} fill="none">
      <path
        d="M 0 480 C 120 120 360 60 520 280"
        stroke="#627F38"
        strokeOpacity="0.50"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="380" cy="120" r="38" stroke="#627F38" strokeOpacity="0.45" strokeWidth="1" fill="none" />
    </svg>
  );
}

function AssuranceCurve() {
  /* Intersection — two circles overlapping (Eclipse). */
  return (
    <svg aria-hidden width="520" height="520" viewBox={VIEW} fill="none">
      <circle cx="190" cy="260" r="170" stroke="#627F38" strokeOpacity="0.45" strokeWidth="1" fill="none" />
      <circle cx="350" cy="260" r="170" stroke="#627F38" strokeOpacity="0.45" strokeWidth="1" fill="none" />
    </svg>
  );
}

const CURVES: Record<ServiceIconKey, () => React.ReactElement> = {
  tax: TaxCurve,
  accounting: AccountingCurve,
  corporate: CorporateCurve,
  consulting: ConsultingCurve,
  hr: HrCurve,
  assurance: AssuranceCurve,
};

export default function CurveMotif({ service, className }: Props) {
  const Curve = CURVES[service];
  return (
    <div
      aria-hidden
      className={
        className ??
        "pointer-events-none absolute -right-40 -top-24 hidden md:block"
      }
    >
      <Curve />
    </div>
  );
}
