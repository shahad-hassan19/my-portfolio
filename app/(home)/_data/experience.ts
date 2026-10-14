export const ROLES = [
  {
    version: "v3.0",
    period: "Feb 2025 – Present",
    role: "Full Stack Developer",
    company: "SoftLes",
    companyUrl: "https://softles.in",
    isCurrent: true,
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Prisma", "AWS S3", "Vitest"],
    highlights: [
      "Build scalable full-stack web apps with Next.js, TypeScript, Node.js and MongoDB, including RESTful APIs, RBAC and JWT-based authentication.",
      "Integrate third-party services like Razorpay and PhonePe payments, Shopify Storefront GraphQL API, Sanity CMS, Mux, AWS S3 and Clerk, with HMAC-verified webhooks.",
      "Design schema-driven data models with Prisma and Mongoose, protect forms with Zod validation and rate limiting, and ship Vitest/Playwright-tested builds to Vercel.",
    ],
  },
  {
    version: "v2.0",
    period: "Feb 2024 – Feb 2025",
    role: "Front End Developer",
    company: "SoftLes",
    companyUrl: "https://softles.in",
    isCurrent: false,
    tags: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    highlights: [
      "Developed and optimized user-facing web applications with React.js, improving their performance, scalability and usability for everyday users.",
      "Owned end-to-end delivery of production features across multiple product cycles, enhancing both the customer experience and internal team workflows.",
      "Collaborated in agile teams through code reviews, testing and iterative development to keep codebases maintainable, reliable and of high quality.",
    ],
  },
  {
    version: "v1.0",
    period: "Aug 2023 – Feb 2024",
    role: "Front End Developer Intern",
    company: "SoftLes",
    companyUrl: "https://softles.in",
    isCurrent: false,
    tags: ["React.js", "HTML5", "CSS3"],
    highlights: [
      "Built practical proficiency in React.js through structured hands-on training, guided coding exercises and practical assignments during the internship.",
      "Developed a solid foundation in responsive layouts and cross-browser compatibility, building interfaces that work smoothly on every screen size.",
      "Took part in regular learning sessions on modern development methodologies, team workflows and the tools used in day-to-day engineering.",
    ],
  },
];

export type Role = (typeof ROLES)[number];
