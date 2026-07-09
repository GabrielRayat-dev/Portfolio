export interface EducationEntry {
  degree: string;
  school: string;
  years: string;
}

export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  details: string[];
}

export interface Project {
  id: string;
  filename: string;
  title: string;
  tagline: string;
  description: string;
  problemSolution: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
}

export interface PortfolioData {
  about: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    bio: string;
    education: EducationEntry[];
  };
  experience: ExperienceEntry[];
  projects: Project[];
  skills: {
    frontend: string[];
    backend: string[];
    ai: string[];
    tools: string[];
  };
  contact: {
    email: string;
    github: string;
    status: string;
  };
}

export const portfolioData: PortfolioData = {
  about: {
    name: "Jan Gabriel V. Rayat",
    title: "CS student / aspiring web developer",
    tagline: "Jan Gabriel V. Rayat",
    location: "Los Baños, Laguna, Philippines",
    bio: "I am a 3rd-year BS Computer Science student at Colegio de Los Baños, currently focused on building robust and modern web applications. Passionate about software engineering, frontend technologies, and creating interactive user experiences.",
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "Colegio de Los Baños",
        years: "2024–present",
      },
      {
        degree: "High School Diploma",
        school: "Science and Technology School of Los Baños",
        years: "2011–2015",
      },
    ],
  },
  experience: [
    {
      title: "Game Support Representative",
      company: "Qroad Philippines Inc.",
      period: "2021–2024",
      details: [
        "Communicated with players to understand their needs and demands",
        "Answered customer support tickets, emails, and user reviews professionally and promptly",
        "Collected, investigated, processed, and documented data on in-game issues and bugs",
      ],
    },
    {
      title: "Production Operator",
      company: "DENSO Philippines Corporation",
      period: "2019–2021",
      details: [
        "Assembled and tested automotive electronic components on the production line",
        "Operated and monitored automated machines and testing equipment",
        "Performed quality inspection and recorded data using computer systems",
        "Followed strict safety and quality standards in a fast-paced environment",
      ],
    },
    {
      title: "CISCO Networking Academy",
      company: "Online training",
      period: "Jan 17, 2025",
      details: [
        "Trained in designing, developing, debugging, executing, and refactoring simple Python 3 programs",
      ],
    },
  ],
  projects: [
    {
      id: "project-one",
      filename: "progresso.tsx",
      title: "Progresso",
      tagline: "A student-first project and task management web app for tracking team progress, assigning tasks, and keeping everyone accountable — without the group chat chaos.",
      description: "A full-stack team collaboration platform built for student groups to manage projects, assign tasks, and track progress through a clean dashboard.",
      problemSolution: "Student teams struggle to track who is doing what, what is done, and what is blocked — all coordination happens in messy group chats. Progresso solves this with a clean dashboard where every task has a status, activity log, and comment thread so the whole team stays aligned without a single follow-up message.",
      tech: ["Node.js", "Express", "Supabase", "PostgreSQL", "JWT", "React", "Chart.js", "Vercel", "Render"],
      demoUrl: "https://github.com/GabrielRayat-dev",
      githubUrl: "https://github.com/GabrielRayat-dev",
    },
    {
      id: "project-two",
      filename: "stellars-dental.ts",
      title: "Stellars Dental Clinic",
      tagline: "A backend system for managing clinic appointments, patient records, staff accounts, and audit logging.",
      description: "A structured REST API backend for a dental clinic handling appointments, patient diagnosis records with image uploads, role-based staff access, and a full audit trail of all clinic actions.",
      problemSolution: "Managing a dental clinic manually leads to disorganized patient records, untracked staff actions, and insecure account management. This backend system replaces that with a structured REST API handling appointments, patient diagnosis records with image uploads, role-based staff access, and a full audit trail of all clinic actions.",
      tech: ["Node.js", "Express", "Supabase", "PostgreSQL", "Supabase Auth", "Supabase Storage", "Brevo"],
      demoUrl: "https://github.com/GabrielRayat-dev",
      githubUrl: "https://github.com/GabrielRayat-dev",
    },
  ],
  skills: {
    frontend: ["HTML", "Tailwind CSS", "Vite", "JavaScript"],
    backend: ["Java", "Python", "Express", "MySQL", "PostgreSQL", "Supabase"],
    ai: ["Claude", "Gemini", "Codex"],
    tools: ["Git", "GitHub", "Canva", "Antigravity", "Figma", "VS Code"],
  },
  contact: {
    email: "gabrielrayatofficial@gmail.com",
    github: "github.com/GabrielRayat-dev",
    status: "Open to internships and collaborative coding projects.",
  },
};

