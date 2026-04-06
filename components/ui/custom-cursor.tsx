"use client";

import { useEffect, useRef } from "react";

/**
 * DNA Helix cursor — double helix strands spiral behind the cursor
 * with connected rungs, themed in teal/violet.
 * Canvas-based for performance, zero React re-renders after mount.
 */

const CORE_LERP = 0.22;
const TRAIL_LENGTH = 55;
const TEAL: [number, number, number] = [45, 212, 191];
const VIOLET: [number, number, number] = [167, 139, 250];
const ROSE: [number, number, number] = [244, 114, 182];
const WHITE: [number, number, number] = [255, 255, 255];
const PALETTE = [TEAL, VIOLET, ROSE, [56, 189, 248] as [number, number, number], WHITE];

export function CustomCursor(): JSX.Element | null {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    document.documentElement.classList.add("use-custom-cursor");

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = -200, my = -200;
    let cxPos = -200, cyPos = -200;
    let onScreen = false;
    let hovering = false;
    let clicking = false;
    let raf = 0;
    let frame = 0;

    interface TrailPoint { x: number; y: number }
    const trail: TrailPoint[] = [];

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; r: number;
      color: [number, number, number]; decay: number;
    }
    const particles: Particle[] = [];

    const pick = () => PALETTE[Math.floor(Math.random() * PALETTE.length)];

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!onScreen) {
        onScreen = true;
        cxPos = mx; cyPos = my;;
      }
    };
    const leave = () => { onScreen = false; };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) { hovering = false; return; }
      hovering = !!el.closest(
        "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor-hover]"
      );
    };
    const down = () => {
      clicking = true;
      // Click burst
      for (let i = 0; i < 18; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 1.5 + Math.random() * 4;
        particles.push({
          x: cxPos, y: cyPos,
          vx: Math.cos(a) * s, vy: Math.sin(a) * s,
          life: 40, maxLife: 40,
          r: 1.5 + Math.random() * 2.5,
          color: pick(),
          decay: 0.94 + Math.random() * 0.04,
        });
      }
    };
    const up = () => { clicking = false; };

    function drawGlow(
      x: number, y: number, r: number,
      col: [number, number, number], alpha: number
    ) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${alpha})`);
      g.addColorStop(0.5, `rgba(${col[0]},${col[1]},${col[2]},${alpha * 0.3})`);
      g.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    function tick() {
      // Lerp core position
      cxPos += (mx - cxPos) * CORE_LERP;
      cyPos += (my - cyPos) * CORE_LERP;

      // Build trail
      trail.push({ x: cxPos, y: cyPos });
      if (trail.length > TRAIL_LENGTH) trail.shift();

      frame++;
      ctx.clearRect(0, 0, w, h);

      if (!onScreen) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const amp = hovering ? 16 : 10;
      const freq = 0.28;

      // --- Draw DNA helix ---
      for (let i = 0; i < trail.length; i++) {
        const t = i / trail.length; // 0 -> 1 (oldest -> newest)
        const p = trail[i];

        const off1 = Math.sin(frame * 0.04 + i * freq) * amp;
        const off2 = Math.sin(frame * 0.04 + i * freq + Math.PI) * amp;

        const nodeR = 1 + t * 2.5;
        const alpha = t * t; // quadratic fade-in

        // Strand 1 — teal
        drawGlow(p.x + off1, p.y, nodeR * 2.5, TEAL, alpha * 0.35);
        ctx.fillStyle = `rgba(45,212,191,${alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(p.x + off1, p.y, nodeR, 0, Math.PI * 2);
        ctx.fill();

        // Strand 2 — violet
        drawGlow(p.x + off2, p.y, nodeR * 2.5, VIOLET, alpha * 0.35);
        ctx.fillStyle = `rgba(167,139,250,${alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(p.x + off2, p.y, nodeR, 0, Math.PI * 2);
        ctx.fill();

        // Connecting rungs every 4th node
        if (i % 4 === 0 && t > 0.05) {
          const rungAlpha = alpha * 0.2;
          const gradient = ctx.createLinearGradient(
            p.x + off1, p.y, p.x + off2, p.y
          );
          gradient.addColorStop(0, `rgba(45,212,191,${rungAlpha})`);
          gradient.addColorStop(0.5, `rgba(255,255,255,${rungAlpha * 0.8})`);
          gradient.addColorStop(1, `rgba(167,139,250,${rungAlpha})`);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.8 + t;
          ctx.beginPath();
          ctx.moveTo(p.x + off1, p.y);
          ctx.lineTo(p.x + off2, p.y);
          ctx.stroke();
        }
      }

      // --- Draw burst particles ---
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.decay;
        p.vy *= p.decay;
        p.vy += 0.015;
        p.life--;
        if (p.life <= 0) { particles.splice(i, 1); continue; }

        const pt = p.life / p.maxLife;
        drawGlow(p.x, p.y, p.r * 3, p.color, pt * pt * 0.4);
        ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${pt * pt * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pt, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Core dot ---
      const coreR = hovering ? 22 : 6;
      drawGlow(cxPos, cyPos, coreR + 10, hovering ? TEAL : WHITE, hovering ? 0.2 : 0.5);
      drawGlow(cxPos, cyPos, coreR, WHITE, 0.85);

      // White center dot
      const dotR = hovering ? 2 : 3;
      const dotScale = clicking ? 0.6 : 1;
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.beginPath();
      ctx.arc(cxPos, cyPos, dotR * dotScale, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("resize", resize);
      document.documentElement.classList.remove("use-custom-cursor");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
