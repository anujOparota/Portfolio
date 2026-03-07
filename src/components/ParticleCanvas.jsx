import { useEffect, useRef, useCallback } from "react";

const AMBIENT_COUNT = 60;

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const ambientParticles = useRef([]);
  const mouse = useRef({ x: -100, y: -100 });
  const animationRef = useRef(null);

  const createParticle = useCallback((x, y, isClick = false) => {
    const count = isClick ? 12 : 1;
    for (let i = 0; i < count; i++) {
      const angle = isClick ? (Math.PI * 2 * i) / count + Math.random() * 0.3 : Math.random() * Math.PI * 2;
      const speed = isClick ? 1.5 + Math.random() * 3 : 0.2 + Math.random() * 0.5;
      const size = isClick ? 4 + Math.random() * 6 : 2 + Math.random() * 3;
      particles.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + (isClick ? -1 : 0),
        size, alpha: 1,
        decay: isClick ? 0.015 + Math.random() * 0.01 : 0.02 + Math.random() * 0.015,
        isClick,
        gravity: isClick ? 0.08 : 0,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.05 + Math.random() * 0.05,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const initAmbient = () => {
      ambientParticles.current = [];
      for (let i = 0; i < AMBIENT_COUNT; i++) {
        ambientParticles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 1 + Math.random() * 2.5,
          baseAlpha: 0.15 + Math.random() * 0.35,
          alpha: 0,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          hue: 250 + Math.random() * 30,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initAmbient();
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      createParticle(e.clientX, e.clientY);
    };

    const handleClick = (e) => {
      createParticle(e.clientX, e.clientY, true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const drawDrop = (ctx, p) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      const gradient = ctx.createRadialGradient(
        p.x - p.size * 0.2, p.y - p.size * 0.3, 0,
        p.x, p.y, p.size
      );
      gradient.addColorStop(0, "hsla(263, 70%, 75%, 0.9)");
      gradient.addColorStop(0.5, "hsla(263, 70%, 50%, 0.6)");
      gradient.addColorStop(1, "hsla(263, 70%, 40%, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      if (p.isClick) {
        const s = p.size;
        ctx.moveTo(p.x, p.y - s * 1.4);
        ctx.bezierCurveTo(p.x + s * 0.8, p.y - s * 0.5, p.x + s, p.y + s * 0.3, p.x, p.y + s);
        ctx.bezierCurveTo(p.x - s, p.y + s * 0.3, p.x - s * 0.8, p.y - s * 0.5, p.x, p.y - s * 1.4);
      } else {
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.globalAlpha = p.alpha * 0.5;
      ctx.fillStyle = "hsla(263, 80%, 85%, 0.8)";
      ctx.beginPath();
      ctx.arc(p.x - p.size * 0.2, p.y - p.size * 0.3, p.size * 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawAmbient = (ctx, p) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
      gradient.addColorStop(0, `hsla(${p.hue}, 70%, 65%, 0.8)`);
      gradient.addColorStop(0.5, `hsla(${p.hue}, 60%, 50%, 0.3)`);
      gradient.addColorStop(1, `hsla(${p.hue}, 50%, 40%, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      ctx.fill();
      // Bright core
      ctx.globalAlpha = p.alpha * 0.8;
      ctx.fillStyle = `hsla(${p.hue}, 80%, 80%, 0.9)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Ambient floating particles + connections
      for (let i = 0; i < ambientParticles.current.length; i++) {
        const p = ambientParticles.current[i];
        p.pulse += p.pulseSpeed;
        p.alpha = p.baseAlpha * (0.5 + 0.5 * Math.sin(p.pulse));

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120 * 0.4;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        drawAmbient(ctx, p);

        // Connection lines to nearby particles
        for (let j = i + 1; j < ambientParticles.current.length; j++) {
          const p2 = ambientParticles.current[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - cdist / 100) * 0.08 * Math.min(p.alpha, p2.alpha);
            ctx.strokeStyle = "hsla(263, 60%, 60%, 1)";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Cursor trail particles
      particles.current = particles.current.filter((p) => p.alpha > 0.01);
      for (const p of particles.current) {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.3;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;
        p.size *= 0.995;
        drawDrop(ctx, p);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10 pointer-events-none"
    />
  );
};

export default ParticleCanvas;
