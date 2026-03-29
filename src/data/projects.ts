export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  tab: 'experience' | 'personal';
  description: string;
  details?: string[];
  links?: { label: string; url: string }[];
  tags?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AI & Analytics Strategist",
    category: 'Stratifae (London)',
    year: '2025-Present',
    image: '/placeholder-hero.png',
    tab: 'experience',
    description: "Early contributor to a newly founded analytics consultancy, defining internal processes and analytical frameworks.",
    details: [
      "Defining analytical service offerings and scoping potential client use cases.",
      "Developing predictive modelling and data processing frameworks for client delivery.",
      "Contributing to early-stage business planning and go-to-market strategy.",
    ],
    tags: ["Strategy", "Analytics", "Business Planning", "ML Pipelines"]
  },
  {
    id: 2,
    title: "Association Secretary & Head of Service",
    category: 'Keele Postgrad Assoc. (UK)',
    year: '2025-2026',
    image: '/placeholder-work-2.png',
    tab: 'experience',
    description: "Elected officer for the UK's only postgraduate-specific student union, managing governance and digital services.",
    details: [
      "Ran all Association elections end-to-end, increasing digital participation by 40%.",
      "Represented postgraduate students at institutional level governance meetings.",
      "Led student-facing communications, driving a 45% increase in participation.",
      "Redesigned the KPA website, improving accessibility and engagement by 30%.",
    ],
    tags: ["Governance", "Leadership", "Digital Strategy", "Stakeholder Engagement"]
  },
  {
    id: 3,
    title: "AI Ethics & Data Governance Consultant",
    category: 'OpenPlan / Mondrem (UK)',
    year: '2025',
    image: '/placeholder-work-1.png',
    tab: 'experience',
    description: "Consultancy placement evaluating SaaS platform compliance against UK/EU regulatory frameworks.",
    details: [
      "Delivered GDPR compliance checklists and cybersecurity policy drafts.",
      "Created a prototype self-assessment web app for AI ethics governance.",
      "Developed a taxonomy-driven AI ethics framework for algorithmic transparency.",
      "Produced a 12-month AI Toolkit Roadmap for actionable compliance guidance.",
    ],
    tags: ["AI Ethics", "Data Governance", "Compliance", "GDPR", "SaaS"]
  },
  {
    id: 4,
    title: "Global Tech Community Educator",
    category: 'Pooja Dutt Tech (Remote)',
    year: '2022-2025',
    image: '/placeholder-work-3.png',
    tab: 'experience',
    description: "Lead educator and community manager for a 15k+ member global tech community.",
    details: [
      "Delivered bi-weekly live teaching sessions on tech and coding topics.",
      "Co-created educational material, instructional videos, and promotional content.",
      "Managed the end-to-end migration of the community to a new platform.",
    ],
    tags: ["Education", "Community Management", "Mentorship", "Platform Migration"]
  },
  {
    id: 5,
    title: "Dropbox Cloud Architecture Clone",
    category: 'TS / React',
    year: '2023',
    image: '/placeholder-hero.png',
    tab: 'personal',
    description: "A functional cloud storage clone exploring architecture, security, and state management.",
    details: [
      "Implemented secure file upload and synchronization logic.",
      "Built a responsive UI for multi-device management.",
      "Simulated cloud-based storage and sharing features.",
    ],
    tags: ["TypeScript", "React", "Cloud Storage", "Security"]
  },
  {
    id: 6,
    title: "Netflix High-Concurrency Simulator",
    category: 'Full-Stack',
    year: '2023',
    image: '/placeholder-work-1.png',
    tab: 'personal',
    description: "Exploring streaming architecture and high-velocity data handling.",
    details: [
      "Designed data pipelines for simulated real-time user activity.",
      "Implemented high-concurrency logic to handle thousands of requests.",
      "Built a dashboard to visualize streaming metrics.",
    ],
    tags: ["Full-Stack", "High Concurrency", "Architecture"]
  },
  {
    id: 7,
    title: "Real-Time WebSocket Chat Network",
    category: 'Sockets / Typescript',
    year: '2023',
    image: '/placeholder-work-2.png',
    tab: 'personal',
    description: "A secure, real-time messaging platform using WebSockets.",
    details: [
      "Implemented low-latency socket communication for multi-user chat.",
      "Built message encryption and identity verification features.",
      "Designed a lightweight, responsive chat interface.",
    ],
    tags: ["WebSockets", "TypeScript", "Real-time", "Encryption"]
  }
];
