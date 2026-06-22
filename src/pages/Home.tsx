import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Projects from '@/sections/Projects';
import Skills from '@/sections/Skills';
import Experience from '@/sections/Experience';
import Education from '@/sections/Education';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-[100dvh]">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
