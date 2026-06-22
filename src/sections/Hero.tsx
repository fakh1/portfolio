import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FluidBackground from '@/components/FluidBackground';

const techBadges = [
  'LangGraph', 'LangChain', 'RAG', 'AI Agents', 'LoRA',
  'FastAPI', 'Streamlit', 'FAISS', 'Docker',
];

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-photo', {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.8,
        delay: 0.15,
        ease: 'power2.out',
      });
  
      gsap.from('.hero-title', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
      });
      gsap.from('.hero-status', {
        opacity: 0,
        y: 15,
        duration: 0.6,
        delay: 1.0,
        ease: 'power2.out',
      });
      gsap.from('.hero-btn', {
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.1,
        delay: 1.2,
        ease: 'power2.out',
      });
      gsap.from('.hero-badge', {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        stagger: 0.05,
        delay: 1.6,
        ease: 'back.out(1.7)',
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', id);
    }
  };

  return (
    <section
      id="top"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-hero-bg"
    >
      <FluidBackground />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center pointer-events-none"
      >
        <div className="hero-photo mb-6 relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent via-fuchsia-500 to-cyan-400 opacity-70 blur-md" />
          <img
            src="/images/ahmed-profile.png"
            alt="Ahmed Fakhfakh"
            className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border border-white/20 shadow-2xl"
          />
        </div>

        <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-[96px] font-medium text-white leading-tight">
          AI Engineer
        </h1>

        <p className="hero-subtitle mt-2 text-base font-medium text-white/70 max-w-xl">
          LLMs, RAG Systems &amp; Agentic AI Pipelines
        </p>

        <p className="hero-desc mt-4 text-base font-medium text-white/50 max-w-[600px] leading-relaxed">
          I build production-ready AI systems: multi-agent workflows, RAG applications, memory-augmented AI, HITL pipelines, LoRA fine-tuning, and intelligent dashboards.
        </p>

        <div className="hero-status mt-6 flex items-center gap-2 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
          <span className="text-xs font-medium uppercase tracking-[1px] text-accent">
            Available for freelance AI projects
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, '#projects')}
            className="hero-btn px-6 py-2.5 rounded-full bg-accent text-white text-xs font-medium uppercase tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            View Projects
          </a>
          <a
            href="/Ahmed_Fakhfakh_CV.pdf"
            download
            className="hero-btn px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-medium uppercase tracking-wide border border-white/20 hover:bg-white/[0.15] transition-colors"
          >
            Download CV
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="hero-btn px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-medium uppercase tracking-wide border border-white/20 hover:bg-white/[0.15] transition-colors"
          >
            Contact Me
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {techBadges.map((badge) => (
            <span
              key={badge}
              className="hero-badge px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-white/70 text-xs font-medium"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
