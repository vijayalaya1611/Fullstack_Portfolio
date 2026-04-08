import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { PERSONAL_INFO } from '../constants';

export function Navbar() {
  const navItems = ['About', 'Services', 'Skills', 'Projects', 'Contact'];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6"
    >
      <div className="glass px-8 py-3 rounded-full flex items-center gap-8">
        <span className="font-mono font-bold text-lg tracking-tighter">
          vtechub<span className="text-[var(--color-brand-primary)]">.</span>net
        </span>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <a 
          href="#contact"
          className="bg-[var(--color-brand-primary)] text-black px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}

export function SectionHeading({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) {
  return (
    <div className={cn("mb-12", className)}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-2"
      >
        <div className="h-[1px] w-8 bg-[var(--color-brand-primary)]" />
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-brand-primary)]">
          {subtitle || "Section"}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold"
      >
        {title}
      </motion.h2>
    </div>
  );
}

export function ProjectCard({ project, index }: { project: any; index: number; key?: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-[var(--surface-dark)] border border-white/5"
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-white/40">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-brand-primary)] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export function ServiceCard({ service, index }: { service: any; index: number; key?: string | number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="p-8 rounded-2xl bg-[var(--surface-dark)] border border-white/5 hover:border-[var(--color-brand-primary)]/30 transition-colors group"
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[var(--color-brand-primary)]/10 transition-colors">
        <Icon className="w-6 h-6 text-white/40 group-hover:text-[var(--color-brand-primary)] transition-colors" />
      </div>
      <h3 className="text-lg font-bold mb-3">{service.title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{service.description}</p>
    </motion.div>
  );
}
