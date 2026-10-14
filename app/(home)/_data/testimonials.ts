// `highlight` must appear verbatim in `quote`; it is rendered in the accent colour.
export const TESTIMONIALS = [
  {
    quote:
      "Shahad demonstrates strong frontend engineering skills, combining React.js, Next.js, TypeScript, and Tailwind CSS to build responsive, production-ready web applications. His experience extends beyond UI development to integrating REST APIs and GraphQL, implementing authentication and role-based access control, and delivering complex features involving payment gateways, video streaming, and headless CMS platforms. His attention to usability, component reusability, and code quality makes him a strong contributor to modern web development teams.",
    highlight: "responsive, production-ready web applications",
    name: "Shakti Singh",
    designation: "Consulting Specialist - UX/UI",
    src: "https://res.cloudinary.com/shahad-hassan/image/upload/v1735023882/Mentors/fcpt8tjjm7r3ityrocd5.jpg",
  },
  {
    quote:
      "Shahad has a rare ability to turn business requirements into complete, reliable products. He handles everything from the interface to the backend, including secure payment gateway integrations, role-based admin dashboards and headless CMS-managed content that clients can update on their own. He communicates clearly with non-technical stakeholders, delivers consistently on time across multiple product cycles, and always thinks about how each feature creates real value for the business and the people using it.",
    highlight: "turn business requirements into complete, reliable products",
    name: "Tanmay Sharma",
    designation: "Saas Sales Professional",
    src: "https://res.cloudinary.com/shahad-hassan/image/upload/v1735023894/Mentors/mw7oicjmqckypcgarwky.jpg",
  },
  {
    quote:
      "Shahad bridges design and engineering better than most developers I know. He translates designs into pixel-perfect, responsive interfaces with smooth, thoughtful interactions, and he consistently respects every detail of spacing, typography and visual hierarchy. As he has grown into full stack development with Next.js, TypeScript, Node.js and MongoDB, that same attention to detail now carries through to clean, secure APIs, well-structured, schema-driven data models and fast, polished user experiences from end to end.",
    highlight: "bridges design and engineering",
    name: "Manish Gurjar",
    designation: "Senior UI/UX Designer | Product Design Expert",
    src: "https://res.cloudinary.com/shahad-hassan/image/upload/v1735023906/Mentors/kbwmhcvjrntqo3yrdhdh.png",
  },
];


export type Testimonial = (typeof TESTIMONIALS)[number];
