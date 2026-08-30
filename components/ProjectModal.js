"use client";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ProjectModal.css";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close project detail">
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <p className="eyebrow">{project.category}</p>
        <h3 id="project-modal-title" className="modal-title">
          {project.name}
        </h3>
        <p className="modal-desc">{project.description}</p>

        <div className="modal-block">
          <span className="modal-label mono">Problem</span>
          <p>{project.detail.problem}</p>
        </div>
        <div className="modal-block">
          <span className="modal-label mono">Approach</span>
          <p>{project.detail.approach}</p>
        </div>
        <div className="modal-block">
          <span className="modal-label mono">Technology</span>
          <div className="modal-tech">
            {project.tech.map((tech) => (
              <span key={tech} className="modal-tech-chip mono">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="modal-block">
          <span className="modal-label mono">Status</span>
          <p className="modal-status">{project.status}</p>
        </div>
        <div className="modal-block">
          <span className="modal-label mono">What I learned</span>
          <p>{project.detail.learned}</p>
        </div>

        <div className="modal-actions">
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline">
              <FontAwesomeIcon icon={faGithub} />
              GitHub
            </a>
          ) : (
            <span className="btn btn-outline btn-disabled">
              <FontAwesomeIcon icon={faGithub} />
              GitHub
            </span>
          )}
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
              Live Demo
            </a>
          ) : (
            <span className="btn btn-primary btn-disabled">Coming soon</span>
          )}
        </div>
      </div>
    </div>
  );
}
