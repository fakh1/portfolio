import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MessageCircle, Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  {
    label: 'Email',
    href: 'mailto:fakhfakhahmed26@gmail.com',
    icon: Mail,
    variant: 'primary' as const,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/21626211105',
    icon: MessageCircle,
    variant: 'secondary' as const,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/fakh1',
    icon: Github,
    variant: 'secondary' as const,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ahmed-fakhfakh-bb2754291',
    icon: Linkedin,
    variant: 'secondary' as const,
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        scrollTrigger: {
          trigger: '.contact-heading',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from('.contact-desc', {
        scrollTrigger: {
          trigger: '.contact-desc',
          start: 'top 85%',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.1,
        ease: 'power2.out',
      });

      gsap.from('.contact-btn', {
        scrollTrigger: {
          trigger: '.contact-buttons',
          start: 'top 85%',
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full py-28 md:py-32 px-6 bg-hero-bg"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="contact-heading text-4xl sm:text-5xl md:text-6xl lg:text-[96px] font-medium text-white leading-tight">
          Let's Build Your Next AI System
        </h2>

        <p className="contact-desc mt-6 text-base font-medium text-white/60 max-w-[600px] mx-auto leading-relaxed">
          Need a RAG chatbot, AI agent, document automation system, fine-tuned NLP model, or human-in-the-loop AI workflow? I can help you design, build, and deploy it.
        </p>

        <div className="contact-buttons mt-12 flex flex-wrap items-center justify-center gap-4">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            const isPrimary = contact.variant === 'primary';
            return (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`contact-btn inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-medium uppercase tracking-[1px] transition-colors ${
                  isPrimary
                    ? 'bg-accent text-white hover:bg-accent/90'
                    : 'bg-white/[0.08] text-white border border-white/[0.15] hover:bg-white/[0.12] hover:border-white/25'
                }`}
              >
                <Icon size={16} />
                {contact.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
