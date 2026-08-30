import { timeline } from "@/data/timeline";
import Reveal from "@/components/Reveal";
import "./Timeline.css";

export default function Timeline() {
  return (
    <section id="timeline" className="section timeline-section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">journey</p>
          <h2 className="section-title">My Journey</h2>
        </Reveal>

        <div className="timeline-list">
          {timeline.map((item, index) => (
            <Reveal key={index} delay={index * 70}>
              <div className="timeline-item">
                <span className="timeline-year mono">{item.year}</span>
                <div className="timeline-marker" aria-hidden="true" />
                <div className="timeline-body">
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
