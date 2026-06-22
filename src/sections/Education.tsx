import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    institution: "National School of Electronics & Telecommunications, ENET'COM",
    degree: 'B.Eng. in Data Engineering & Decision Systems',
    period: '2023–2026',
  },
  {
    institution: 'Faculty of Sciences of Sfax',
    degree: 'Pre-Engineering in Mathematics & Physics',
    period: '2021–2023',
  },
];

const certifications = [
  { name: 'NVIDIA LLM Evaluation', year: '2025' },
  { name: 'NVIDIA Deep Learning', year: '2025' },
  { name: 'DataCamp PyTorch', year: '2024' },
  { name: 'DIGILOC Competition', year: '2024' },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.education-heading', {
        scrollTrigger: {
          trigger: '.education-heading',
          start: 'top 85%',
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from('.education-entry', {
        scrollTrigger: {
          trigger: '.education-col',
          start: 'top 85%',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });

      gsap.from('.cert-card', {
        scrollTrigger: {
          trigger: '.certs-grid',
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
      id="education"
      className="w-full py-20 px-6 bg-page-bg"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="education-heading text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium text-text-primary">
          Education &amp; Certifications
        </h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div className="education-col">
            <h3 className="text-xs font-medium uppercase tracking-wide text-text-secondary mb-6">
              Education
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} className={`education-entry ${idx > 0 ? 'mt-8' : ''}`}>
                <p className="text-base font-medium text-accent">
                  {edu.institution}
                </p>
                <p className="mt-1 text-base font-medium text-text-primary">
                  {edu.degree}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-text-secondary">
                  {edu.period}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wide text-text-secondary mb-6">
              Certifications
            </h3>
            <div className="certs-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="cert-card bg-white rounded-xl p-5 border-l-[3px] border-accent"
                >
                  <p className="text-base font-medium text-text-primary">
                    {cert.name}
                  </p>
                  <p className="mt-1 text-xs font-medium text-text-secondary">
                    {cert.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
