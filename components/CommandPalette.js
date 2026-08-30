"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faDiagramProject,
  faLayerGroup,
  faEnvelope,
  faCircleHalfStroke,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@/lib/theme-context";
import "./CommandPalette.css";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  function goToSection(id) {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const commands = [
    { id: "home", label: "Go Home", icon: faHouse, action: () => goToSection("home") },
    { id: "about", label: "Go About", icon: faUser, action: () => goToSection("about") },
    { id: "projects", label: "View Projects", icon: faDiagramProject, action: () => goToSection("projects") },
    { id: "stack", label: "View Stack", icon: faLayerGroup, action: () => goToSection("stack") },
    { id: "contact", label: "Contact", icon: faEnvelope, action: () => goToSection("contact") },
    { id: "robot", label: "Open 3D Robot", icon: faRobot, action: () => router.push("/robot") },
    { id: "theme", label: "Toggle Theme", icon: faCircleHalfStroke, action: () => toggleTheme() },
  ];

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    function handleKey(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const filtered = commands.filter((command) =>
    command.label.toLowerCase().includes(query.toLowerCase())
  );

  if (!open) {
    return (
      <button
        type="button"
        className="palette-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
      >
        <span className="mono">⌘K</span>
      </button>
    );
  }

  return (
    <div className="palette-backdrop" onClick={close}>
      <div
        className="palette-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          type="text"
          className="palette-input"
          placeholder="Type a command..."
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="palette-list">
          {filtered.length === 0 && <p className="palette-empty">No matching command.</p>}
          {filtered.map((command) => (
            <button
              key={command.id}
              type="button"
              className="palette-item"
              onClick={() => {
                command.action();
                close();
              }}
            >
              <FontAwesomeIcon icon={command.icon} />
              {command.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
