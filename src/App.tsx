import { motion } from 'motion/react';
import React, { useState } from 'react';
import { 
  Navbar, 
  SectionHeading, 
  ProjectCard, 
  ServiceCard 
} from './components/UI';
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
import { ArrowRight, MapPin, Mail, Phone, Loader2, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
    <div className="relative min-h-screen selection:bg-[var(--color-brand-primary)] selection:text-black">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.03),transparent_50%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-brand-accent)]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-brand-secondary)]/10 blur-[120px] rounded-full" />
      </div>

      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center items-start py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[var(--color-brand-primary)] text-sm tracking-widest uppercase mb-4 block">
              Available for new projects
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter">
              Hi, I'm {PERSONAL_INFO.name.split(' ')[0]} <br />
              <span className="text-white/20">{PERSONAL_INFO.role}</span>
            </h1>
            <p className="max-w-2xl text-xl md:text-2xl text-white/60 mb-10 leading-relaxed">
              {PERSONAL_INFO.headline}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="group bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[var(--color-brand-primary)] transition-colors"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 rounded-full font-bold border border-white/10 hover:bg-white/5 transition-colors"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-32 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <SectionHeading 
              title="Passionate about building scalable systems." 
              subtitle="About Me"
              className="mb-0"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg text-white/50 leading-relaxed"
            >
              <p>{PERSONAL_INFO.about}</p>
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-white">5+</div>
                  <div className="text-xs uppercase tracking-widest font-mono">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">End-to-End</div>
                  <div className="text-xs uppercase tracking-widest font-mono">Solutions</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-32 border-t border-white/5">
          <SectionHeading 
            title="End-to-end solutions for your business." 
            subtitle="Services" 
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[var(--color-brand-primary)] text-black flex flex-col justify-center"
            >
              <h3 className="text-2xl font-black mb-4 leading-tight">
                I provide complete end-to-end project delivery — from idea to deployment.
              </h3>
              <a href="#contact" className="flex items-center gap-2 font-bold group">
                Start a project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-32 border-t border-white/5">
          <SectionHeading 
            title="Technical Arsenal" 
            subtitle="Skills" 
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {SKILLS.map((skillGroup, i) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-white/5">
                    <skillGroup.icon className="w-5 h-5 text-[var(--color-brand-primary)]" />
                  </div>
                  <h3 className="text-lg font-bold">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <span key={item} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-sm text-white/60 hover:border-[var(--color-brand-primary)]/30 hover:text-white transition-all cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-white/5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-6">Tools & Technologies</h4>
            <div className="flex flex-wrap gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {TOOLS.map((tool) => (
                <span key={tool} className="text-sm font-medium">{tool}</span>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-32 border-t border-white/5">
          <SectionHeading 
            title="Featured Projects" 
            subtitle="Portfolio" 
          />
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION */}
        <section className="py-32 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <SectionHeading title="Experience" subtitle="Career" className="mb-12" />
              <div className="space-y-12">
                {EXPERIENCE.map((exp, i) => (
                  <motion.div 
                    key={exp.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-8 border-l border-white/10"
                  >
                    <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-[var(--color-brand-primary)]" />
                    <span className="text-xs font-mono text-[var(--color-brand-primary)] mb-2 block">{exp.period}</span>
                    <h3 className="text-xl font-bold mb-3">{exp.title}</h3>
                    <p className="text-white/50 leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading title="Education" subtitle="Learning" className="mb-12" />
              <div className="space-y-12">
                {EDUCATION.map((edu, i) => (
                  <motion.div 
                    key={edu.degree}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-8 border-l border-white/10"
                  >
                    <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-[var(--color-brand-secondary)]" />
                    <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                    <div className="text-sm font-medium text-white/40 mb-3">{edu.institution}</div>
                    <p className="text-white/50 leading-relaxed">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 border-t border-white/5">
          <div className="glass rounded-[40px] p-12 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-brand-primary)]/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid lg:grid-cols-2 gap-20 relative z-10">
              <div>
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
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
        </section>
      </main>

      <footer className="py-10 border-t border-white/5 text-center text-white/20 text-sm font-mono">
        © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with passion.
      </footer>
    </div>
  );
}

