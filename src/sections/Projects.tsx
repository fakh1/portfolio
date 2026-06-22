import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Play, Image, FileText, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  metrics: { value: string; label: string }[];
  tech: string[];
  github?: string;
  demo?: string;
  screenshots?: string[];
  caseStudy?: string;
  buttons: { label: string; type: 'github' | 'demo' | 'screenshots' | 'casestudy' }[];
}

const projects: Project[] = [
  {
    title: 'Memory-Augmented Multi-Agent System for Test Generation',
    category: 'Agentic AI',
    description: 'An agentic LangGraph workflow that transforms automotive scenarios into validated Python and Robot Framework test cases.',
    problem: 'Manual automotive test case creation is slow, repetitive, and error-prone.',
    solution: 'Multi-agent LangGraph workflow with deterministic review, dry-run validation, and 4-layer memory architecture.',
    metrics: [
      { value: '0.942', label: 'Avg Quality' },
      { value: '78%', label: 'Time Reduction' },
      { value: '210', label: 'Test Runs' },
    ],
    tech: ['LangGraph', 'LangChain', 'Python', 'Robot Framework', 'FAISS', 'HITL'],
    demo: '/videos/memory-agent-demo.mp4',
    buttons: [
    ],
  },
  {
    title: 'Aspect-Based Sentiment Analysis with LoRA',
    category: 'NLP / Fine-Tuning',
    description: 'A fine-tuned DistilBERT model using LoRA adapters for aspect-based sentiment analysis on restaurant reviews.',
    problem: 'Classic sentiment analysis gives only a general result, but businesses need aspect-specific insights.',
    solution: 'Fine-tuned DistilBERT with LoRA/PEFT on 5,000 reviews with interactive Streamlit dashboard.',
    metrics: [
      { value: '91%', label: 'F1 Score' },
      { value: '67% → 91%', label: 'Improvement' },
      { value: '5K', label: 'Reviews' },
    ],
    tech: ['DistilBERT', 'LoRA', 'PEFT', 'PyTorch', 'Streamlit', 'FastAPI'],
    github: 'https://github.com/fakh1/ABSA-Sentiment-Analysis',
    screenshots: [
      '/screenshots/absa/1760884271598.jpg',
      '/screenshots/absa/1760884269492.jpg',
      '/screenshots/absa/1760884268470.jpg',
      '/screenshots/absa/1760884267226.jpg',
      '/screenshots/absa/1760884266605.jpg',
      '/screenshots/absa/1760884266065.jpg',
      '/screenshots/absa/1760884266024.jpg',
      '/screenshots/absa/1760884262038.jpg',
      '/screenshots/absa/1760884261539.jpg',
    ],
    buttons: [
      { label: 'View GitHub', type: 'github' },
    ],
  },
  {
    title: 'Finance RAG Agent with Human-in-the-Loop',
    category: 'RAG / Finance AI',
    description: 'A finance-focused RAG agent that answers questions from financial documents using page-level evidence and persistent memory.',
    problem: 'Financial document analysis requires accurate answers, source evidence, and correction mechanisms.',
    solution: 'RAG agent with GPT-4o-mini, page-level evidence, HITL correction loop, and JSONL persistent memory.',
    metrics: [
      { value: 'Page', label: 'Evidence' },
      { value: 'HITL', label: 'Correction Loop' },
      { value: 'Persistent', label: 'Memory' },
    ],
    tech: ['GPT-4o-mini', 'LangChain', 'RAG', 'FAISS', 'JSONL', 'HITL'],
    screenshots: [
      '/screenshots/finance-rag/chat-interface.png',
      '/screenshots/finance-rag/analytics-dashboard.png',
    ],
    buttons: [
    ],
  },
  {
    title: 'RAG: Intelligent Document Q&A System',
    category: 'RAG / Document AI',
    description: 'A multi-document Q&A system using RAG with LangChain, GPT-3.5, FAISS, and ChromaDB.',
    problem: 'Manual document search is slow and inefficient across multiple PDF files.',
    solution: 'Multi-document RAG pipeline with chunked embeddings, dual vector stores, and Dockerized FastAPI.',
    metrics: [
      { value: '85%', label: 'Retrieval Acc.' },
      { value: '90%', label: 'Relevance' },
      { value: 'Dockerized', label: 'Deployment' },
    ],
    tech: ['LangChain', 'GPT-3.5', 'FAISS', 'ChromaDB', 'FastAPI', 'Docker'],
    github: 'https://github.com/fakh1/RAG-PDF-QA',
    screenshots: [
      '/screenshots/rag-qa/webapp-search.png',
    ],
    buttons: [
      { label: 'View GitHub', type: 'github' },
    ],
  },
  {
    title: 'Real-Time People Counting with YOLOv8 + DeepSORT',
    category: 'Computer Vision',
    description: 'Real-time people counting system using YOLOv8 and DeepSORT tracking for retail foot traffic analysis — 95% accuracy at 30 FPS.',
    problem: 'Retail stores lack accurate, real-time data on customer foot traffic, entry/exit patterns, and peak hours.',
    solution: 'YOLOv8 detection combined with DeepSORT multi-object tracking, optimized from 150ms to 33ms/frame latency.',
    metrics: [
      { value: '95%', label: 'Accuracy' },
      { value: '30 FPS', label: 'Real-Time' },
      { value: '33ms', label: 'Latency' },
    ],
    tech: ['YOLOv8', 'DeepSORT', 'Python', 'OpenCV', 'PyTorch', 'CUDA'],
    github: 'https://github.com/fakh1/VisioTrack-YOLOv8',
    demo: '/videos/yolov8.mp4',
    buttons: [
      { label: 'View GitHub', type: 'github' },
    ],
  },
];

function getButtonIcon(type: string) {
  switch (type) {
    case 'github': return <Github size={14} />;
    case 'demo': return <Play size={14} />;
    case 'screenshots': return <Image size={14} />;
    case 'casestudy': return <FileText size={14} />;
    default: return <ExternalLink size={14} />;
  }
}

// ─── Inline Screenshot Carousel ───────────────────────────────────────────────
function ScreenshotCarousel({ images, fullHeight = false }: { images: string[]; fullHeight?: boolean }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const containerClass = fullHeight
    ? 'absolute inset-0 w-full h-full bg-black/30 overflow-hidden group'
    : 'relative w-full aspect-video bg-black/30 overflow-hidden group';

  return (
    <>
      <div className={containerClass}>
        {/* Main image */}
        <img
          src={images[current]}
          alt={`Screenshot ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover cursor-zoom-in transition-opacity duration-300"
          onClick={() => setLightbox(current)}
        />

        {/* Label */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded bg-black/50 text-white/70 text-xs font-medium pointer-events-none">
          Screenshots
        </span>

        {/* Counter */}
        <span className="absolute top-4 right-4 px-3 py-1 rounded bg-black/50 text-white/70 text-xs font-medium pointer-events-none">
          {current + 1} / {images.length}
        </span>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Next screenshot"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === current ? 'bg-white w-4' : 'bg-white/40'
                }`}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => ((l ?? 0) - 1 + images.length) % images.length); }}
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>

          <img
            src={images[lightbox]}
            alt={`Screenshot ${lightbox + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => ((l ?? 0) + 1) % images.length); }}
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>

          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightbox + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}

// ─── Video Panel with codec error detection ───────────────────────────────────
function VideoPanel({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);

  return (
    <div className="lg:w-[55%] self-stretch bg-black flex flex-col" style={{ minHeight: '360px' }}>
      {error ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8" style={{ minHeight: '360px' }}>
          <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center">
            <Play size={24} className="text-red-400 ml-1" />
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm font-medium mb-1">Video codec not supported</p>
            <p className="text-white/40 text-xs mb-4">Re-encode with: <code className="text-accent">ffmpeg -i yolov8.mp4 -vcodec libx264 -acodec aac yolov8_fixed.mp4</code></p>
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="w-full block"
          style={{ minHeight: '360px', flex: 1, objectFit: 'cover' }}
          controls
          preload="metadata"
          playsInline
          onError={() => setError(true)}
        >
          <source src={src} type="video/mp4" />
          <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        </video>
      )}
    </div>
  );
}

// ─── Media Panel ──────────────────────────────────────────────────────────────
// Project with demo        → video only, fills full left panel height
// Project with screenshots → carousel fills full left panel height
// No media                 → placeholder
function MediaPanel({ project }: { project: Project }) {
  const hasVideo = !!project.demo;
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  // Video only — stretches to fill full card height
  if (hasVideo) {
    return (
      <VideoPanel src={project.demo} />
    );
  }

  // Screenshots only — carousel stretches to fill full card height
  if (hasScreenshots) {
    return (
      <div className="lg:w-[55%] self-stretch flex flex-col">
        <div className="relative flex-1 min-h-[260px]">
          <ScreenshotCarousel images={project.screenshots!} fullHeight />
        </div>
      </div>
    );
  }

  // No media → placeholder
  return (
    <div className="lg:w-[55%] self-stretch relative min-h-[260px] bg-white/[0.03] overflow-hidden flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
        <Play size={28} className="text-accent ml-1" />
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.projects-section',
        start: 'top 60%',
        onEnter: () => { overlayRef.current?.classList.add('is-animating'); },
        onLeaveBack: () => { overlayRef.current?.classList.remove('is-animating'); },
      });

      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.projects-list',
          start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section w-full py-20 px-6 bg-hero-bg"
    >
      <div className="max-w-6xl mx-auto">
        <div className="projects-heading relative">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[96px] font-medium text-white leading-tight">
            Featured Projects
          </h2>
        </div>

        <div className="projects-list mt-16 flex flex-col gap-12">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="project-card w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-stretch">

                {/* ← Panneau média intelligent */}
                <MediaPanel project={project} />

                {/* Content */}
                <div className="lg:w-[45%] p-6 md:p-8 flex flex-col">
                  <span className="self-start px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-medium">
                    {project.category}
                  </span>

                  <h3 className="mt-4 text-2xl sm:text-3xl lg:text-[40px] font-medium text-white leading-tight">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-base font-medium text-white/60 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-medium uppercase text-accent tracking-wide">Problem</span>
                      <p className="mt-1 text-sm font-medium text-white/50 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-medium uppercase text-accent tracking-wide">Solution</span>
                      <p className="mt-1 text-sm font-medium text-white/50 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="px-4 py-2.5 rounded-lg bg-accent/10 border border-accent/20"
                      >
                        <div className="text-base font-medium text-accent">{m.value}</div>
                        <div className="text-xs font-medium text-white/50">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/60 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex flex-wrap gap-3">
                    {project.buttons.map((btn) => (
                      <a
                        key={btn.label}
                        href={
                          btn.type === 'github'
                            ? project.github || '#'
                            : btn.type === 'demo'
                            ? project.demo || '#'
                            : btn.type === 'casestudy'
                            ? project.caseStudy || '#'
                            : '#'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-white text-xs font-medium uppercase tracking-wide hover:bg-accent/90 transition-colors"
                      >
                        {getButtonIcon(btn.type)}
                        {btn.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}