"use client";

import { useReveal } from "@/lib/hooks";

export default function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const { ref, visible } = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
