"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { shows } from "@/content/atelier";
import { AtelierDesk, InvitationCover, InvitationInside, MeasuringTapeArt, PolaroidsArt, RunwayPrintArt, SketchbookArt, ink } from "./AtelierArt";
import { BackstageRoom, ProductionRoom, RunwayRoom, ShowsRoom, SketchbookRoom } from "./Rooms";
import { ease } from "@/components/motion/tokens";
import { cn } from "@/lib/cn";

/**
 * The Fashion Atelier: a painted drafting table whose objects are the way in.
 * Each object opens a room in place (the URL hash follows, so the browser's
 * back button and shared links work), and every room has a way back.
 */

type Room = "shows" | "sketchbook" | "backstage" | "production" | "runway";
type View = { room: null } | { room: Room; show?: string };

/** Position on the desk, as % of its width/height, for wide screens (w) and phones (m). */
type Spot = { x: number; y: number; w: number; r: number };
const spots: Record<Exclude<Room, "shows">, { w: Spot; m: Spot; aspect: number; label: string; hint: string }> = {
  sketchbook: { w: { x: 28, y: 35, w: 15, r: -6 }, m: { x: 8, y: 33, w: 36, r: -5 }, aspect: 160 / 200, label: "The Sketchbook", hint: "Explore the designs" },
  backstage: { w: { x: 56, y: 8, w: 18, r: 3 }, m: { x: 50, y: 31, w: 44, r: 3 }, aspect: 220 / 200, label: "The Polaroids", hint: "Behind the scenes" },
  production: { w: { x: 4, y: 62, w: 19, r: -4 }, m: { x: 4, y: 70, w: 44, r: -4 }, aspect: 240 / 180, label: "The Measuring Tape", hint: "How it all came together" },
  runway: { w: { x: 76, y: 33, w: 17, r: 4 }, m: { x: 52, y: 62, w: 38, r: 4 }, aspect: 160 / 200, label: "The Runway Photograph", hint: "Walk the runway" },
};
const inviteSpots: { w: Spot; m: Spot }[] = [
  { w: { x: 3, y: 8, w: 8, r: -8 }, m: { x: 2, y: 6, w: 17, r: -6 } },
  { w: { x: 12, y: 6, w: 8, r: 5 }, m: { x: 21, y: 8, w: 17, r: 4 } },
  { w: { x: 4, y: 30, w: 8, r: 6 }, m: { x: 40, y: 6, w: 17, r: -3 } },
  { w: { x: 13, y: 29, w: 8, r: -4 }, m: { x: 59, y: 8, w: 17, r: 5 } },
  { w: { x: 21, y: 10, w: 8, r: 8 }, m: { x: 78, y: 6, w: 17, r: -4 } },
];

const roomNames: Record<Room, string> = {
  shows: "The Shows",
  sketchbook: "Design Process",
  backstage: "Backstage",
  production: "Production Notebook",
  runway: "The Runway",
};

function parse(hash: string): View {
  const h = hash.replace(/^#/, "");
  if (h.startsWith("show-")) {
    const id = h.slice(5);
    return shows.some((s) => s.id === id) ? { room: "shows", show: id } : { room: "shows" };
  }
  return (["shows", "sketchbook", "backstage", "production", "runway"] as string[]).includes(h) ? { room: h as Room } : { room: null };
}
const hashOf = (v: View) => (v.room === null ? "" : v.room === "shows" && v.show ? `#show-${v.show}` : `#${v.room}`);

export function Atelier() {
  const reduce = useReducedMotion();
  const [view, setView] = useState<View>({ room: null });
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setView(parse(window.location.hash));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const toTop = useCallback(() => {
    const el = root.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [reduce]);

  const go = useCallback(
    (v: View, replace = false) => {
      const url = window.location.pathname + window.location.search + hashOf(v);
      if (replace) history.replaceState({ atelier: true }, "", url);
      else history.pushState({ atelier: true }, "", url);
      setView(v);
      toTop();
    },
    [toTop],
  );

  const back = () => {
    // Return the way we came when we came from the desk; otherwise just step out.
    if (history.state?.atelier) history.back();
    else go({ room: null }, true);
    toTop();
  };

  return (
    <div ref={root} className="scroll-mt-24">
      <AnimatePresence mode="wait" initial={false}>
        {view.room === null ? (
          <motion.div key="desk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: reduce ? 1 : 0.985 }} transition={{ duration: 0.45, ease }}>
            <Desk onOpen={(room, show) => go({ room, show })} />
          </motion.div>
        ) : (
          <motion.section
            key={view.room}
            aria-labelledby="room-title"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <BackButton onClick={back} />
            <div className="mt-8">
              {view.room === "shows" && <ShowsRoom showId={view.show ?? null} onShow={(id) => go({ room: "shows", show: id }, true)} />}
              {view.room === "sketchbook" && <SketchbookRoom />}
              {view.room === "backstage" && <BackstageRoom />}
              {view.room === "production" && <ProductionRoom />}
              {view.room === "runway" && <RunwayRoom />}
            </div>
            <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-wine/20 pt-8">
              <BackButton onClick={back} />
              <nav aria-label="Other rooms" className="flex flex-wrap gap-x-6 gap-y-2">
                {(Object.keys(roomNames) as Room[])
                  .filter((r) => r !== view.room)
                  .map((r) => (
                    <button key={r} type="button" onClick={() => go({ room: r, show: r === "shows" ? shows[shows.length - 1].id : undefined }, true)} className="label link-draw text-wine">
                      {roomNames[r]}
                    </button>
                  ))}
              </nav>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="label group inline-flex items-center gap-2 rounded-full border border-wine/40 bg-ivory px-4 py-2.5 text-wine transition-colors hover:border-vermilion hover:text-vermilion">
      <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span> Back to Atelier
    </button>
  );
}

/* --- The desk ------------------------------------------------------------ */

function spotStyle(s: { w: Spot; m: Spot }) {
  return {
    ["--x" as string]: `${s.w.x}%`,
    ["--y" as string]: `${s.w.y}%`,
    ["--w" as string]: `${s.w.w}%`,
    ["--r" as string]: `${s.w.r}deg`,
    ["--mx" as string]: `${s.m.x}%`,
    ["--my" as string]: `${s.m.y}%`,
    ["--mw" as string]: `${s.m.w}%`,
    ["--mr" as string]: `${s.m.r}deg`,
  };
}

function Desk({ onOpen }: { onOpen: (room: Room, show?: string) => void }) {
  return (
    <div>
      <div className="relative mx-auto aspect-[680/1000] w-full max-w-[34rem] md:aspect-[1600/1000] md:max-w-none">
        <div className="md:hidden">
          <AtelierDesk narrow />
        </div>
        <div className="hidden md:block">
          <AtelierDesk />
        </div>

        {/* 01 the invitations, one per show */}
        <div className="group/inv">
          {shows.map((s, i) => (
            <Invitation key={s.id} spot={inviteSpots[i]} color={ink[s.ink]} year={s.year} title={s.title} onOpen={() => onOpen("shows", s.id)} />
          ))}
          <Tag
            className="left-[4%] top-[25%] md:left-[3%] md:top-[50%]"
            label="The Invitations"
            hint="Open a show"
            visible="group-hover/inv:opacity-100 group-focus-within/inv:opacity-100"
          />
        </div>

        {(Object.keys(spots) as (keyof typeof spots)[]).map((k) => (
          <DeskObject key={k} room={k} onOpen={() => onOpen(k)}>
            {k === "sketchbook" && <SketchbookArt />}
            {k === "backstage" && <PolaroidsArt />}
            {k === "production" && <MeasuringTapeArt />}
            {k === "runway" && <RunwayPrintArt />}
          </DeskObject>
        ))}
      </div>

      {/* the same five, as a plain list: handy on phones and for keyboards */}
      <nav aria-label="On the desk" className="mx-auto mt-10 max-w-4xl">
        <p className="label text-center text-ink-soft">On the desk</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {(
            [
              ["shows", "The Invitations", "The Shows", ink.vermilion],
              ["sketchbook", "The Sketchbook", "Design Process", ink.blue],
              ["backstage", "The Polaroids", "Backstage", ink.green],
              ["production", "The Measuring Tape", "Production Notebook", ink.brass],
              ["runway", "The Runway Photograph", "The Runway", ink.wine],
            ] as const
          ).map(([room, obj, name, c]) => (
            <li key={room}>
              <button
                type="button"
                onClick={() => onOpen(room, room === "shows" ? shows[shows.length - 1].id : undefined)}
                className="inline-flex items-center gap-2 rounded-full border border-wine/30 bg-ivory/60 px-4 py-2 text-left text-wine transition-colors hover:border-wine"
              >
                <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
                <span className="font-display text-base">{name}</span>
                <span className="hidden font-display text-sm italic text-ink-soft sm:inline">· {obj}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

/** A handwritten paper tag naming an object, shown on hover (always on touch screens). */
function Tag({ label, hint, className, visible }: { label: string; hint: string; className?: string; visible: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-30 hidden -rotate-2 whitespace-nowrap border border-wine/25 bg-[color-mix(in_srgb,var(--aged-ivory)_45%,white)] px-3 py-1.5 shadow-[0_6px_12px_-8px_rgb(113_63_72_/_0.6)] transition-all duration-300 ease-gallery md:block md:opacity-0",
        visible,
        className,
      )}
    >
      <span className="title-script block text-xl leading-tight text-wine">{label}</span>
      <span className="block font-display text-sm italic text-vermilion">{hint} ↗</span>
    </span>
  );
}

const placed =
  "absolute left-[var(--mx)] top-[var(--my)] w-[var(--mw)] rotate-[var(--mr)] md:left-[var(--x)] md:top-[var(--y)] md:w-[var(--w)] md:rotate-[var(--r)]";

function DeskObject({ room, onOpen, children }: { room: keyof typeof spots; onOpen: () => void; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const s = spots[room];
  const [opening, setOpening] = useState(false);
  const click = () => {
    if (opening) return;
    if (reduce) return onOpen();
    setOpening(true);
    setTimeout(onOpen, 380);
  };
  return (
    <div className={cn(placed, "group z-10 hover:z-20 focus-within:z-20")} style={spotStyle(s)}>
      <motion.button
        type="button"
        onClick={click}
        aria-label={`${s.label}: ${roomNames[room]}`}
        className="atelier-object block w-full cursor-pointer"
        style={{ aspectRatio: s.aspect }}
        whileHover={reduce ? undefined : { y: -8, scale: 1.02 }}
        animate={opening ? { y: -18, scale: 1.08 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {children}
      </motion.button>
      <Tag label={s.label} hint={s.hint} className="left-1/2 top-full mt-2 -translate-x-1/2" visible="group-hover:opacity-100 group-focus-within:opacity-100" />
    </div>
  );
}

function Invitation({ spot, color, year, title, onOpen }: { spot: { w: Spot; m: Spot }; color: string; year: string; title: string; onOpen: () => void }) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const click = () => {
    if (opening) return;
    if (reduce) return onOpen();
    setOpening(true);
    setTimeout(onOpen, 650);
  };
  return (
    <div className={cn(placed, "z-10 hover:z-20 focus-within:z-20")} style={spotStyle(spot)}>
      <motion.button
        type="button"
        onClick={click}
        aria-label={`Invitation: ${title}, ${year}`}
        className="atelier-object relative block aspect-[100/140] w-full cursor-pointer"
        style={{ perspective: 600 }}
        whileHover={reduce ? undefined : { y: -8 }}
        animate={opening ? { y: -16, scale: 1.12, rotate: 0 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <span className="absolute inset-0">
          <InvitationInside color={color} year={year} title={title} />
        </span>
        {/* the cover unfolds from its left edge */}
        <motion.span
          className="absolute inset-0"
          style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
          animate={{ rotateY: opening ? -160 : 0 }}
          transition={{ duration: 0.55, ease }}
        >
          <InvitationCover color={color} year={year} />
        </motion.span>
      </motion.button>
    </div>
  );
}
