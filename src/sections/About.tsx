import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '10+', label: 'AI Projects Delivered' },
  { value: '6+', label: 'Technologies Mastered' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-heading', {
        scrollTrigger: {
          trigger: '.about-heading',
          start: 'top 85%',
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 85%',
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        delay: 0.1,
        ease: 'power2.out',
      });

      gsap.from('.about-stat', {
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 85%',
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full py-20 px-6 bg-page-bg"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="about-heading text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium text-text-primary">
          About Me
        </h2>

        <p className="about-text mt-8 text-base font-medium text-text-primary max-w-[700px] leading-[1.7]">
          Ahmed Fakhfakh is an AI Engineer focused on building intelligent AI systems using LLMs, retrieval-augmented generation, agentic workflows, and memory-augmented architectures. His work includes LangGraph-based multi-agent systems, human-in-the-loop correction pipelines, RAG applications with evidence retrieval, LoRA fine-tuning, and production-ready AI dashboards using FastAPI and Streamlit.
        </p>

        <div className="about-stats mt-12 flex flex-wrap gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="about-stat">
              <div className="text-4xl md:text-5xl lg:text-[64px] font-medium text-accent">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
