"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&01";

/** Text that decodes from random glyphs into the real string once it scrolls into view. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let raf = 0;
    const total = text.length * 2 + 12;
    const tick = () => {
      frame++;
      setOut(
        text
          .split("")
          .map((ch, i) =>
            ch === " " || frame > i * 2 + 8 ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );
      if (frame < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

/** `// 01. about` style heading shared by every section. */
export function SectionHeading({ index, label, title, subtitle, align = "left", className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-12 md:mb-16", align === "center" && "text-center", className)}
    >
      <p
        className={cn(
          "font-mono text-xs md:text-sm text-primary/90 mb-3 flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <span className="text-white/30">{"//"}</span>
        <span>
          {index}. {label}
        </span>
        <span className="h-px w-12 bg-gradient-to-r from-primary/60 to-transparent" />
      </p>
      <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
        <ScrambleText text={title} />
        <span className="text-primary">.</span>
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
