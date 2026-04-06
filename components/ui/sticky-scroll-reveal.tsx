"use client";

import React, { useRef } from "react";
import { useScroll, useMotionValueEvent, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScrollReveal = ({
  stickyContent,
  scrollContent,
  className,
  stickyClassName,
  scrollClassName,
}: {
  stickyContent: React.ReactNode;
  scrollContent: {
    title: string;
    content: React.ReactNode;
  }[];
  className?: string;
  stickyClassName?: string;
  scrollClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = scrollContent.map((_, i) => i / scrollContent.length);
    const closest = breakpoints.reduce((acc, bp, i) => {
      return Math.abs(latest - bp) < Math.abs(latest - breakpoints[acc])
        ? i
        : acc;
    }, 0);
    setActiveCard(closest);
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[36rem] overflow-y-auto hide-scrollbar",
        className
      )}
    >
      {/* Left: sticky content */}
      <div
        className={cn(
          "sticky top-0 hidden lg:flex w-1/2 flex-shrink-0 items-center justify-center p-6",
          stickyClassName
        )}
      >
        {stickyContent}
      </div>

      {/* Right: scrolling content */}
      <div className={cn("w-full lg:w-1/2 p-6 md:p-8", scrollClassName)}>
        {scrollContent.map((item, index) => (
          <div key={item.title + index} className="mb-40 last:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: activeCard === index ? 1 : 0.35,
                y: 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {item.content}
            </motion.div>
          </div>
        ))}
        {/* Bottom spacer so last item can scroll to active position */}
        <div className="h-48" />
      </div>
    </div>
  );
};
