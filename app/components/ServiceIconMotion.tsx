"use client";

import "./ServiceIconMotion.css";

/* ──────────────────────────────────────────────────────────────
   ServiceIconMotion
   Source of truth for the six animated service icons.

   Why this component exists:
     · The motion source ships as `Service Icons in Motion.html`
       (SVG + CSS keyframes) in the design-system audits folder.
     · The mp4 / png-sequence exports have opaque backgrounds,
       which would show a visible box on dark heroes. Inline SVG
       is naturally transparent — no scrim, no extra layer.
     · Centralizing the markup + keyframes guarantees the six
       service pages stay a family — any timing or color change
       happens in one file.

   Tone:
     · "dark"  (default) — the original cream-card palette:
         rim    = --ov-grey-icon (#888D88)
         accent = --ov-olive-hover (#436A1F)
     · "light" — inverted for use on dark surfaces (e.g. the hero
       over deep-olive). Maps to the same opacity tiers the brand
       already uses (`--ov-on-dark-70` for secondary, white for
       primary).

   Accessibility:
     · `prefers-reduced-motion: reduce` → CSS forces every
       animated element to its rest state and stops repaints.
     · `aria-label` is provided per service so screen readers
       announce the icon meaningfully; pass `aria-hidden` when
       the icon is decorative (e.g. paired with adjacent text).
   ────────────────────────────────────────────────────────────── */

export type ServiceIconKey =
  | "tax"
  /* The five remaining services share the same wiring once their
     SVG + keyframes are ported from `Service Icons in Motion.html`.
     Adding one is purely additive: drop the SVG into a new render
     function, drop the keyframes into ServiceIconMotion.css under
     a matching `ov-svc-<service>` namespace. */
  | "accounting"
  | "corporate"
  | "consulting"
  | "hr"
  | "assurance";

export type ServiceIconTone = "dark" | "light";

interface Props {
  service: ServiceIconKey;
  tone?: ServiceIconTone;
  className?: string;
  /** Optional explicit label for screen readers. */
  label?: string;
  /** When true, the icon is treated as decorative. */
  ariaHidden?: boolean;
}

function colorsFor(tone: ServiceIconTone) {
  if (tone === "light") {
    return {
      rim: "rgba(255,255,255,0.70)",      // --ov-on-dark-70
      accent: "#FFFFFF",                  // --ov-on-dark
    };
  }
  return {
    rim: "#888D88",                       // --ov-grey-icon
    accent: "#436A1F",                    // --ov-olive-hover
  };
}

/* ── Tax: Tilt ─────────────────────────────────────────────────
   Two grey rims arrive as closed ellipses; each rim's hidden half
   erases away while the olive (or white) blade rotates 360° into
   its angled rest. */
function TaxMotion({ tone }: { tone: ServiceIconTone }) {
  const { rim, accent } = colorsFor(tone);
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ov-svc-icon ov-svc-tax"
    >
      {/* bottom rim: visible bottom-arc + closing top-half */}
      <g className="anim-rim-bot">
        <path
          d="M48.2009 50.0547C61.0281 51.7887 70.4385 57.4904 70.4385 64.2568C70.4385 72.3993 56.811 79.0001 40.0007 79.0001C23.1903 79.0001 9.56287 72.3993 9.56287 64.2568C9.56287 60.8767 11.9112 57.7622 15.8607 55.2754"
          stroke={rim}
          fill="none"
        />
        <path
          className="anim-closer-rim-bot"
          pathLength="1"
          d="M15.8607 55.2754 A 30.44 14.74 0 0 1 48.2009 50.0547"
          stroke={rim}
          fill="none"
          strokeLinecap="round"
        />
      </g>
      {/* top rim: visible top-arc + closing bottom-half */}
      <g className="anim-rim-top">
        <path
          d="M30.604 29.7707C18.3923 27.8527 9.56287 22.2975 9.56287 15.7433C9.56287 7.6008 23.1903 1 40.0007 1C56.811 1 70.4385 7.6008 70.4385 15.7433C70.4385 18.9354 68.3441 21.8905 64.7847 24.3039"
          stroke={rim}
          fill="none"
        />
        <path
          className="anim-closer-rim-top"
          pathLength="1"
          d="M64.7847 24.3039 A 30.44 14.74 0 0 1 30.604 29.7707"
          stroke={rim}
          fill="none"
          strokeLinecap="round"
        />
      </g>
      {/* the blade */}
      <path
        className="anim-blade"
        d="M33.0647 28.2416C40.0754 23.9324 47.2075 21.4485 53.0264 20.8643C58.96 20.2686 62.9921 21.6681 64.6531 24.3703C66.3141 27.0725 65.7419 31.302 62.5308 36.3272C59.3819 41.2552 53.9451 46.4969 46.9343 50.8062C39.9237 55.1153 32.7922 57.5988 26.9734 58.183C21.0398 58.7787 17.0076 57.3793 15.3467 54.6771C13.6858 51.9748 14.258 47.7452 17.469 42.7201C20.6179 37.7923 26.0542 32.5507 33.0647 28.2416Z"
        stroke={accent}
        strokeWidth="3"
      />
    </svg>
  );
}

/* ── Corporate: Embrace ────────────────────────────────────────
   Two grey arcs arrive as closed circles, then their closing segment
   erases to reveal the final arc. Meanwhile the pair gently rotates
   into its home embrace around the olive anchor. */
function CorporateMotion({ tone }: { tone: ServiceIconTone }) {
  const { rim, accent } = colorsFor(tone);
  return (
    <svg
      viewBox="0 0 81 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ov-svc-icon ov-svc-corp ov-svc-tone-${tone}`}
    >
      <g opacity="0.5">
        {/* Group 1: outer rotates around the olive anchor; inner scales in for the "appear" beat */}
        <g className="anim-arc-group-1">
          <g className="anim-arc-appear-1">
            <path
              d="M27.9482 50.3006C19.0689 46.2154 12.9043 37.2404 12.9043 26.8257C12.9043 12.562 24.4673 0.999023 38.731 0.999023C52.9947 0.999023 64.5576 12.562 64.5576 26.8257C64.5576 28.5232 64.3939 30.1824 64.0813 31.7885"
              stroke={rim}
              fill="none"
            />
            <path
              className="anim-closer-1"
              pathLength="1"
              d="M64.0813 31.7885 A 25.827 25.827 0 0 1 27.9482 50.3006"
              stroke={rim}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
        {/* Group 2: same nesting — scale-in + counter-rotate */}
        <g className="anim-arc-group-2">
          <g className="anim-arc-appear-2">
            <path
              d="M40.7763 73.7223C36.7021 76.409 31.822 77.9727 26.5767 77.9727C12.313 77.9727 0.75 66.4097 0.75 52.146C0.75 37.8823 12.313 26.3193 26.5767 26.3193C31.822 26.3193 36.7021 27.883 40.7763 30.5697"
              stroke={rim}
              fill="none"
            />
            <path
              className="anim-closer-2"
              pathLength="1"
              d="M40.7763 30.5697 A 25.827 25.827 0 0 1 40.7763 73.7223"
              stroke={rim}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
      <path
        className="anim-anchor"
        d="M52.0664 27.6318C66.3376 27.632 77.7764 38.7543 77.7764 52.3164C77.7762 65.8784 66.3374 76.9998 52.0664 77C37.7952 77 26.3557 65.8785 26.3555 52.3164C26.3555 38.7542 37.7951 27.6318 52.0664 27.6318Z"
        stroke={accent}
        strokeWidth="3"
      />
    </svg>
  );
}

/* ── Accounting: Stack ─────────────────────────────────────────
   Plates drop in from above, bottom-up. Each grey plate arrives as
   a closed ellipse; its top half then erases to reveal the final arc. */
function AccountingMotion({ tone }: { tone: ServiceIconTone }) {
  const { rim, accent } = colorsFor(tone);
  return (
    <svg
      viewBox="0 0 80 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ov-svc-icon ov-svc-acc ov-svc-tone-${tone}`}
    >
      <g className="anim-plate-bottom">
        <path
          d="M68.7539 49.877C71.6642 52.8464 73.3333 56.3065 73.3333 60.0004C73.3333 71.0461 58.4094 80.0004 40 80.0004C21.5905 80.0004 6.66663 71.0461 6.66663 60.0004C6.66663 56.3065 8.3357 52.8464 11.246 49.877"
          stroke={rim}
          fill="none"
        />
        <path
          className="anim-closer-bottom"
          pathLength="1"
          d="M11.246 49.877 A 33.333 20 0 0 1 68.7539 49.877"
          stroke={rim}
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g className="anim-plate-mid">
        <path
          d="M67.4074 29.2207C71.1437 32.4522 73.3333 36.3763 73.3333 40.6072C73.3333 51.6529 58.4094 60.6072 40 60.6072C21.5905 60.6072 6.66663 51.6529 6.66663 40.6072C6.66663 36.3763 8.8562 32.4522 12.5926 29.2207"
          stroke={rim}
          fill="none"
        />
        <path
          className="anim-closer-mid"
          pathLength="1"
          d="M12.5926 29.2207 A 33.333 20 0 0 1 67.4074 29.2207"
          stroke={rim}
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <path
        className="anim-plate-top"
        d="M39.9996 1.5C48.9793 1.5 57.0365 3.68736 62.7985 7.14453C68.5902 10.6196 71.8336 15.2111 71.8336 20C71.8336 24.7889 68.5902 29.3804 62.7985 32.8555C57.0365 36.3126 48.9793 38.5 39.9996 38.5C31.0202 38.4999 22.9637 36.3126 17.2018 32.8555C11.41 29.3804 8.16663 24.789 8.16663 20C8.16663 15.211 11.41 10.6196 17.2018 7.14453C22.9637 3.68741 31.0202 1.50005 39.9996 1.5Z"
        stroke={accent}
        strokeWidth="3"
      />
    </svg>
  );
}

/* ── Assurance: Eclipse ────────────────────────────────────────
   Two inner circles emerge from center, slide to their poles, then
   counter-orbit a full revolution around the rim before docking. */
function AssuranceMotion({ tone }: { tone: ServiceIconTone }) {
  const { rim, accent } = colorsFor(tone);
  return (
    <svg
      viewBox="0 0 82 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ov-svc-icon ov-svc-ass ov-svc-tone-${tone}`}
    >
      <circle className="anim-ring" cx="41" cy="41" r="40.5" stroke={rim} />
      {/* olive at left pole: outer orbits around (41,41); inner slides out from center */}
      <g className="anim-pole-l-orbit">
        <g className="anim-pole-l-slide">
          <circle cx="24.5" cy="40.5" r="23" stroke={accent} strokeWidth="3" />
        </g>
      </g>
      {/* grey at right pole: same nesting, counter-orbit */}
      <g className="anim-pole-r-orbit">
        <g className="anim-pole-r-slide">
          <circle cx="65.5" cy="40.5" r="16" stroke={rim} />
        </g>
      </g>
    </svg>
  );
}

/* ── Consulting: Ripple ────────────────────────────────────────
   Three nested rings share the same bottom-tangent source point.
   Each ring expands outward from that source. */
function ConsultingMotion({ tone }: { tone: ServiceIconTone }) {
  const { rim, accent } = colorsFor(tone);
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ov-svc-icon ov-svc-cons ov-svc-tone-${tone}`}
    >
      <path
        className="anim-ring-big"
        d="M39.9999 0.501953C61.8146 0.501953 79.4987 18.1858 79.4989 40C79.4989 61.8143 61.8147 79.499 39.9999 79.499C18.1851 79.4989 0.500854 61.8143 0.500854 40C0.501007 18.1859 18.1852 0.502044 39.9999 0.501953Z"
        stroke={rim}
      />
      <path
        className="anim-ring-mid"
        d="M39.8604 23.917C55.1313 23.9172 67.5107 36.2967 67.5107 51.5674C67.5107 66.838 55.1313 79.2175 39.8604 79.2178C24.5892 79.2178 12.209 66.8382 12.209 51.5674C12.209 36.2966 24.5892 23.917 39.8604 23.917Z"
        stroke={rim}
      />
      <path
        className="anim-ring-small"
        d="M39.5121 45.4023C48.6513 45.4026 56.0598 52.8112 56.0599 61.9502C56.0599 71.0892 48.6514 78.4978 39.5121 78.498C30.3726 78.498 22.9633 71.0894 22.9633 61.9502C22.9634 52.8111 30.3727 45.4023 39.5121 45.4023Z"
        stroke={accent}
        strokeWidth="3"
      />
    </svg>
  );
}

/* ── HR: Orbit ─────────────────────────────────────────────────
   The big body arrives as a closed circle; its upper-right segment
   erases just as the olive orbiter docks into that gap. */
function HrMotion({ tone }: { tone: ServiceIconTone }) {
  const { rim, accent } = colorsFor(tone);
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ov-svc-icon ov-svc-hr ov-svc-tone-${tone}`}
    >
      <g className="anim-arc">
        <path
          d="M49.75 7.80905C45.954 6.47719 41.8722 5.75293 37.6212 5.75293C17.3945 5.75293 0.997559 22.1499 0.997559 42.3766C0.997559 62.6033 17.3945 79.0002 37.6212 79.0002C57.8479 79.0002 74.2449 62.6033 74.2449 42.3766C74.2449 38.1265 73.5209 34.0454 72.1896 30.2501"
          stroke={rim}
          fill="none"
        />
        <path
          className="anim-closer-arc"
          pathLength="1"
          d="M72.1896 30.2501 A 36.625 36.625 0 0 0 49.75 7.80905"
          stroke={rim}
          fill="none"
          strokeLinecap="round"
        />
      </g>
      {/* olive orbiter: outer rotates around big-arc center; inner scales in for the "appear" beat */}
      <g className="anim-orbiter-rotate">
        <g className="anim-orbiter-appear">
          <circle cx="61.8797" cy="18.1227" r="15.6227" stroke={accent} strokeWidth="3" />
        </g>
      </g>
    </svg>
  );
}

const MOTIONS: Record<ServiceIconKey, (p: { tone: ServiceIconTone }) => React.ReactElement> = {
  tax: TaxMotion,
  corporate: CorporateMotion,
  accounting: AccountingMotion,
  assurance: AssuranceMotion,
  consulting: ConsultingMotion,
  hr: HrMotion,
};

export default function ServiceIconMotion({
  service,
  tone = "dark",
  className,
  label,
  ariaHidden,
}: Props) {
  const ariaProps = ariaHidden
    ? { "aria-hidden": true as const }
    : { role: "img" as const, "aria-label": label ?? `${service} service icon` };

  const Motion = MOTIONS[service];

  return (
    <div className={className} {...ariaProps}>
      <Motion tone={tone} />
    </div>
  );
}
