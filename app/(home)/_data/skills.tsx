import { LayoutTemplate, Rocket, Server } from "lucide-react";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap, SiSass,
  SiNodedotjs, SiMongoose, SiExpress, SiMongodb, SiPrisma, SiFirebase, SiVercel, SiDocker, SiGit, SiGithub, SiGitlab,
  SiFigma, SiPostman, SiNetlify, SiShopify, SiRazorpay,
  SiNestjs
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export interface SkillItem {
  name: string;
  icon: JSX.Element;
  color: string;
}

export const CATEGORIES: { title: string; color: string; glowColor: string; skills: SkillItem[] }[] = [
  {
    title: "Frontend",
    color: "from-amber-400 to-yellow-400",
    glowColor: "rgba(245,158,11,0.4)",
    skills: [
      { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
      { name: "React", icon: <SiReact />, color: "#61dafb" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178c6" },
      { name: "JavaScript", icon: <SiJavascript />, color: "#f7df1e" },
      { name: "Shopify", icon: <SiShopify />, color: "#96bf48" },
      { name: "HTML5", icon: <SiHtml5 />, color: "#e34c26" },
      { name: "CSS3", icon: <SiCss3 />, color: "#1572b6" },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "#38bdf8" },
      { name: "Bootstrap", icon: <SiBootstrap />, color: "#7952b3" },
      { name: "Sass", icon: <SiSass />, color: "#cc6699" },
    ],
  },
  {
    title: "Backend",
    color: "from-orange-400 to-orange-400",
    glowColor: "rgba(251,146,60,0.4)",
    skills: [
      { name: "NestJS", icon: <SiNestjs />, color: "#e0234e" },
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
      { name: "Express", icon: <SiExpress />, color: "#ffffff" },
      { name: "Mongoose", icon: <SiMongoose />, color: "#880000" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47a248" },
      { name: "Prisma", icon: <SiPrisma />, color: "#5a67d8" },
      { name: "Firebase", icon: <SiFirebase />, color: "#ffca28" },
    ],
  },
  {
    title: "Tools & Cloud",
    color: "from-yellow-400 to-amber-400",
    glowColor: "rgba(253,224,71,0.4)",
    skills: [
      { name: "Figma", icon: <SiFigma />, color: "#f24e1e" },
      { name: "VS Code", icon: <VscVscode />, color: "#007acc" },
      { name: "Postman", icon: <SiPostman />, color: "#ff6c37" },
      { name: "Docker", icon: <SiDocker />, color: "#2496ed" },
      { name: "Git", icon: <SiGit />, color: "#f05032" },
      { name: "GitHub", icon: <SiGithub />, color: "#ffffff" },
      { name: "GitLab", icon: <SiGitlab />, color: "#fc6d26" },
      { name: "Vercel", icon: <SiVercel />, color: "#ffffff" },
      { name: "Netlify", icon: <SiNetlify />, color: "#00C7B7" },
      { name: "Razorpay", icon: <SiRazorpay />, color: "#3395FF" },
    ],
  },
];

export const SERVICES = [
  {
    Icon: LayoutTemplate,
    title: "Frontend",
    text: "Responsive, accessible interfaces in React & Next.js that feel fast and look sharp.",
  },
  {
    Icon: Server,
    title: "Backend",
    text: "REST APIs, auth, role-based access and databases with Node, NestJS, Prisma & SQL.",
  },
  {
    Icon: Rocket,
    title: "Ship & Scale",
    text: "Payments, CMS, cloud storage and deployment, from first commit to production.",
  },
];

export const ALL_SKILLS = CATEGORIES.flatMap((cat) => cat.skills.map((skill) => ({ ...skill, category: cat.title })));
