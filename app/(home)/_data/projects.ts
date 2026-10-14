import {
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandMongodb,
  IconDatabase,
  IconBrandReact,
  IconBrandNodejs,
  IconApi,
  IconChartBar,
  IconBrandPrisma,
  IconBrandAws,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBraces,
} from "@tabler/icons-react";
import { SiRazorpay, SiShopify, SiSanity, SiCloudflare, SiPostgresql } from "react-icons/si";

export const FEATURED = ["ArtTech LMS", "SSF Global", "LibrarySetu"];

export const projects = [
  {
    title: "ArtTech LMS",
    description: "Online platform for course delivery, student management, and interactive learning.",
    image: "/ArtTechImage.png",
    url: "https://www.online.arttechbsp.com/",
    tech: [
      { label: "NextJS" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
      { label: "MongoDB" },
      { label: "Prisma" },
      { label: "Razorpay" },
      { label: "AWS S3" },
    ],
  },
  {
    title: "SSF Global",
    description: "Bilingual (EN/FR) website for a medical travel facilitator, with a Sanity-powered CMS, analytics and health dashboards, and secure enquiry forms.",
    image: "/ssf-global.png",
    url: "https://www.ssf-global.com",
    tech: [
      { label: "NextJS" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
      { label: "Sanity" },
      { label: "Cloudflare" },
    ],
  },
    {
    title: "Tuitionly",
    description: "Online tutoring site for IB, IGCSE, CBSE and AP students, with curriculum and pricing sections and free demo booking.",
    image: "/Tuitionly.png",
    url: "https://www.tuitionly.org/",
    tech: [
      { label: "HTML" },
      { label: "Tailwind CSS" },
      { label: "JavaScript" },
    ],
  },
  {
    title: "LibrarySetu",
    description: "Multi-tenant management software for study libraries in India, covering seat allocation, student records, fee tracking and due-payment follow-ups, with role-based dashboards and OTP sign-in.",
    image: "/LibrarySetu.png",
    url: "https://www.librarysetu.com/",
    tech: [
      { label: "NextJS" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
      { label: "PostgreSQL" },
      { label: "Neon" },
    ],
  },
  {
    title: "RecoBee Cinelytics",
    description: "Real-time analytics and feedback for optimizing movie releases and marketing.",
    image: "/RecoBee_Cinelytics.png",
    url: "https://www.recobee.ai/",
    tech: [
      { label: "ReactJS" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
    ],
  },
  {
    title: "Behavioral Training ERP System",
    description: "Integrated solution for appointment scheduling, insurance claim tracking, and staff payment management.",
    image: "/Promethean.png",
    url: "https://bts-gamma.vercel.app",
    tech: [
      { label: "NextJS" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
    ],
  },
  {
    title: "Brunswick Fur Food – Headless Shopify Storefront",
    description: "Headless e-commerce storefront built using Next.js and Shopify Storefront API.",
    image: "/BrunswickFurFood.png",
    url: "https://web.brunswickfurfood.com",
    tech: [
      { label: "NextJS" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
      { label: "MongoDB" },
      { label: "Shopify" },
    ],
  },
  {
    title: "Literature Lovers",
    description: "Admin-controlled platform for publishing eBooks/ePapers with form-gated user access to curated study materials.",
    image: "/literature_lovers.png",
    url: "https://www.web.literaturelovers.in/",
    tech: [
      { label: "NextJS" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
      { label: "Prisma" },
      { label: "MongoDB" },
    ],
  },
  {
    title: "The Scaioteal – Shopify Theme",
    description:
      "Custom Shopify Online Store 2.0 theme written in Liquid and Tailwind CSS, with its own sections, product, cart, blog and customer account templates.",
    image: "/the-scaioteal.jpg",
    url: "https://the-scaioteal.myshopify.com/",
    // Demo store sits behind Shopify's storefront password
    password: "aitray",
    tech: [{ label: "Shopify" }, { label: "Liquid" }, { label: "Tailwind CSS" }, { label: "JavaScript" }],
  },
] as const;

export const techIconMap = {
  NextJS: IconBrandNextjs,
  TypeScript: IconBrandTypescript,
  "Tailwind CSS": IconBrandTailwind,
  TailwindCSS: IconBrandTailwind,
  MongoDB: IconBrandMongodb,
  Prisma: IconBrandPrisma,
  ReactJS: IconBrandReact,
  NodeJS: IconBrandNodejs,
  Mongoose: IconDatabase,
  ChartJS: IconChartBar,
  "API Integration": IconApi,
  Razorpay: SiRazorpay,
  Shopify: SiShopify,
  "AWS S3": IconBrandAws,
  Sanity: SiSanity,
  Cloudflare: SiCloudflare,
  HTML: IconBrandHtml5,
  JavaScript: IconBrandJavascript,
  PostgreSQL: SiPostgresql,
  Neon: IconDatabase,
  Liquid: IconBraces,
};

export type Project = (typeof projects)[number];

export const featured = projects.filter((p) => FEATURED.includes(p.title));
export const others = projects.filter((p) => !FEATURED.includes(p.title));

export const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
