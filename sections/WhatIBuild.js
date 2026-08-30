import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears, faRobot, faGlobe, faServer } from "@fortawesome/free-solid-svg-icons";
import { buildCategories } from "@/data/build-categories";
import Reveal from "@/components/Reveal";
import "./WhatIBuild.css";

const icons = { gears: faGears, robot: faRobot, globe: faGlobe, server: faServer };

export default function WhatIBuild() {
  return (
    <section className="section what-i-build">
      <div className="container">
        <Reveal>
          <p className="eyebrow">what i build</p>
          <h2 className="section-title">Things I like building</h2>
        </Reveal>

        <div className="build-grid">
          {buildCategories.map((category, index) => (
            <Reveal key={category.title} delay={index * 60}>
              <div className="build-card card">
                <div className="build-card-icon">
                  <FontAwesomeIcon icon={icons[category.icon]} />
                </div>
                <h3 className="build-card-title">{category.title}</h3>
                <p className="build-card-desc">{category.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
