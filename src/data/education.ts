export interface EducationItem {
  id: number;
  degree: string;
  school: string;
  year: string;
  description: string;
  details?: string[];
  modules?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  idCode: string | null;
  description: string;
  talk?: string;
}

export const educationData: EducationItem[] = [
  {
    id: 1,
    degree: 'MSc Business Analytics',
    school: 'Keele University, UK',
    year: 'Graduated 2026',
    description: 'Distinction Graduate | Student of the Year. Recognized for outstanding academic performance and leadership.',
    details: [
      "Led a 5-person team as Scrum Master for a Highly Commended Consultancy Project.",
      "Designed an auditable ML pipeline for energy pricing, achieving an RMSE of 3.53 USD/MWh.",
      "Synthesized technical data science with strategic corporate functions."
    ],
    modules: [
      "Advanced Data Analytics & Machine Learning",
      "Business Intelligence & Data Visualisation",
      "Strategic Management",
      "AI Ethics & Governance"
    ]
  },
  {
    id: 2,
    degree: 'BSc Mathematics',
    school: 'Maharaja Ganga Singh University, India',
    year: 'Graduated 2023',
    description: 'Rigorous grounding in theoretical mathematics—including linear algebra, multivariable calculus, and probability theory.',
    details: [
      "Studied the mathematical architecture governing modern predictive modeling.",
      "Specialized in statistical analysis and numerical methods.",
      "Strong foundation in logical reasoning and abstract problem-solving."
    ]
  }
];

export const certifications: CertificationItem[] = [
  {
    id: 'google-cyber',
    title: 'Google Cybersecurity Specialisation',
    issuer: 'Google',
    date: 'Aug 2024',
    idCode: 'Q02IC9B2TW1F',
    description: 'A comprehensive program covering security foundations, risk management, network security, and incident response.',
    talk: 'This certification provided hands-on experience with Python for security, SQL for data retrieval, and using Linux to secure systems. It deepened my understanding of how data governance and cybersecurity overlap, specifically in the context of protecting sensitive business data from evolving threats.'
  },
  {
    id: 'michigan-python',
    title: 'Python for Everybody Specialisation',
    issuer: 'University of Michigan',
    date: 'Jun 2023',
    idCode: null,
    description: 'An in-depth introduction to Python programming, covering everything from basic syntax to specialized data applications.',
    talk: 'This was the starting point of my data journey. I learned how to use Python to access web data, interact with databases, and visualize data. It gave me the skills to build the early data-processing scripts that later became part of more complex ML pipelines during my MSc.'
  },
  {
    id: 'meta-frontend',
    title: 'Meta Front-End Developer Specialisation',
    issuer: 'Meta',
    date: 'Nov 2023',
    idCode: 'WBNUW8UK93XC',
    description: 'A professional-grade curriculum focused on React, UI/UX principles, and modern front-end engineering.',
    talk: 'Beyond just coding UI, this specialisation taught me how to think about the user experience. As a Business Analyst, this perspective is invaluable for designing dashboards and reports that are not only accurate but also intuitive and actionable for stakeholders.'
  }
];
