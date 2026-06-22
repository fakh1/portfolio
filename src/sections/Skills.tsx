import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'C#'],
  },
  {
    title: 'LLMs & Agentic AI',
    skills: ['LangChain', 'LangGraph', 'CrewAI', 'GPT-3.5/4', 'OpenAI API', 'RAG', 'Prompt Engineering', 'AI Agents'],
  },
  {
    title: 'Fine-Tuning & NLP',
    skills: ['Transformers', 'DistilBERT', 'LoRA', 'PEFT', 'Hugging Face', 'Sentiment Analysis'],
  },
  {
    title: 'RAG & Search',
    skills: ['FAISS', 'ChromaDB', 'Vector Databases', 'Retrieval Pipelines', 'Document Q&A', 'Evidence Retrieval'],
  },
  {
    title: 'Machine Learning',
    skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Keras'],
  },
  {
    title: 'Backend & MLOps',
    skills: ['FastAPI', 'Docker', 'Flask', 'Streamlit', 'Git', 'GitHub'],
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'Neo4j', 'PostgreSQL', 'ElasticSearch'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-heading', {
        scrollTrigger: {
          trigger: '.skills-heading',
          start: 'top 85%',
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="w-full py-20 px-6 bg-page-bg"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="skills-heading text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium text-text-primary">
          Skills &amp; Technologies
        </h2>

        <div className="skills-grid mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="skill-card bg-white rounded-2xl p-6"
            >
              <h3 className="text-xl sm:text-2xl lg:text-[32px] font-medium text-accent leading-tight mb-4">
                {cat.title}
              </h3>
              <div className="flex flex-col gap-2">
                {cat.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-base font-medium text-text-primary">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
