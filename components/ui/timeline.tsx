"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.getBoundingClientRect().height);
      }
    };
    updateHeight();
    const resizeObserver = new window.ResizeObserver(updateHeight);
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div ref={ref} className="relative max-w-6xl mx-auto pb-10 md:pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-6 md:pt-20 md:gap-10"
          >
            {/* Sticky left column: dot + title (desktop) */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-8 w-8 md:h-10 md:w-10 absolute left-3 md:left-3 rounded-full bg-gradient-to-br from-teal-500/25 to-violet-500/15 border border-teal-400/35 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-gradient-to-br from-teal-400 to-violet-400 border border-white/20 shadow-lg shadow-violet-500/25" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-violet-200 to-rose-200">
                {item.title}
              </h3>
            </div>

            {/* Right column: mobile title + content */}
            <div className="relative pl-16 md:pl-4 pr-2 md:pr-4 w-full">
              <h3 className="md:hidden block text-lg mb-3 text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-violet-200 to-rose-200">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Animated gradient line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-[1.7rem] top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-teal-500/25 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-teal-400 via-violet-500 to-transparent from-[0%] via-[10%] rounded-full shadow-lg shadow-teal-500/40"
          />
        </div>
      </div>
    </div>
  );
};
