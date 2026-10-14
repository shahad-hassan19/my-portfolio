"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide dot grid. A slow diagonal wave rolls across the dots, dots near
 * the cursor light up and lean away from it, and clicks send a ripple ring
 * through the grid. Pauses when the tab is hidden; static under reduced motion.
 */

const GAP = 28;
const MOUSE_RADIUS = 160;
const COLOR = "245,158,11"; // amber-500

interface Ripple {
  x: number;
  y: number;
  t: number;
}

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    const mouse = { x: -9999, y: -9999 };
    const ripples: Ripple[] = [];
    let raf = 0;
    let time = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 1;
      rows = Math.ceil(h / GAP) + 1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const ox = (w % GAP) / 2;
      const oy = (h % GAP) / 2;

      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].t += 6;
        if (ripples[i].t > Math.max(w, h)) ripples.splice(i, 1);
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let x = ox + c * GAP;
          let y = oy + r * GAP;

          // Rolling diagonal wave
          const wave = reduce ? 0 : (Math.sin(c * 0.22 + r * 0.16 - time * 0.035) + 1) / 2;
          let alpha = 0.1 + wave * 0.16;
          let size = 0.9 + wave * 0.7;

          // Cursor glow + push
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS) {
            const f = 1 - dist / MOUSE_RADIUS;
            const ease = f * f;
            alpha += ease * 0.75;
            size += ease * 2;
            if (dist > 0.5) {
              x += (dx / dist) * ease * 8;
              y += (dy / dist) * ease * 8;
            }
          }

          // Click ripples
          for (const rp of ripples) {
            const band = Math.abs(Math.hypot(x - rp.x, y - rp.y) - rp.t);
            if (band < 30) {
              const fade = 1 - rp.t / Math.max(w, h);
              const f = (1 - band / 30) * fade;
              alpha += f * 0.6;
              size += f * 1.6;
            }
          }

          ctx.fillStyle = `rgba(${COLOR},${Math.min(alpha, 1)})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = () => {
      time++;
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce) draw();
      else if (!document.hidden) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (reduce) draw();
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      if (reduce) return;
      ripples.push({ x: e.clientX, y: e.clientY, t: 0 });
      if (ripples.length > 4) ripples.shift();
    };
    const onResize = () => {
      resize();
      start();
    };

    resize();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", start);
    start();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="fixed inset-0 z-0 pointer-events-none" />;
}
