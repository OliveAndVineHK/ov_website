"use client";

/* ──────────────────────────────────────────────────────────────
   ExplainerDiagram — Pattern 02 visual anchor (Decision H)

   Each service's explainer gets a bespoke SVG diagram that visualises
   how its sub-areas relate. The diagram echoes the service's hero
   motion metaphor:

   | Service     | Diagram          | Echoes |
   |-------------|------------------|---------|
   | tax         | three-circle Venn| three parallel domains (Profits/Salaries/Advisory) |
   | accounting  | layered plates   | the Stack motion (Bookkeeping → Accounting → Private) |
   | corporate   | lifecycle path   | Start Up → In Business → Exit (TODO when page is rebuilt) |
   | consulting  | ripple source    | central source → expanding sub-domains (TODO) |
   | hr          | orbit nodes      | people circulating around the firm (TODO) |
   | assurance   | three stages     | Plan → Verify → Report (TODO) |

   Composition rule:
   - Diagram replaces the prior text-list in the explainer's right column
   - Sub-area details (label + body + bullets) move below as a 3-column row

   OPEN CLAUSE (per founder · 2026-05-28):
   - Where an existing illustration in /public/services/ (b1.svg,
     a1.svg, cs1.svg, t2.svg, au2.svg, etc.) fits the diagram's
     intent naturally — restyled to the brand palette — it MAY
     substitute for the bespoke SVG. Document the substitution at
     the page level and keep the prop contract identical so the
     consumer doesn't need to know which it got.

   Until a service's diagram is ported, the component renders
   nothing (graceful no-op) so unrebuilt pages aren't broken.
   ────────────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";
import type { ServiceIconKey } from "@/app/components/ServiceIconMotion";

type Tone = "dark" | "light";

interface Props {
  service: ServiceIconKey;
  /** "dark" (default) for cream/white surfaces; "light" if ever placed on a dark surface. */
  tone?: Tone;
  className?: string;
  /** Optional override labels (per-page, per-language). The diagrams ship
      with sensible defaults so the component is usable without any copy. */
  labels?: {
    a?: string;  // first node / region / plate
    b?: string;  // second
    c?: string;  // third
  };
}

function colorsFor(tone: Tone) {
  if (tone === "light") {
    return {
      stroke: "#FFFFFF",
      strokeSoft: "rgba(255,255,255,0.55)",
      fill: "rgba(255,255,255,0.08)",
      text: "#FFFFFF",
      textSoft: "rgba(255,255,255,0.70)",
    };
  }
  return {
    stroke: "#495F2B",           // --ov-olive-deep
    strokeSoft: "#627F38",       // --ov-olive
    fill: "rgba(98,127,56,0.07)",
    text: "#111B12",             // --ov-ink
    textSoft: "rgba(17,27,18,0.55)",
  };
}

/* ── Tax — three intersecting circles (parallel domains) ─────── */
function TaxDiagram({ tone = "dark", labels }: { tone?: Tone; labels?: Props["labels"] }) {
  const c = colorsFor(tone);
  const a = labels?.a ?? "Profits";
  const b = labels?.b ?? "Salaries";
  const cL = labels?.c ?? "Advisory";
  return (
    <svg viewBox="0 0 360 320" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three intersecting tax domains">
      {/* three overlapping circles — labelled outside to keep the intersections clean */}
      <circle cx="130" cy="135" r="92" stroke={c.strokeSoft} strokeWidth="1.5" fill={c.fill} />
      <circle cx="230" cy="135" r="92" stroke={c.strokeSoft} strokeWidth="1.5" fill={c.fill} />
      <circle cx="180" cy="220" r="92" stroke={c.strokeSoft} strokeWidth="1.5" fill={c.fill} />
      {/* anchor — the center where all three intersect */}
      <circle cx="180" cy="160" r="6" fill={c.stroke} />
      {/* labels outside each circle */}
      <text x="80" y="50" textAnchor="middle" fontSize="13" fontWeight="500" fill={c.text}>{a}</text>
      <text x="280" y="50" textAnchor="middle" fontSize="13" fontWeight="500" fill={c.text}>{b}</text>
      <text x="180" y="310" textAnchor="middle" fontSize="13" fontWeight="500" fill={c.text}>{cL}</text>
      {/* small caption under the anchor */}
      <text x="180" y="280" textAnchor="middle" fontSize="11" fill={c.textSoft}>One conversation across three</text>
    </svg>
  );
}

/* ── Accounting — three stacked plates (layered structure) ─────
   Animated stack: when the diagram enters the viewport, the three
   plates appear bottom-up (Bookkeeping → Accounting → Private),
   each falling into place a step after the one before. Honours
   prefers-reduced-motion: reduce. */
function AccountingDiagram({ tone = "dark", labels }: { tone?: Tone; labels?: Props["labels"] }) {
  const c = colorsFor(tone);
  const a = labels?.a ?? "Bookkeeping";
  const b = labels?.b ?? "Accounting";
  const cL = labels?.c ?? "Private Accounting";
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const svg = svgRef.current;
    if (!svg) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const groups = Array.from(svg.querySelectorAll<SVGGElement>("g[data-plate]"));

    if (reduced) {
      groups.forEach((g) => {
        g.style.opacity = "1";
        g.style.transform = "translateY(0)";
      });
      return;
    }

    // Initial hidden state — plates start above their final position so
    // they appear to drop onto the stack from above. Bottom plate first.
    groups.forEach((g) => {
      g.style.opacity = "0";
      g.style.transform = "translateY(-30px)";
      g.style.transformOrigin = "center";
      g.style.transformBox = "fill-box";
      g.style.transition = "none";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          groups.forEach((g, idx) => {
            // bottom (data-plate="0") fires first, then mid, then top
            const delay = idx * 280; // 280ms between plates
            requestAnimationFrame(() => {
              g.style.transition = `opacity 480ms ease-out ${delay}ms, transform 540ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms`;
              g.style.opacity = "1";
              g.style.transform = "translateY(0)";
            });
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25, rootMargin: "0px" }
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 360 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Three layered accounting plates"
    >
      {/* bottom plate — foundation, widest. data-plate="0" so it animates first. */}
      <g data-plate="0">
        <ellipse cx="180" cy="245" rx="160" ry="28" stroke={c.strokeSoft} strokeWidth="1.5" fill={c.fill} />
        <text x="180" y="250" textAnchor="middle" fontSize="13" fontWeight="500" fill={c.text}>{a}</text>
        <text x="180" y="285" textAnchor="middle" fontSize="11" fill={c.textSoft}>01 / foundation</text>
      </g>
      {/* mid plate */}
      <g data-plate="1">
        <ellipse cx="180" cy="155" rx="140" ry="26" stroke={c.strokeSoft} strokeWidth="1.5" fill={c.fill} />
        <text x="180" y="160" textAnchor="middle" fontSize="13" fontWeight="500" fill={c.text}>{b}</text>
        <text x="180" y="195" textAnchor="middle" fontSize="11" fill={c.textSoft}>02 / structured reading</text>
      </g>
      {/* top plate — narrowest, fires last */}
      <g data-plate="2">
        <ellipse cx="180" cy="70" rx="120" ry="24" stroke={c.stroke} strokeWidth="2" fill={c.fill} />
        <text x="180" y="75" textAnchor="middle" fontSize="13" fontWeight="500" fill={c.text}>{cL}</text>
        <text x="180" y="108" textAnchor="middle" fontSize="11" fill={c.textSoft}>03 / dedicated oversight</text>
      </g>
    </svg>
  );
}

const DIAGRAMS: Partial<Record<ServiceIconKey, (p: { tone?: Tone; labels?: Props["labels"] }) => React.ReactElement>> = {
  tax: TaxDiagram,
  accounting: AccountingDiagram,
  /* corporate, consulting, hr, assurance — to be authored as those pages
     are rebuilt. Until then, the host page falls back to the existing
     text-only explainer layout (Pattern 02 v1). */
};

export default function ExplainerDiagram({ service, tone = "dark", className, labels }: Props) {
  const Diagram = DIAGRAMS[service];
  if (!Diagram) return null;
  return (
    <div className={className ?? "w-full"}>
      <Diagram tone={tone} labels={labels} />
    </div>
  );
}
