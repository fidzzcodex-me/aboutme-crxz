"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

export default function ParticleField() {
  const canvasRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, particles, animationId;
    const mouse = { x: -9999, y: -9999 };

    function isDark() {
      return document.documentElement.getAttribute("data-theme") === "dark";
    }

    function particleCount() {
      const area = width * height;
      const base = width < 640 ? 45 : width < 1024 ? 70 : 100;
      return Math.min(base, Math.floor(area / 18000));
    }

    function resize() {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      particles = Array.from({ length: particleCount() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25 * window.devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.25 * window.devicePixelRatio,
        r: (Math.random() * 1.2 + 0.6) * window.devicePixelRatio,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);
      const dotColor = isDark() ? "91, 141, 239" : "37, 99, 235";
      const linkDist = 130 * window.devicePixelRatio;
      const mouseDist = 180 * window.devicePixelRatio;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, 0.35)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${dotColor}, ${0.12 * (1 - dist / linkDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouseDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${dotColor}, ${0.25 * (1 - mdist / mouseDist)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(step);
    }

    function handlePointerMove(event) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (event.clientX - rect.left) * window.devicePixelRatio;
      mouse.y = (event.clientY - rect.top) * window.devicePixelRatio;
    }

    function handlePointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    step();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
