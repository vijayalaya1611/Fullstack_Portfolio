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
  github: "https://github.com/vijayalaya1611",
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
    items: ["React.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Bootstrap", "Chakra UI"],
    icon: Layout,
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "REST API Development"],
    icon: Database,
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "SQL"],
    icon: Database,
  },
  {
    category: "Integrations",
    items: ["Razorpay API", "Meta WhatsApp API", "Third-party APIs"],
    icon: Cpu,
  },
  {
    category: "Security",
    items: ["OpenVAS", "OWASP ZAP"],
    icon: ShieldCheck,
  },
  {
    category: "Cloud",
    items: ["AWS Amplify", "Firebase"],
    icon: Cloud,
  },
];

export const PROJECTS = [
  {
    title: "Domain Intelligence & Security Platform",
    description: "Built a web application to analyze domain and security insights. Integrated APIs for threat detection and domain analysis.",
    tags: ["React", "Chakra UI", "Security APIs", "Data Visualization"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "DPDP Compliance & Risk Analysis",
    description: "Developed a platform to evaluate organizations under DPDP regulations. Implemented AI-based risk and gap analysis.",
    tags: ["React", "AI Integration", "Compliance", "Risk Analysis"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Retail Store Management App",
    description: "Mobile app for managing retail operations. Integrated WhatsApp ordering and Razorpay payment gateway.",
    tags: ["React Expo", "Meta API", "Razorpay", "Mobile"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Construction Site Management",
    description: "Full system to manage construction operations including HR, Inventory, MRN workflow, and DPR/DLR tracking.",
    tags: ["Full Stack", "Analytics", "Workflow", "Management"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200",
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
