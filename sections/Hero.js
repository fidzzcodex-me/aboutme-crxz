"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { profile } from "@/data/profile";
import { useTypewriter } from "@/lib/use-typewriter";
import Reveal from "@/components/Reveal";
import "./Hero.css";

export default function Hero() {
  const typedRole = useTypewriter(profile.roles);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <Reveal>
          <p className="eyebrow">available for small projects</p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="hero-title">about me</h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="hero-subtitle mono">{profile.name}</p>
        </Reveal>

        <Reveal delay={200}>
          <p className="hero-role">
            <span className="mono">{typedRole}</span>
            <span className="hero-cursor" aria-hidden="true" />
          </p>
        </Reveal>

        <Reveal delay={260}>
          <p className="hero-tagline">{profile.tagline}</p>
        </Reveal>

        <Reveal delay={320}>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={() => scrollTo("projects")}>
              View Projects
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button type="button" className="btn btn-outline" onClick={() => scrollTo("contact")}>
              Contact Me
              <FontAwesomeIcon icon={faEnvelope} />
            </button>
          </div>
        </Reveal>
      </div>

      <div className="hero-orb hero-orb-a" aria-hidden="true" />
      <div className="hero-orb hero-orb-b" aria-hidden="true" />
    </section>
  );
}
