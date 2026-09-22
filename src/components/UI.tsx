import { motion } from 'motion/react';
import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Project } from '../constants';
import { 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ArrowUpRight, 
  ShieldCheck, 
  Cpu, 
  Bot, 
  Building2, 
  Factory,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export { default as LightPillar } from './LightPillar';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    
    if (targetId === 'hero' || targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#hero');
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center p-3 sm:p-4 md:p-6 pointer-events-none"
    >
      {/* Desktop & Tablet Pill */}
      <div className="hidden md:flex glass px-6 lg:px-8 py-3 rounded-full items-center gap-6 lg:gap-8 shadow-2xl border border-white/15 backdrop-blur-2xl pointer-events-auto">
        <div className="flex items-center gap-5 lg:gap-6">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs sm:text-[13px] md:text-sm font-medium text-white/70 hover:text-white hover:text-[var(--color-brand-primary)] transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 border-l border-white/10 pl-4">
          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="relative group overflow-hidden bg-[var(--color-brand-primary)] text-black px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:scale-105 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
              Hire Me <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>

      {/* Mobile Compact Navbar Pill */}
      <div className="flex md:hidden w-[calc(100vw-24px)] max-w-[360px] glass px-4 py-2.5 rounded-full items-center justify-between shadow-2xl border border-white/15 backdrop-blur-2xl pointer-events-auto">
        <a 
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)] animate-pulse group-hover:scale-125 transition-transform" />
          <span className="font-mono text-xs font-bold tracking-wider text-white group-hover:text-[var(--color-brand-primary)] transition-colors">PORTFOLIO</span>
        </a>

        <div className="flex items-center gap-2">
          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-[var(--color-brand-primary)] text-black px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            Hire Me <ArrowUpRight className="w-3 h-3" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="md:hidden mt-2 w-[calc(100vw-24px)] max-w-[360px] rounded-2xl bg-[#0a0a0e]/95 border border-white/15 p-3 shadow-2xl backdrop-blur-2xl pointer-events-auto flex flex-col gap-1"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-white/80 hover:text-black hover:bg-[var(--color-brand-primary)] transition-all flex items-center justify-between cursor-pointer"
            >
              <span>{item.label}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

export function SectionHeading({ 
  title, 
  subtitle, 
  className,
  description 
}: { 
  title: string; 
  subtitle?: string; 
  className?: string; 
  description?: string; 
}) {
  return (
    <div className={cn("relative mb-10 md:mb-12 overflow-visible", className)}>
      {/* Dynamic Animated Ambient Background Aura for Headers */}
      <div className="absolute -top-10 -left-6 w-60 h-28 -z-10 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.28, 0.15],
            x: [0, 15, 0],
            y: [0, -8, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-full h-full rounded-full bg-gradient-to-r from-[var(--color-brand-primary)]/20 via-[var(--color-brand-secondary)]/15 to-[var(--color-brand-accent)]/20 blur-3xl"
        />
      </div>

      {/* Cyber Grid Mask Behind Header */}
      <div className="absolute -top-6 -left-4 w-72 h-24 bg-cyber-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] -z-10 pointer-events-none" />

      {/* Subtitle Badge with Animated Ping Dot */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-2.5"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-primary)] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-primary)]"></span>
        </span>
        <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-brand-primary)] font-semibold">
          {subtitle || "Section"}
        </span>
      </motion.div>

      {/* Main Animated Title with Glowing Underline */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight max-w-4xl"
      >
        {title}
      </motion.h2>

      {/* Optional Sub-description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-3 text-sm md:text-base text-white/55 max-w-3xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      {/* Animated Glowing Accent Beam */}
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "64px", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="h-1 mt-3 rounded-full bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-secondary)] to-transparent shadow-[0_0_10px_rgba(204,255,0,0.5)]"
      />
    </div>
  );
}

function getCategoryIcon(category: string) {
  switch (category) {
    case 'Cybersecurity':
      return ShieldCheck;
    case 'GenAI & Automation':
      return Bot;
    case 'Industrial IoT & SCADA':
      return Factory;
    case 'Enterprise ERP':
      return Building2;
    default:
      return Cpu;
  }
}

export function HeroConsole() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'ai-pipeline' | 'security'>('architecture');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative w-full max-w-full sm:max-w-xl mx-auto lg:max-w-none mt-8 lg:mt-0 min-w-0"
    >
      {/* Ambient Glow behind Console */}
      <div className="absolute -inset-1.5 rounded-[28px] bg-gradient-to-r from-[var(--color-brand-primary)]/20 via-[var(--color-brand-secondary)]/15 to-[var(--color-brand-accent)]/20 blur-2xl opacity-75 -z-10" />

      {/* Main Console Window */}
      <div className="relative rounded-2xl bg-[#0a0c12]/95 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-xl w-full max-w-full min-w-0">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.03] border-b border-white/5 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]/80 shrink-0" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]/80 shrink-0" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]/80 shrink-0" />
            <span className="ml-1 sm:ml-2 font-mono text-[10px] sm:text-[11px] text-white/40 hidden xs:inline truncate">
              vijayalaya@node: ~/fullstack-core
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-primary)]"></span>
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--color-brand-primary)] font-semibold whitespace-nowrap">
              Live Systems • Online
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center border-b border-white/5 bg-black/40 px-2 pt-2 gap-1 overflow-x-auto w-full min-w-0">
          <button
            onClick={() => setActiveTab('architecture')}
            className={cn(
              "px-2.5 sm:px-3 py-1.5 rounded-t-lg font-mono text-[11px] sm:text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0",
              activeTab === 'architecture'
                ? "bg-[#0a0c12] text-white border-t border-x border-white/10 font-medium text-[var(--color-brand-primary)]"
                : "text-white/40 hover:text-white/80"
            )}
          >
            SystemArchitecture.ts
          </button>
          <button
            onClick={() => setActiveTab('ai-pipeline')}
            className={cn(
              "px-2.5 sm:px-3 py-1.5 rounded-t-lg font-mono text-[11px] sm:text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0",
              activeTab === 'ai-pipeline'
                ? "bg-[#0a0c12] text-white border-t border-x border-white/10 font-medium text-cyan-300"
                : "text-white/40 hover:text-white/80"
            )}
          >
            AIAgentWorkflow.py
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={cn(
              "px-2.5 sm:px-3 py-1.5 rounded-t-lg font-mono text-[11px] sm:text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0",
              activeTab === 'security'
                ? "bg-[#0a0c12] text-white border-t border-x border-white/10 font-medium text-yellow-300"
                : "text-white/40 hover:text-white/80"
            )}
          >
            SecurityCompliance.json
          </button>
        </div>

        {/* Console Code View */}
        <div className="p-3.5 sm:p-5 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto min-h-[200px] w-full min-w-0">
          {activeTab === 'architecture' && (
            <div className="space-y-1">
              <p className="text-white/30">// Enterprise Telemetry & Distributed Nodes</p>
              <p className="text-purple-400">export const <span className="text-yellow-300">productionCore</span> = &#123;</p>
              <p className="pl-4 text-white/80">nodes: <span className="text-emerald-400">["ThreatVantage", "SCADA Bridge", "AI Agents"]</span>,</p>
              <p className="pl-4 text-white/80">protocols: <span className="text-cyan-300">["REST APIs", "Webhooks", "Siemens PLC", "DCS/QCS"]</span>,</p>
              <p className="pl-4 text-white/80">databases: <span className="text-emerald-400">["PostgreSQL", "MongoDB", "Oracle DB"]</span>,</p>
              <p className="pl-4 text-white/80">latency: <span className="text-[var(--color-brand-primary)]">"&lt; 14ms"</span>,</p>
              <p className="pl-4 text-white/80">deliveries: <span className="text-cyan-300">"5+ Full-Scale Enterprise Systems"</span>,</p>
              <p className="text-purple-400">&#125;;</p>
            </div>
          )}

          {activeTab === 'ai-pipeline' && (
            <div className="space-y-1">
              <p className="text-white/30"># Omnichannel AI Agent Ingestion Pipeline</p>
              <p className="text-purple-400">class <span className="text-yellow-300">HelpdeskAgent</span>:</p>
              <p className="pl-4 text-blue-300">channels = <span className="text-emerald-400">["Email", "WhatsApp", "MS Teams"]</span></p>
              <p className="pl-4 text-purple-400">async def <span className="text-yellow-300">triage_ticket</span>(payload):</p>
              <p className="pl-8 text-white/80">intent = <span className="text-cyan-300">await LLM.extract_intent</span>(payload.text)</p>
              <p className="pl-8 text-white/80">ticket = <span className="text-cyan-300">n8n.dispatch_workflow</span>(intent)</p>
              <p className="pl-8 text-emerald-400">return &#123;"status": "dispatched", "sla": "immediate"&#125;</p>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-1">
              <p className="text-white/30">// DPDP Regulatory Compliance & Security Triage</p>
              <p className="text-white/80">&#123;</p>
              <p className="pl-4 text-cyan-300">"vapt_scanner": <span className="text-emerald-400">"OpenVAS & OWASP ZAP Embedded"</span>,</p>
              <p className="pl-4 text-cyan-300">"dpdp_act_compliance": <span className="text-[var(--color-brand-primary)]">"Audited & Classified"</span>,</p>
              <p className="pl-4 text-cyan-300">"risk_scoring": <span className="text-yellow-300">"Multi-Factor ML Gap Analysis"</span>,</p>
              <p className="pl-4 text-cyan-300">"auth": <span className="text-emerald-400">"Role-Based Access Control (RBAC)"</span></p>
              <p className="text-white/80">&#125;</p>
            </div>
          )}
        </div>

        {/* Live Metrics Footer Bar */}
        <div className="grid grid-cols-3 border-t border-white/5 bg-black/60 px-3 sm:px-4 py-2.5 sm:py-3 text-center">
          <div>
            <div className="text-[10px] sm:text-[11px] font-mono text-white/40">Response</div>
            <div className="text-xs sm:text-sm font-bold text-[var(--color-brand-primary)]">&lt; 15ms</div>
          </div>
          <div className="border-x border-white/5">
            <div className="text-[10px] sm:text-[11px] font-mono text-white/40">Security</div>
            <div className="text-xs sm:text-sm font-bold text-emerald-400">Hardened</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-mono text-white/40">Delivery</div>
            <div className="text-xs sm:text-sm font-bold text-cyan-400">End-to-End</div>
          </div>
        </div>
      </div>

      {/* Floating Satellite Badges - only on lg screens */}
      <div className="hidden lg:flex absolute -top-4 -right-2 bg-black/90 backdrop-blur-md border border-[var(--color-brand-primary)]/40 px-3 py-1.5 rounded-full text-xs font-mono shadow-xl items-center gap-1.5 text-white">
        <span className="text-[var(--color-brand-primary)]">⚡</span> GenAI & n8n Workflows
      </div>
      <div className="hidden lg:flex absolute -bottom-4 -left-2 bg-black/90 backdrop-blur-md border border-cyan-400/40 px-3 py-1.5 rounded-full text-xs font-mono shadow-xl items-center gap-1.5 text-white">
        <span className="text-cyan-400">🏭</span> Siemens PLC & SCADA
      </div>
    </motion.div>
  );
}

export function ProjectCard({ 
  project, 
  index,
}: { 
  project: Project; 
  index: number; 
  totalCount?: number;
  key?: string | number;
}) {
  const CategoryIcon = getCategoryIcon(project.category);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl bg-gradient-to-b from-[#0f1424] via-[#0a0d18] to-[#070912] border border-white/12 hover:border-[var(--color-brand-primary)]/50 overflow-hidden transition-all duration-300 hover:shadow-[0_12px_45px_rgba(204,255,0,0.12)] hover:-translate-y-1"
    >
      {/* Hover corner glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[var(--color-brand-primary)]/15 via-transparent to-[var(--color-brand-secondary)]/15 -z-10 blur-md" />

      {/* Image Section */}
      <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d18] via-[#0a0d18]/50 to-transparent" />
        
        {/* Category badge — top-left overlay */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium shadow-md">
          <CategoryIcon className="w-3 h-3 text-[var(--color-brand-primary)]" />
          <span>{project.category}</span>
        </div>

        {/* Status badge — top-right */}
        {project.isActive ? (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-semibold shadow-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span>Active</span>
          </div>
        ) : (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white/70 text-[11px] font-mono shadow-md">
            <Calendar className="w-3 h-3 text-[var(--color-brand-secondary)]" />
            <span>{project.period}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Title & Role */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[var(--color-brand-primary)] transition-colors leading-snug tracking-tight">
          {project.title}
        </h3>
        <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/60 mb-3">
          <Briefcase className="w-3 h-3 text-[var(--color-brand-primary)]/80" />
          <span>{project.role}</span>
        </div>

        {/* Description */}
        <p className="text-[13px] text-white/65 mb-4 leading-relaxed line-clamp-2 font-light">
          {project.description}
        </p>

        {/* Expandable Highlights */}
        <div className="mb-4">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]/80 transition-colors cursor-pointer mb-2"
          >
            <Sparkles className="w-3 h-3" />
            <span>Key Contributions</span>
            <ChevronRight className={cn("w-3 h-3 transition-transform duration-300", expanded && "rotate-90")} />
          </button>
          
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="space-y-2 overflow-hidden pt-1"
            >
              {project.highlights.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] shadow-[0_0_6px_var(--color-brand-primary)] flex-shrink-0 mt-1.5" />
                  <p className="text-[12px] text-white/75 leading-relaxed font-normal">
                    {bullet}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Tech Stack — pushed to bottom */}
        <div className="mt-auto pt-3 border-t border-white/8 flex flex-wrap items-center gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span 
              key={tech} 
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-white/75 group-hover:border-[var(--color-brand-primary)]/30 group-hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="text-[11px] font-mono text-white/40">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ServiceCard({ service, index }: { service: any; index: number; key?: string | number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="relative p-8 rounded-3xl bg-gradient-to-br from-[#0e1424] via-[#0a0d18] to-[#070912] border border-white/10 hover:border-[var(--color-brand-secondary)]/50 hover:shadow-[0_12px_40px_rgba(0,240,255,0.12)] transition-all duration-300 group overflow-hidden hover:-translate-y-1"
    >
      {/* Subtle internal gradient aura on hover */}
      <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[var(--color-brand-secondary)]/15 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-brand-secondary)]/15 group-hover:border-[var(--color-brand-secondary)]/30 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-6 h-6 text-white/50 group-hover:text-[var(--color-brand-secondary)] transition-colors" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors">{service.title}</h3>
      <p className="text-sm text-white/60 leading-relaxed font-light">{service.description}</p>
    </motion.div>
  );
}

