"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A tiny fake editor that types out a syntax-highlighted snippet,
 * pauses, then clears and starts over.
 */

type Tok = [string, string]; // [text, tailwind color class]

const k = "text-orange-400";
const s = "text-lime-200";
const p = "text-amber-200";
const f = "text-yellow-300";
const d = "text-white/60";
const c = "text-white/30";

const LINES: Tok[][] = [
  [["// shahad.ts", c]],
  [["const ", k], ["developer", f], [" = {", d]],
  [["  name", p], [": ", d], ["\"Shahad Hassan\"", s], [",", d]],
  [["  role", p], [": ", d], ["\"Full Stack Developer\"", s], [",", d]],
  [["  stack", p], [": [", d], ["\"Next.js\"", s], [", ", d], ["\"Node\"", s], [", ", d], ["\"SQL\"", s], ["],", d]],
  [["  coffee", p], [": ", d], ["Infinity", k], [",", d]],
  [["  available", p], [": ", d], ["true", k], [",", d]],
  [["};", d]],
  [],
  [["developer", f], [".", d], ["ship", p], ["(", d], ["\"your idea\"", s], [");", d]],
];

const TOTAL = LINES.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);

export function CodeEditorCard({ className }: { className?: string }) {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(TOTAL);
      return;
    }
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      n += 1;
      if (n > TOTAL + 90) n = 0; // ~2.5s pause on the finished snippet
      setTyped(Math.min(n, TOTAL));
      timer = setTimeout(step, n === 0 ? 400 : 28 + Math.random() * 40);
    };
    timer = setTimeout(step, 900);
    return () => clearTimeout(timer);
  }, []);

  let budget = typed;
  let cursorPlaced = false;

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.1] bg-[hsl(24,10%,8%)]/90 backdrop-blur-xl shadow-2xl shadow-orange-500/10 overflow-hidden",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07] bg-white/[0.02]">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-[11px] font-mono text-white/40">shahad.ts</span>
      </div>
      <pre className="px-4 py-4 text-[11px] sm:text-xs leading-[1.7] font-mono overflow-hidden">
        {LINES.map((line, li) => {
          const out: JSX.Element[] = [];
          for (let ti = 0; ti < line.length; ti++) {
            const [text, cls] = line[ti];
            if (budget <= 0) break;
            const shown = text.slice(0, budget);
            budget -= shown.length;
            out.push(
              <span key={ti} className={cls}>
                {shown}
              </span>
            );
          }
          const lineDone = budget > 0;
          if (lineDone) budget -= 1;
          const showCursor = !cursorPlaced && (!lineDone || li === LINES.length - 1);
          if (showCursor) cursorPlaced = true;
          return (
            <div key={li} className="flex min-h-[1.7em]">
              <span className="w-6 shrink-0 select-none text-white/20">{li + 1}</span>
              <span className="whitespace-pre">
                {out}
                {showCursor && (
                  <span className="inline-block w-[7px] h-[1.1em] -mb-[2px] bg-amber-300/90 animate-pulse" />
                )}
              </span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
