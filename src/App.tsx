import { motion } from 'motion/react';
import React, { useState } from 'react';
import { 
  Navbar, 
  SectionHeading, 
  ProjectCard, 
  ServiceCard,
  HeroConsole,
  LightPillar
} from './components/UI';
import { cn } from './lib/utils';
import { 
  PERSONAL_INFO, 
  SERVICES, 
  SKILLS, 
  PROJECTS, 
  EXPERIENCE, 
  EDUCATION, 
  SOCIAL_LINKS, 
  TOOLS 
} from './constants';
import { ArrowRight, MapPin, Mail, Phone, Loader2, CheckCircle2, Sparkles } from 'lucide-react';

export default function App() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Cybersecurity',
    'GenAI & Automation',
    'Industrial IoT & SCADA',
    'Enterprise ERP',
    'Compliance & AI'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormState('idle'), 5000);
      } else {
        setFormState('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormState('error');
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-[var(--color-brand-primary)] selection:text-black overflow-x-hidden">
      {/* Dynamic Ambient Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Futuristic Cyber Grid with Vignette */}
        <div className="absolute inset-0 bg-cyber-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      </div>

      <Navbar />

      <main className="w-full pb-0 overflow-x-hidden">
        {/* HERO SECTION - Full-Width with Centered Content, Background Covers Navbar */}
        <section id="hero" className="relative w-full min-h-screen pt-28 sm:pt-36 pb-16 lg:py-28 overflow-hidden flex items-center">
          {/* Authentic React Bits Ethereal Light Pillar Background covering Header & Navbar */}
          <div 
            className="absolute w-screen h-[125%] -top-6 pointer-events-none -z-10 overflow-hidden"
            style={{ left: '50%', animation: 'pillarDiagonalSlide 14s ease-in-out infinite' }}
          >
            <LightPillar
              topColor="#5227FF"
              bottomColor="#FF9FFC"
              intensity={1.0}
              rotationSpeed={0.3}
              glowAmount={0.005}
              pillarWidth={3.0}
              pillarHeight={0.4}
              noiseIntensity={0.5}
              pillarRotation={0}
              interactive={false}
              quality="high"
              mixBlendMode="normal"
            />
            {/* Seamless gradient fade-out at bottom into About section */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[var(--background-dark)] via-[var(--background-dark)]/70 to-transparent pointer-events-none" />
          </div>

          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Headline, Bio & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Live Availability Badge with Animated Pulse */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-primary)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-brand-primary)]"></span>
                </span>
                <span className="font-mono text-xs md:text-sm text-[var(--color-brand-primary)] tracking-wider uppercase font-semibold">
                  Available for high-impact projects & engineering roles
                </span>
              </div>

              {/* Hero Main Header */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-[0.95] tracking-tighter">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[var(--color-brand-primary)]">
                  {PERSONAL_INFO.name.split(' ')[0]}
                </span>
                <br />
                <span className="text-white/30 text-3xl sm:text-5xl md:text-6xl block mt-2">
                  {PERSONAL_INFO.role}
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white/65 mb-8 leading-relaxed font-light">
                {PERSONAL_INFO.headline}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a 
                  href="#projects" 
                  className="group bg-[var(--color-brand-primary)] text-black px-7 py-3.5 rounded-full font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] hover:scale-105 transition-all duration-300 text-sm md:text-base"
                >
                  Explore Enterprise Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </a>
                <a 
                  href="#contact" 
                  className="px-7 py-3.5 rounded-full font-bold border border-white/15 bg-white/[0.03] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-sm md:text-base"
                >
                  Let's Connect
                </a>
              </div>

              {/* Quick Tech Highlights Badge Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/5 text-xs font-mono text-white/50 w-full">
                <span className="text-[var(--color-brand-primary)] font-semibold">Core Stack:</span>
                {['React.js', 'Python', 'PostgreSQL', 'Siemens PLC & SCADA', 'OWASP ZAP', 'GenAI Agents', 'n8n'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Interactive System Architecture & Engineering Console */}
            <div className="lg:col-span-5 w-full flex justify-center items-center">
              <HeroConsole />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION - Full Width with Edge-to-Edge Ambient Background */}
        <section id="about" className="relative w-full py-24 sm:py-32 border-t border-white/10 section-ambient-about overflow-hidden">
          {/* Top illuminated gradient accent line spanning full screen */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-accent)]/50 to-transparent" />

          {/* Full-width tech cyber grid overlay */}
          <div className="absolute inset-0 bg-cyber-grid opacity-15 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] pointer-events-none" />

          {/* Living ambient glowing elements with diagonal drift */}
          <div 
            className="absolute -top-16 -right-16 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[var(--color-brand-accent)]/20 via-[var(--color-brand-secondary)]/10 to-transparent blur-[120px] pointer-events-none" 
            style={{ animation: 'ambientDiagonalDrift 14s ease-in-out infinite' }} 
          />
          <div 
            className="absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[var(--color-brand-primary)]/15 via-[var(--color-brand-accent)]/10 to-transparent blur-[110px] pointer-events-none" 
            style={{ animation: 'ambientDiagonalDriftAlt 16s ease-in-out infinite' }} 
          />

          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SectionHeading 
              title="Passionate about building scalable, secure systems." 
              subtitle="About Me"
              className="mb-0"
              description="Bridging the gap between robust backend architecture, intuitive user interfaces, and enterprise industrial reliability."
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-base sm:text-lg text-white/60 leading-relaxed font-light"
            >
              <p>{PERSONAL_INFO.about}</p>
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-[var(--color-brand-primary)]/30 transition-all">
                  <div className="text-3xl sm:text-4xl font-black text-[var(--color-brand-primary)]">5+</div>
                  <div className="text-xs uppercase tracking-widest font-mono text-white/60 mt-1">Enterprise Platforms</div>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-[var(--color-brand-secondary)]/30 transition-all">
                  <div className="text-3xl sm:text-4xl font-black text-[var(--color-brand-secondary)]">End-to-End</div>
                  <div className="text-xs uppercase tracking-widest font-mono text-white/60 mt-1">System Delivery</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SERVICES SECTION - Full Width Edge-to-Edge */}
        <section id="services" className="relative w-full py-24 sm:py-32 border-t border-white/10 section-ambient-services overflow-hidden">
          {/* Top illuminated gradient accent line spanning full screen */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-secondary)]/50 to-transparent" />

          {/* Full-width tech dots pattern overlay */}
          <div className="absolute inset-0 bg-cyber-dots opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] pointer-events-none" />

          {/* Living ambient glowing elements with diagonal drift */}
          <div 
            className="absolute top-10 -left-20 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[var(--color-brand-secondary)]/18 via-[var(--color-brand-accent)]/10 to-transparent blur-[120px] pointer-events-none" 
            style={{ animation: 'ambientDiagonalDrift 15s ease-in-out infinite' }} 
          />
          <div 
            className="absolute -bottom-16 -right-16 w-[480px] h-[480px] rounded-full bg-gradient-to-tl from-[var(--color-brand-primary)]/14 via-[var(--color-brand-secondary)]/10 to-transparent blur-[110px] pointer-events-none" 
            style={{ animation: 'ambientDiagonalDriftAlt 13s ease-in-out infinite' }} 
          />

          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
            <SectionHeading 
              title="End-to-end solutions for mission-critical operations." 
              subtitle="Services & Capabilities" 
              description="From complex enterprise workflows to real-time industrial telemetry dashboards and autonomous AI agents."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, i) => (
                <ServiceCard key={service.title} service={service} index={i} />
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[#99cc00] text-black flex flex-col justify-center shadow-xl hover:shadow-[0_10px_40px_rgba(204,255,0,0.25)] transition-all"
              >
                <h3 className="text-2xl font-black mb-3 leading-tight">
                  Have a challenging project requirement?
                </h3>
                <p className="text-xs sm:text-sm font-medium text-black/80 mb-6 leading-relaxed">
                  I deliver complete solutions from architectural design and database modeling to deployment and security compliance.
                </p>
                <a href="#contact" className="inline-flex items-center gap-2 font-bold group text-black text-sm">
                  Start a discussion <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION - Full Width Edge-to-Edge */}
        <section id="skills" className="relative w-full py-24 sm:py-32 border-t border-white/10 section-ambient-skills overflow-hidden">
          {/* Top illuminated gradient accent line spanning full screen */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-accent)]/50 to-transparent" />

          {/* Full-width tech cyber grid overlay */}
          <div className="absolute inset-0 bg-cyber-grid opacity-15 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] pointer-events-none" />

          {/* Living ambient glowing elements */}
          <div 
            className="absolute -top-10 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[var(--color-brand-accent)]/20 via-[var(--color-brand-primary)]/10 to-transparent blur-[120px] pointer-events-none" 
            style={{ animation: 'ambientDiagonalDrift 14s ease-in-out infinite' }} 
          />
          <div 
            className="absolute bottom-10 -left-20 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[var(--color-brand-secondary)]/16 via-transparent to-transparent blur-[110px] pointer-events-none" 
            style={{ animation: 'ambientDiagonalDriftAlt 17s ease-in-out infinite' }} 
          />

          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
            <SectionHeading 
              title="Technical Arsenal & Tooling" 
              subtitle="Skills & Competencies" 
              description="Proven expertise across modern web frameworks, systems programming, cybersecurity tooling, and industrial automation protocols."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILLS.map((skillGroup, i) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#0f1424]/85 via-[#0a0d18]/90 to-[#070912]/95 border border-white/10 hover:border-[var(--color-brand-primary)]/40 backdrop-blur-xl transition-all duration-300 shadow-md hover:shadow-[0_10px_30px_rgba(204,255,0,0.08)] hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10">
                      <skillGroup.icon className="w-5 h-5 text-[var(--color-brand-primary)]" />
                    </div>
                    <h3 className="text-base font-bold text-white">{skillGroup.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((item) => (
                      <span key={item} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-white/75 hover:border-[var(--color-brand-primary)]/40 hover:text-white transition-all cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 pt-8 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">Development & Debugging Tools</h4>
              <div className="flex flex-wrap gap-3">
                {TOOLS.map((tool) => (
                  <span key={tool} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white/80 hover:border-[var(--color-brand-secondary)]/30 transition-colors">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION - Full Width Edge-to-Edge */}
        <section id="projects" className="relative w-full py-24 sm:py-32 border-t border-white/10 section-ambient-projects overflow-hidden">
          {/* Top illuminated gradient accent line spanning full screen */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-primary)]/50 to-transparent shadow-[0_0_15px_rgba(204,255,0,0.5)]" />

          {/* Full-width tech cyber grid overlay */}
          <div className="absolute inset-0 bg-cyber-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] pointer-events-none" />

          {/* Living ambient glowing elements with diagonal drift */}
          <div 
            className="absolute top-16 -left-28 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--color-brand-primary)]/16 via-[var(--color-brand-secondary)]/12 to-transparent blur-[130px] pointer-events-none" 
            style={{ animation: 'ambientDiagonalDrift 16s ease-in-out infinite' }} 
          />
          <div 
            className="absolute bottom-20 -right-24 w-[550px] h-[550px] rounded-full bg-gradient-to-tl from-[var(--color-brand-secondary)]/16 via-[var(--color-brand-accent)]/14 to-transparent blur-[130px] pointer-events-none" 
            style={{ animation: 'ambientDiagonalDriftAlt 15s ease-in-out infinite' }} 
          />

          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
            <SectionHeading 
              title="Featured Engineering Projects" 
              subtitle="Interactive Portfolio & Case Studies" 
              description="Real-world enterprise systems designed and implemented with measurable impact across security, compliance, industrial telemetry, and AI."
            />

            {/* Interactive Category Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 mb-8 p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              {categories.map((cat) => {
                const count = cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length;
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 cursor-pointer border",
                      isActive 
                        ? "bg-[var(--color-brand-primary)] text-black font-bold border-[var(--color-brand-primary)] shadow-[0_0_15px_rgba(204,255,0,0.3)] scale-105" 
                        : "bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.07] border-white/10"
                    )}
                  >
                    <span>{cat}</span>
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                      isActive ? "bg-black/20 text-black" : "bg-white/10 text-white/60"
                    )}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Responsive 2-Column Project Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map((project, i) => (
                <ProjectCard 
                  key={project.id || project.title} 
                  project={project} 
                  index={i} 
                />
              ))}
            </div>

            {/* Bottom Collaboration Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-white/[0.04] via-white/[0.06] to-white/[0.04] border border-white/15 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl shadow-xl mt-10"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-primary)]/10 border border-[var(--color-brand-primary)]/25 text-[var(--color-brand-primary)] text-xs font-mono font-medium mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Engineering & Consulting</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  Have a Mission-Critical System in Mind?
                </h3>
                <p className="text-xs sm:text-sm text-white/60 max-w-xl font-light">
                  Bridging modern full-stack web technologies, industrial SCADA telemetry, automated vulnerability triage, and autonomous GenAI agents.
                </p>
              </div>
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-full bg-[var(--color-brand-primary)] text-black font-bold text-xs sm:text-sm whitespace-nowrap flex items-center gap-2 hover:shadow-[0_0_25px_rgba(204,255,0,0.4)] hover:scale-105 transition-all"
              >
                Start a Conversation <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION - Full Width Edge-to-Edge */}
        <section id="experience" className="relative w-full py-24 sm:py-32 border-t border-white/10 section-ambient-experience overflow-hidden">
          {/* Top illuminated gradient accent line spanning full screen */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-accent)]/50 to-transparent" />

          {/* Full-width tech dots overlay */}
          <div className="absolute inset-0 bg-cyber-dots opacity-15 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] pointer-events-none" />

          {/* Living ambient glowing elements */}
          <div 
            className="absolute top-10 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[var(--color-brand-accent)]/18 via-[var(--color-brand-secondary)]/10 to-transparent blur-[120px] pointer-events-none" 
            style={{ animation: 'ambientDiagonalDrift 15s ease-in-out infinite' }} 
          />
          <div 
            className="absolute -bottom-16 -right-16 w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-[var(--color-brand-primary)]/14 via-transparent to-transparent blur-[110px] pointer-events-none" 
            style={{ animation: 'ambientDiagonalDriftAlt 17s ease-in-out infinite' }} 
          />

          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 grid md:grid-cols-2 gap-16 lg:gap-20">
            <div>
              <SectionHeading title="Experience" subtitle="Career" className="mb-12" />
              <div className="space-y-8">
                {EXPERIENCE.map((exp, i) => (
                  <motion.div 
                    key={exp.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-8 border-l border-white/15 p-4 rounded-r-2xl bg-white/[0.02] border-y border-r border-y-white/[0.03] border-r-white/[0.03] hover:border-white/15 hover:bg-white/[0.04] transition-all"
                  >
                    <div className="absolute left-[-5px] top-4 w-[9px] h-[9px] rounded-full bg-[var(--color-brand-primary)] shadow-[0_0_10px_var(--color-brand-primary)]" />
                    <span className="text-xs font-mono text-[var(--color-brand-primary)] mb-2 block font-semibold">{exp.period}</span>
                    <h3 className="text-xl font-bold mb-2 text-white">{exp.title}</h3>
                    <p className="text-white/60 leading-relaxed font-light text-sm">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading title="Education" subtitle="Learning" className="mb-12" />
              <div className="space-y-8">
                {EDUCATION.map((edu, i) => (
                  <motion.div 
                    key={edu.degree}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-8 border-l border-white/15 p-4 rounded-r-2xl bg-white/[0.02] border-y border-r border-y-white/[0.03] border-r-white/[0.03] hover:border-white/15 hover:bg-white/[0.04] transition-all"
                  >
                    <div className="absolute left-[-5px] top-4 w-[9px] h-[9px] rounded-full bg-[var(--color-brand-secondary)] shadow-[0_0_10px_var(--color-brand-secondary)]" />
                    <h3 className="text-xl font-bold mb-1 text-white">{edu.degree}</h3>
                    <div className="text-sm font-mono text-[var(--color-brand-secondary)] mb-2 font-medium">{edu.institution}</div>
                    <p className="text-white/60 leading-relaxed font-light text-sm">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION - Full Width Edge-to-Edge */}
        <section id="contact" className="relative w-full py-24 sm:py-32 border-t border-white/10 overflow-hidden">
          {/* Subtle surrounding ambient glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] rounded-full bg-gradient-to-r from-[var(--color-brand-primary)]/10 via-[var(--color-brand-secondary)]/10 to-[var(--color-brand-accent)]/10 blur-[140px] pointer-events-none" 
            style={{ animation: 'ambientBreath 10s ease-in-out infinite' }} 
          />

          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
            <div className="glass rounded-[40px] p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden relative border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-gradient-to-br from-[var(--color-brand-primary)]/15 to-[var(--color-brand-secondary)]/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
                <div>
                  <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 leading-tight">
                    Let's build <br />
                    something <span className="text-[var(--color-brand-primary)]">great</span>.
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-white/60">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span>{PERSONAL_INFO.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/60">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span>{PERSONAL_INFO.email}</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/60">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <Phone className="w-5 h-5" />
                      </div>
                      <span>{PERSONAL_INFO.phone}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-12">
                    {SOCIAL_LINKS.map((link) => (
                      <a 
                        key={link.name} 
                        href={link.url} 
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <link.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  {formState === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 rounded-full bg-[var(--color-brand-primary)]/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-[var(--color-brand-primary)]" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-white/50">Thank you for reaching out. I'll get back to you soon.</p>
                    </motion.div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-widest text-white/40">Name</label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors" 
                            placeholder="John Doe" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-widest text-white/40">Email</label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors" 
                            placeholder="john@example.com" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-white/40">Message</label>
                        <textarea 
                          rows={4} 
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors" 
                          placeholder="Tell me about your project..." 
                        />
                      </div>
                      <button 
                        disabled={formState === 'loading'}
                        className="w-full bg-[var(--color-brand-primary)] text-black font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {formState === 'loading' ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                      {formState === 'error' && (
                        <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 border-t border-white/10 text-center text-white/30 text-sm font-mono bg-black/60">
        © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with passion.
      </footer>
    </div>
  );
}
