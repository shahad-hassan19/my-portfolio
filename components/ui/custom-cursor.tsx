"use client";

import { useEffect, useRef } from "react";

/**
 * Dot + trailing ring cursor.
 * - links/buttons: ring grows and fills softly, dot hides
 * - elements with [data-cursor="<label>"]: ring grows big and shows the label
 * - text fields: custom cursor hides so the native I-beam shows
 * - mouse down: ring tightens
 * Positions are written straight to the DOM — no React re-renders.
 */

const RING_LERP = 0.18;
const INTERACTIVE = "a, button, [role='button'], label, summary, select, [data-cursor-hover]";
const TEXT = "input, textarea, [contenteditable='true']";

export function CustomCursor(): JSX.Element {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    document.documentElement.classList.add("use-custom-cursor");

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let shown = false;

    const setState = (state: "default" | "hover" | "label" | "text" | "hidden", text = "") => {
      ring.dataset.state = state;
      dot.dataset.state = state;
      label.textContent = text;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      if (!shown) {
        shown = true;
        rx = mx;
        ry = my;
        setState("default");
      }
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      const el = e.target as HTMLElement | null;
      const labelled = el?.closest<HTMLElement>("[data-cursor]");
      if (el?.closest(TEXT)) setState("text");
      else if (labelled) setState("label", labelled.dataset.cursor ?? "");
      else if (el?.closest(INTERACTIVE)) setState("hover");
      else setState("default");
    };

    const onLeave = () => {
      shown = false;
      setState("hidden");
    };
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");

    const tick = () => {
      const k = reduce.matches ? 1 : RING_LERP;
      rx += (mx - rx) * k;
      ry += (my - ry) * k;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    setState("hidden");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("use-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} aria-hidden className="cursor-dot" />
    </>
  );
}
