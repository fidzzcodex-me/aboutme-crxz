"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { projects } from "@/data/projects";
import Reveal from "@/components/Reveal";
import ProjectModal from "@/components/ProjectModal";
import "./Projects.css";

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">selected projects</p>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-lead">
            Beberapa project yang pernah saya bangun. Klik detail untuk lihat cerita di baliknya.
          </p>
        </Reveal>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 60}>
              <div className="project-card card">
                <div className="project-card-top">
                  <span className="project-card-category mono">{project.category}</span>
                  <span className={`project-status status-${project.status}`}>{project.status}</span>
                </div>
                <h3 className="project-card-title">{project.name}</h3>
                <p className="project-card-desc">{project.description}</p>
                <div className="project-card-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="project-tech-chip mono">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-card-footer">
                  <button
                    type="button"
                    className="project-detail-btn"
                    onClick={() => setActiveProject(project)}
                  >
                    View detail
                  </button>
                  <div className="project-card-links">
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub`}>
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                    ) : (
                      <span className="project-link-disabled" aria-hidden="true">
                        <FontAwesomeIcon icon={faGithub} />
                      </span>
                    )}
                    {project.demo ? (
                      <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`}>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </a>
                    ) : (
                      <span className="project-link-disabled" aria-hidden="true">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
