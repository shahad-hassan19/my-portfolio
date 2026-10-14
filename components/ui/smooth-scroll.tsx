"use client";

import { useEffect } from "react";

/**
 * Lightweight inertia scrolling (Lenis-style) for mouse wheels and trackpads.
 * Wheel input moves a target position; the page eases toward it every frame.
 * Keyboard, scrollbar dragging and touch keep native behaviour, and in-page
 * `#anchor` links glide to their section. Disabled for touch-only devices and
 * reduced motion.
 */

const EASE = 0.1; // share of the remaining distance covered per frame (lower = silkier)
const WHEEL_MULTIPLIER = 1;
const NAV_OFFSET = 80; // keep anchored sections clear of the fixed navbar

function scrollableParent(el: Element | null): boolean {
  while (el && el !== document.body) {
    const style = getComputedStyle(el);
    const canScroll = /(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight;
    if (canScroll) return true;
    el = el.parentElement;
  }
  return false;
}

export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto"; // we animate it ourselves

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;
    let animating = false;

    const maxScroll = () => root.scrollHeight - window.innerHeight;

    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        animating = false;
      }
      window.scrollTo(0, current);
      if (animating) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!animating) {
        animating = true;
        current = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Let zoom gestures, horizontal swipes, open overlays and inner scroll areas behave natively
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (document.body.style.overflow === "hidden") return;
      if (scrollableParent(e.target as Element)) return;
      e.preventDefault();
      const delta = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      target = Math.max(0, Math.min(maxScroll(), target + delta * WHEEL_MULTIPLIER));
      start();
    };

    // Keyboard, scrollbar drags and programmatic jumps: follow the real position when we're idle
    const onScroll = () => {
      if (!animating) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el && id) return;
      e.preventDefault();
      target = el ? Math.max(0, Math.min(maxScroll(), el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET)) : 0;
      history.replaceState(null, "", id ? `#${id}` : window.location.pathname);
      start();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      root.style.scrollBehavior = prevBehavior;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
