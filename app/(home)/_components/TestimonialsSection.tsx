"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "../_data/testimonials";

const SLIDE_MS = 7000;
// Progress ring around the active avatar (56px photo + 6px gap each side)
const RING_SIZE = 72;
const RING_R = 34;
const RING_C = 2 * Math.PI * RING_R;
// How far (px) or how fast (px/s) a drag must go to change the slide
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

function NavButton({ dir, onClick, className = "" }: { dir: -1 | 1; onClick: () => void; className?: string }) {
  const Icon = dir < 0 ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={dir < 0 ? "Previous testimonial" : "Next testimonial"}
      onClick={onClick}
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-full md:h-11 md:w-11 border border-white/[0.12] bg-white/[0.03] text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground",
        className,
      )}
    >
      <Icon size={20} />
    </button>
  );
}

/** Splits the quote into words that blur into focus one after another; words inside `highlight` get the accent colour. */
function HighlightedQuote({ quote, highlight }: { quote: string; highlight: string }) {
  const start = quote.indexOf(highlight);
  const end = start + highlight.length;
  let pos = 0;
  return (
    <>
      {quote.split(" ").map((word, k) => {
        const from = quote.indexOf(word, pos);
        pos = from + word.length;
        const accent = start !== -1 && from >= start && from < end;
        return (
          <motion.span
            key={k}
            variants={{
              hidden: { opacity: 0, y: 8, filter: "blur(8px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn("inline-block", accent && "font-semibold text-primary")}
          >
            {word}&nbsp;
          </motion.span>
        );
      })}
    </>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  // Which way the slides are moving: 1 = forward, -1 = back
  const [dir, setDir] = useState<1 | -1>(1);
  const [reduce, setReduce] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const t = TESTIMONIALS[active];
  // Hold the ring while the active avatar is hovered or the section is off-screen
  const paused = hovered === active || !inView;

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = (d: 1 | -1) => {
    setDir(d);
    setActive((a) => (a + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  };
  const next = () => go(1);
  const prev = () => go(-1);
  const pick = (i: number) => {
    setDir(i >= active ? 1 : -1);
    setActive(i);
  };

  return (
    <section id="testimonials" className="section-wrapper section-dark relative">
      <div className="section-container relative z-20">
        <SectionHeading
          index="05"
          label="testimonials"
          title="Kind words"
          subtitle="What mentors and people I've worked with have to say."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          ref={ref}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -120, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.2 }}
            className="mx-auto w-fit"
          >
            <Quote className="h-12 w-12 rotate-180 fill-primary/20 text-primary" strokeWidth={1.25} />
          </motion.div>

          <div className="relative mt-6">
            <NavButton dir={-1} onClick={prev} className="absolute -left-20 top-1/2 hidden -translate-y-1/2 md:grid" />
            <NavButton dir={1} onClick={next} className="absolute -right-20 top-1/2 hidden -translate-y-1/2 md:grid" />
            {/* Drag or swipe the quote sideways to change slides */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, { offset, velocity }) => {
                if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) next();
                else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) prev();
              }}
              className="relative min-h-[260px] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:min-h-[200px]"
            >
              <AnimatePresence mode="wait" custom={dir}>
                <motion.blockquote
                  key={active}
                  custom={dir}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    hidden: (d: number) => ({ x: d * 40 }),
                    show: { x: 0, transition: { staggerChildren: 0.018, delayChildren: 0.1 } },
                    exit: (d: number) => ({ x: d * -40, opacity: 0, filter: "blur(6px)", transition: { duration: 0.3 } }),
                  }}
                  className="text-lg font-medium leading-relaxed text-foreground/85 sm:text-xl md:text-2xl md:leading-relaxed"
                >
                  <HighlightedQuote quote={t.quote} highlight={t.highlight} />
                </motion.blockquote>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* On phones the arrows flank the avatars; the row shrinks a touch on the narrowest screens */}
          <div className="mt-10 flex items-center justify-center gap-1.5 max-[359px]:scale-90 sm:gap-4">
            <NavButton dir={-1} onClick={prev} className="md:hidden" />
            {TESTIMONIALS.map((p, i) => (
              <motion.span
                key={p.name}
                initial={{ opacity: 0, y: 40, scale: 0.6 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.4 + i * 0.12 }}
                className="inline-flex"
              >
                <button
                  type="button"
                  aria-label={`Show ${p.name}'s testimonial`}
                  aria-pressed={i === active}
                  onClick={() => pick(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    "relative grid place-items-center rounded-full transition-all duration-300",
                    i === active ? "scale-110" : "opacity-50 grayscale hover:opacity-90 hover:grayscale-0",
                  )}
                  style={{ width: RING_SIZE, height: RING_SIZE }}
                >
                  <Image src={p.src} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover object-top" />

                  {i === active && (
                    <svg aria-hidden viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} className="absolute inset-0 -rotate-90">
                      <circle
                        cx={RING_SIZE / 2}
                        cy={RING_SIZE / 2}
                        r={RING_R}
                        fill="none"
                        strokeWidth={2.5}
                        className="stroke-white/10"
                      />
                      <circle
                        // Re-mount on every slide so the fill restarts from empty
                        key={active}
                        cx={RING_SIZE / 2}
                        cy={RING_SIZE / 2}
                        r={RING_R}
                        fill="none"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeDasharray={RING_C}
                        className="ring-fill stroke-primary"
                        style={
                          reduce
                            ? { strokeDashoffset: 0 }
                            : ({
                                "--ring-c": `${RING_C}px`,
                                animationDuration: `${SLIDE_MS}ms`,
                                animationPlayState: paused ? "paused" : "running",
                              } as React.CSSProperties)
                        }
                        onAnimationEnd={next}
                      />
                    </svg>
                  )}
                </button>
              </motion.span>
            ))}
            <NavButton dir={1} onClick={next} className="md:hidden" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5">
              <p className="font-bold text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.designation}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
