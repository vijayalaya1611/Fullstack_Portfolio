import {
  Code2,
  Layout,
  Database,
  Cpu,
  ShieldCheck,
  Cloud,
  Smartphone,
  Globe,
  Zap,
  MessageSquare,
  CreditCard,
  Settings,
  Github,
  Linkedin,
  Mail,
  MapPin
} from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Vijayalaya M R",
  role: "Full Stack Developer",
  headline: "Building scalable systems, automation tools, and end-to-end digital solutions",
  about: "Passionate Full Stack Developer specializing in React.js and backend systems. Experienced in building real-world applications and business solutions. Freelance developer delivering complete end-to-end project solutions with a focus on scalability, performance, and secure application development.",
  location: "Chennai, India",
  email: "mrvijayalaya2002@gmail.com",
  phone: "+91 8248732972",
  github: "https://github.com/vijayalaya1611/Vijayalaya",
  linkedin: "https://www.linkedin.com/in/vijayalaya-m-r-379b442a1/",
};

export const SERVICES = [
  {
    title: "Full Website Development",
    description: "Complete frontend, backend, and database solutions tailored to your business.",
    icon: Globe,
  },
  {
    title: "Custom Web Applications",
    description: "Bespoke digital products designed to solve specific business challenges.",
    icon: Layout,
  },
  {
    title: "API Development & Integration",
    description: "Robust RESTful APIs and seamless third-party service connections.",
    icon: Code2,
  },
  {
    title: "Automation Solutions",
    description: "Workflow optimization, data processing, and system automation tools.",
    icon: Zap,
  },
  {
    title: "Payment Gateway Integration",
    description: "Secure Razorpay and international payment system implementations.",
    icon: CreditCard,
  },
  {
    title: "WhatsApp & Third-party APIs",
    description: "Meta WhatsApp API and custom communication tool integrations.",
    icon: MessageSquare,
  },
  {
    title: "Maintenance & Optimization",
    description: "Ongoing support, performance tuning, and security hardening.",
    icon: Settings,
  },
];

export const SKILLS = [
  {
    category: "Frontend",
    items: ["React.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5/CSS3", "Chakra UI"],
    icon: Layout,
  },
  {
    category: "Backend & Automation",
    items: ["Python", "Node.js", "REST APIs", "n8n", "Webhooks", "Microservices"],
    icon: Database,
  },
  {
    category: "AI & Intelligent Agents",
    items: ["LLM / GenAI Integration", "AI Agent Workflows", "ML Libraries", "NLP Parsing"],
    icon: Zap,
  },
  {
    category: "Databases & Storage",
    items: ["PostgreSQL", "MongoDB", "Oracle DB", "SQL", "Redis"],
    icon: Database,
  },
  {
    category: "Cybersecurity & Compliance",
    items: ["OpenVAS", "OWASP ZAP", "VAPT Triage", "DPDP Compliance", "Threat Monitoring"],
    icon: ShieldCheck,
  },
  {
    category: "Industrial IoT & Cloud",
    items: ["Siemens PLC", "DCS/QCS Integration", "AWS Amplify", "Firebase", "Docker"],
    icon: Cloud,
  },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  period: string;
  isActive?: boolean;
  techStack: string[];
  tags: string[];
  highlights: string[];
  description: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: "pentity-cybersecurity",
    title: "Pentity – Cybersecurity Platform",
    category: "Cybersecurity",
    role: "Full-Stack Developer",
    period: "Aug 2024 – Dec 2024",
    isActive: false,
    techStack: ["React.js", "Python", "MongoDB", "OpenVAS", "OWASP ZAP", "REST APIs"],
    tags: ["React.js", "Python", "MongoDB", "OpenVAS", "OWASP ZAP"],
    highlights: [
      "Built responsive frontend for 3 cybersecurity modules (ThreatVantage, VAPT, Domain Leak Monitoring) serving 50–100 enterprise users.",
      "Integrated REST APIs to surface live vulnerability scans, phishing simulations, and domain risk data, replacing manual security reporting.",
      "Embedded OpenVAS and OWASP ZAP outputs directly into application UI, enabling security teams to triage high/medium/low-risk findings without tool-switching.",
      "Improved usability scores and reduced user-reported issues through intuitive dashboard design and real-time threat visibility."
    ],
    description: "Enterprise cybersecurity platform unifying automated vulnerability scanning, phishing simulation metrics, and domain leak intelligence in a single real-time dashboard.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "dpdp-compliance",
    title: "DPDP Compliance & Risk Analysis Platform",
    category: "Compliance & AI",
    role: "Full-Stack Developer",
    period: "Jan 2025 – Apr 2025",
    isActive: false,
    techStack: ["React.js", "Python", "PostgreSQL", "REST APIs", "Machine Learning"],
    tags: ["React.js", "Python", "PostgreSQL", "REST APIs", "ML / AI"],
    highlights: [
      "Developed regulatory compliance platform evaluating adherence to India's DPDP Act with structured data classification and multi-factor risk scoring.",
      "Integrated AI-based gap analysis using ML libraries to generate actionable remediation recommendations, accelerating compliance team workflows.",
      "Implemented role-based access control and secure data handling to meet regulatory requirements."
    ],
    description: "Automated regulatory intelligence platform assessing organizational adherence to India's DPDP Act with algorithmic risk scoring and ML-assisted remediation planning.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "construction-mgmt",
    title: "Construction Site Management System",
    category: "Enterprise ERP",
    role: "System Architect & Full-Stack Developer",
    period: "Jun 2025 – Sep 2025",
    isActive: false,
    techStack: ["React.js", "Node.js", "PostgreSQL", "REST APIs", "Analytics"],
    tags: ["React.js", "Node.js", "PostgreSQL", "REST APIs", "ERP Workflows"],
    highlights: [
      "Architected full-scale multi-module platform managing HR workflows, inventory tracking, DLR/DPR reporting, and helpdesk operations for 20–100 employee construction firm.",
      "Implemented end-to-end approval workflows and real-time project tracking, consolidating 4 operational processes into a single integrated system.",
      "Reduced manual reporting overhead by automating daily/weekly reports and centralizing project data."
    ],
    description: "Comprehensive operational ERP streamlining site engineering, material procurement, Daily Labour/Progress Reports (DLR/DPR), and administrative approval pipelines.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "tnpl-production-dashboard",
    title: "TNPL Production Monitoring & Analytics Dashboard",
    category: "Industrial IoT & SCADA",
    role: "Full-Stack Developer",
    period: "Feb 2026 – Jun 2026",
    isActive: false,
    techStack: ["React.js", "Python", "PostgreSQL", "Oracle DB", "Siemens PLC", "DCS/QCS Integration"],
    tags: ["React.js", "Python", "PostgreSQL", "Oracle DB", "Siemens PLC", "DCS/QCS"],
    highlights: [
      "Built centralized production monitoring dashboard integrating DCS, QCS, Siemens, and Oracle data sources for paper manufacturing operations.",
      "Developed day-wise, shift-wise, monthly, and yearly analytics dashboards to track production KPIs, quality metrics, and operational performance.",
      "Implemented secure role-based authentication enabling controlled access to dashboards, reports, and manufacturing insights."
    ],
    description: "Industrial SCADA analytics and plant monitoring solution consolidating telemetry from Siemens PLCs, DCS/QCS quality control systems, and enterprise Oracle databases.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "ai-helpdesk-automation",
    title: "AI Helpdesk & Intelligent Ticket Automation",
    category: "GenAI & Automation",
    role: "Full-Stack & AI Developer",
    period: "Jul 2026 – Present",
    isActive: true,
    techStack: ["React.js", "Python", "LLM/AI", "REST APIs", "Webhooks", "n8n"],
    tags: ["React.js", "Python", "LLM / AI", "n8n", "Webhooks", "Omnichannel"],
    highlights: [
      "Developing an AI-powered helpdesk platform that automatically creates and categorizes support tickets from incoming requests across Email, WhatsApp, and Microsoft Teams.",
      "Built AI agents using LLM modules to understand user messages, extract relevant ticket information, and automatically generate structured tickets in the helpdesk portal.",
      "Integrated webhooks and API-based workflows to connect multiple communication channels with the ticketing system, reducing manual ticket creation and improving support workflow automation."
    ],
    description: "Omnichannel autonomous AI agent triage engine capturing incoming customer requests across WhatsApp, Email, and MS Teams to parse intent and dispatch structured tickets via n8n.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900",
  },
];

export const TOOLS = [
  "VS Code", "IntelliJ IDEA", "Android Studio", "Git & GitHub", "Postman", "Figma"
];

export const EXPERIENCE = [
  {
    title: "Full Stack Developer",
    period: "Present",
    description: "Currently working as a Full Stack Developer in a service-based IT company, building scalable applications and delivering high-quality software solutions.",
  },
  {
    title: "Freelance Full Stack Developer",
    period: "Ongoing",
    description: "Delivered multiple real-world projects, building scalable full stack applications from scratch and handling the complete project lifecycle.",
  },
];

export const EDUCATION = [
  {
    degree: "B.Tech - Information Technology",
    institution: "With Distinction",
    description: "Strong foundation in programming and system design.",
  },
];

export const SOCIAL_LINKS = [
  { name: "GitHub", icon: Github, url: PERSONAL_INFO.github },
  { name: "LinkedIn", icon: Linkedin, url: PERSONAL_INFO.linkedin },
  { name: "Email", icon: Mail, url: `mailto:${PERSONAL_INFO.email}` },
];
