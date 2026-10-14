import {
  SiNextdotjs, SiReact, SiTypescript, SiNodedotjs, SiNestjs, SiTailwindcss, SiPrisma,
  SiPostgresql, SiMongodb, SiDocker, SiGit, SiShopify, SiFirebase, SiVercel, SiSanity,
} from "react-icons/si";
import { cn } from "@/lib/utils";

const ITEMS = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "NestJS", Icon: SiNestjs },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Prisma", Icon: SiPrisma },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Docker", Icon: SiDocker },
  { name: "Git", Icon: SiGit },
  { name: "Shopify", Icon: SiShopify },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Sanity", Icon: SiSanity },
  { name: "Vercel", Icon: SiVercel },
];

/** Infinite, edge-faded strip of the stack. Pauses on hover. */
export function TechMarquee({ className, reverse = false }: { className?: string; reverse?: boolean }) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className={cn(
            "flex shrink-0 items-center gap-10 pr-10 animate-marquee group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {ITEMS.map(({ name, Icon }) => (
            <li
              key={name}
              className="flex items-center gap-2.5 text-white/35 hover:text-white transition-colors duration-300 whitespace-nowrap"
            >
              <Icon className="text-xl" />
              <span className="font-mono text-sm">{name}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
