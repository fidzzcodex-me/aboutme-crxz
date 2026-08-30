import { stack } from "@/data/stack";
import Reveal from "@/components/Reveal";
import "./Stack.css";

export default function Stack() {
  return (
    <section id="stack" className="section stack-section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">tech stack</p>
          <h2 className="section-title">Tools I use</h2>
          <p className="section-lead">
            Bukan daftar keahlian, cuma tools yang sering saya pakai untuk membangun project.
          </p>
        </Reveal>

        <div className="stack-grid">
          {stack.map((item, index) => (
            <Reveal key={item.name} delay={index * 30}>
              <div className="stack-chip">
                <span className="stack-chip-name mono">{item.name}</span>
                <span className={`stack-chip-status status-${item.status}`}>{item.status}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
