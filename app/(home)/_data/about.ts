import { MapPin, Briefcase } from "lucide-react";

export const FACTS = [
  { Icon: MapPin, label: "Based in", value: "Shamli, U.P., India" },
  { Icon: Briefcase, label: "Currently", value: "Full Stack Developer @ SoftLes" },
];

// Counted stats animate up to `to`; the degree tile shows `text` as is
export const HIGHLIGHTS: { label: string; to?: number; suffix?: string; text?: string }[] = [
  { to: 2, suffix: "+", label: "years experience" },
  { to: 10, suffix: "+", label: "projects shipped" },
  { to: 20, suffix: "+", label: "technologies" },
  { text: "B.Tech", label: "computer science" },
];

export const EDUCATION = [
  { title: "Bachelor of Technology, CSE", meta: "Vidya College of Engineering · AKTU", date: "2020 – 2024" },
  { title: "Intermediate", meta: "D.S. Public School · CBSE", date: "2019 – 2020" },
  { title: "High School", meta: "D.S. Public School · CBSE", date: "2017 – 2018" },
];

export const CERTIFICATES = [
  {
    title: "Career Essentials in Software Development",
    meta: "Microsoft & LinkedIn",
    date: "Sep 2024",
    url: "https://www.linkedin.com/learning/certificates/87ac7bcb9bf1983da1dfeac9750aea03a2c62f818221e4db979e1cc687eb0a83",
  },
  {
    title: "Shopify Theme Development: OS 2.0 + Tailwind",
    meta: "Udemy",
    date: "Apr 2025",
    url: "https://ude.my/UC-3f27538a-3e28-4c32-83b1-8392c494bf1c",
  },
  {
    title: "Career Edge: Young Professional",
    meta: "TCS iON",
    date: "Aug 2023",
    url: "https://drive.google.com/file/d/1sZWe5N-8kmy3e1hfylFiE5quAMG8oPaj/view?usp=drivesdk",
  },
];

export const BIO = {
  intro:
    "A Full Stack Developer at SoftLes who builds production web applications from the first screen to the last API call. I started on the front end in 2023, crafting responsive interfaces with React and Next.js, and grew into owning products end to end: the UI, RESTful APIs, authentication and the database behind them.",
  work: "Day to day I work with Next.js, TypeScript, Node.js and MongoDB, design schema-driven data models with Prisma and Mongoose, and wire in the services real products need, from payment gateways and headless CMS to cloud media storage and secure webhooks. I've delivered features across multiple product cycles in remote, agile teams, with code reviews and testing built into every release.",
  values: "I care about secure, well-tested code, interfaces that feel fast and smooth, and shipping software that makes a real difference for the people using it.",
};
