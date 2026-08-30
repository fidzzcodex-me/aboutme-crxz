"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { navLinks, externalLinks } from "@/data/nav";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/lib/hooks";
import { useTheme } from "@/lib/theme-context";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(navLinks.map((link) => link.id));
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleNavClick(id) {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className={`navbar ${scrolled ? "navbar-solid" : ""}`}>
      <div className="container navbar-inner">
        <a
          href="#home"
          className="navbar-logo mono"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("home");
          }}
        >
          {profile.name}
        </a>

        <nav className="navbar-links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`navbar-link ${activeId === link.id ? "is-active" : ""}`}
              onClick={(event) => {
                event.preventDefault();
                handleNavClick(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
          {externalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="navbar-link navbar-link-external">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar-actions">
          {mounted && (
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
            </button>
          )}
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav className="mobile-menu-links" aria-label="Mobile navigation">
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`mobile-menu-link ${activeId === link.id ? "is-active" : ""}`}
              style={{ transitionDelay: menuOpen ? `${index * 40}ms` : "0ms" }}
              onClick={(event) => {
                event.preventDefault();
                handleNavClick(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
          {externalLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-menu-link"
              style={{ transitionDelay: menuOpen ? `${(navLinks.length + index) * 40}ms` : "0ms" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
