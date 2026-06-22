import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, prevX: -1000, prevY: -1000 });
  const timeRef = useRef(0);
  const orbRef = useRef({ angle: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas.parentElement!);

    const createParticle = (x: number, y: number, vx: number, vy: number, hue: number): Particle => ({
      x, y, vx, vy,
      life: 1,
      maxLife: 80 + Math.random() * 120,
      size: 1 + Math.random() * 3,
      hue,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.vx = x - mouseRef.current.prevX;
      mouseRef.current.vy = y - mouseRef.current.prevY;
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = x;
      mouseRef.current.y = y;

      for (let i = 0; i < 4; i++) {
        const speed = Math.sqrt(mouseRef.current.vx ** 2 + mouseRef.current.vy ** 2);
        const angle = Math.atan2(mouseRef.current.vy, mouseRef.current.vx) + (Math.random() - 0.5) * 1.5;
        const vel = speed * 0.3 + Math.random() * 2;
        particlesRef.current.push(createParticle(
          x + (Math.random() - 0.5) * 10,
          y + (Math.random() - 0.5) * 10,
          Math.cos(angle) * vel,
          Math.sin(angle) * vel,
          320 + Math.random() * 40
        ));
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const simplexNoise = (x: number, y: number, t: number): number => {
      return (
        Math.sin(x * 0.01 + t * 0.5) * Math.cos(y * 0.01 + t * 0.3) * 0.5 +
        Math.sin(x * 0.02 - t * 0.4) * Math.cos(y * 0.015 + t * 0.6) * 0.3 +
        Math.sin((x + y) * 0.008 + t * 0.2) * 0.2
      );
    };

    const draw = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;

      ctx.fillStyle = 'rgba(26, 24, 23, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Draw base gradient
      const baseGrad = ctx.createRadialGradient(width * 0.5, height * 0.5, 0, width * 0.5, height * 0.5, width * 0.8);
      baseGrad.addColorStop(0, 'rgba(42, 37, 32, 0.08)');
      baseGrad.addColorStop(1, 'rgba(26, 24, 23, 0)');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // Orbiting fuchsia sphere
      orbRef.current.angle += 0.0007;
      const orbitRadius = Math.min(width, height) * 0.18;
      const orbX = width * 0.5 + Math.cos(orbRef.current.angle) * orbitRadius;
      const orbY = height * 0.5 + Math.sin(orbRef.current.angle * 0.7) * orbitRadius * 0.6;

      // Emit particles from orb
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.8;
        particlesRef.current.push(createParticle(
          orbX + Math.cos(angle) * 5,
          orbY + Math.sin(angle) * 5,
          Math.cos(angle) * speed + Math.cos(orbRef.current.angle) * 0.5,
          Math.sin(angle) * speed + Math.sin(orbRef.current.angle) * 0.5,
          300 + Math.random() * 50
        ));
      }

      // Draw orb glow
      const orbGlow = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 60);
      orbGlow.addColorStop(0, 'rgba(196, 24, 156, 0.4)');
      orbGlow.addColorStop(0.3, 'rgba(196, 24, 156, 0.15)');
      orbGlow.addColorStop(1, 'rgba(196, 24, 156, 0)');
      ctx.fillStyle = orbGlow;
      ctx.beginPath();
      ctx.arc(orbX, orbY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Draw orb center
      const orbCenter = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 12);
      orbCenter.addColorStop(0, 'rgba(255, 120, 220, 0.9)');
      orbCenter.addColorStop(0.5, 'rgba(196, 24, 156, 0.6)');
      orbCenter.addColorStop(1, 'rgba(196, 24, 156, 0)');
      ctx.fillStyle = orbCenter;
      ctx.beginPath();
      ctx.arc(orbX, orbY, 12, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Apply flow field
        const noise = simplexNoise(p.x, p.y, t);
        const flowAngle = noise * Math.PI * 2;
        p.vx += Math.cos(flowAngle) * 0.08;
        p.vy += Math.sin(flowAngle) * 0.08;

        // Mouse attraction (gentle)
        const mdx = mouseRef.current.x - p.x;
        const mdy = mouseRef.current.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 200 && mdist > 5) {
          const force = (200 - mdist) / 200 * 0.03;
          p.vx += (mdx / mdist) * force;
          p.vy += (mdy / mdist) * force;
        }

        // Damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        const alpha = p.life * 0.6;
        const size = p.size * p.life;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${alpha})`;
        ctx.fill();

        // Trail
        if (Math.abs(p.vx) > 0.5 || Math.abs(p.vy) > 0.5) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
          ctx.strokeStyle = `hsla(${p.hue}, 70%, 55%, ${alpha * 0.4})`;
          ctx.lineWidth = size * 0.6;
          ctx.stroke();
        }
      }

      // Limit particles
      if (particles.length > 1500) {
        particles.splice(0, particles.length - 1500);
      }

      // Draw subtle flow lines
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = 'rgba(196, 24, 156, 0.3)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let gx = 0; gx < width; gx += gridSize) {
        for (let gy = 0; gy < height; gy += gridSize) {
          const noise = simplexNoise(gx, gy, t);
          const angle = noise * Math.PI * 2;
          const len = 15;
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx + Math.cos(angle) * len, gy + Math.sin(angle) * len);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
