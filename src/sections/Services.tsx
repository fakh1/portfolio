import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Workflow, Brain, Settings2, Users, LayoutDashboard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Database,
    title: 'RAG Applications',
    description: 'I build document Q&A systems, knowledge assistants, and retrieval pipelines using LangChain, FAISS, ChromaDB, and LLMs.',
  },
  {
    icon: Workflow,
    title: 'AI Agents & LangGraph',
    description: 'I design multi-step AI workflows with planning, retrieval, validation, reflection, and deterministic review.',
  },
  {
    icon: Brain,
    title: 'Memory-Augmented AI',
    description: 'I create AI systems that learn from human corrections, store reusable knowledge, and improve across future runs.',
  },
  {
    icon: Settings2,
    title: 'LLM Fine-Tuning & LoRA',
    description: 'I fine-tune transformer models using LoRA and PEFT for classification, sentiment analysis, and domain-specific NLP tasks.',
  },
  {
    icon: Users,
    title: 'Human-in-the-Loop AI',
    description: 'I build AI pipelines where users can review, correct, validate, and improve model outputs safely.',
  },
  {
    icon: LayoutDashboard,
    title: 'AI Dashboards & APIs',
    description: 'I develop AI applications using FastAPI, Streamlit, Docker, and modern deployment-ready architectures.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-heading', {
        scrollTrigger: {
          trigger: '.services-heading',
          start: 'top 85%',
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
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
      id="services"
      className="w-full py-20 px-6 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="services-heading text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium text-text-primary">
          Services
        </h2>

        <div className="services-grid mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-card group bg-[#f5f5f4] rounded-2xl p-8 min-h-[280px] flex flex-col hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[32px] font-medium text-text-primary leading-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-base font-medium text-text-secondary leading-relaxed flex-1">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
