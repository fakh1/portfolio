import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'AI Engineer',
    company: 'KPIT Technologies',
    period: 'Feb 2026 – Jun 2026',
    description: 'Designed agentic LangGraph workflows for automotive test generation and built a 4-layer memory architecture with Core Memory, Episodic Memory, HITL feedback, and FAISS vector memory.',
  },
  {
    role: 'AI/ML Engineer Intern',
    company: 'VisShop AI',
    period: 'Jun 2024 – Aug 2024',
    description: 'Built real-time people counting using YOLOv8 and DeepSORT with optimized video analytics performance.',
  },
  {
    role: 'Software Development Intern',
    company: 'HABEMUS',
    period: 'Jun 2023 – Jul 2023',
    description: 'Built a leave management system using C# and SQL Server.',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.experience-heading', {
        scrollTrigger: {
          trigger: '.experience-heading',
          start: 'top 85%',
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from('.timeline-entry', {
        scrollTrigger: {
          trigger: '.timeline',
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
      id="experience"
      className="w-full py-20 px-6 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="experience-heading text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium text-text-primary">
          Experience
        </h2>

        <div className="timeline mt-12 relative pl-6 md:pl-8">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray" />

          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="timeline-entry relative pb-12 last:pb-0"
            >
              {/* Dot */}
              <div className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-accent border-[3px] border-white shadow-[0_0_0_2px_#c4189c]" />

              <div className="ml-6 md:ml-8">
                <h3 className="text-xl sm:text-2xl lg:text-[32px] font-medium text-text-primary leading-tight">
                  {exp.role}
                </h3>
                <p className="mt-1 text-base font-medium text-accent">
                  {exp.company}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-text-secondary">
                  {exp.period}
                </p>
                <p className="mt-3 text-base font-medium text-text-secondary max-w-[600px] leading-[1.7]">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
