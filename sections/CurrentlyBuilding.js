import { currentlyBuilding } from "@/data/projects";
import Reveal from "@/components/Reveal";
import "./CurrentlyBuilding.css";

export default function CurrentlyBuilding() {
  if (!currentlyBuilding.length) {
    return (
      <section className="section">
        <div className="container">
          <p className="eyebrow">currently building</p>
          <h2 className="section-title">Currently building</h2>
          <p className="section-lead">No projects available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section currently-building">
      <div className="container">
        <Reveal>
          <p className="eyebrow">currently building</p>
          <h2 className="section-title">Currently building</h2>
        </Reveal>

        <div className="building-list">
          {currentlyBuilding.map((item, index) => (
            <Reveal key={item.name} delay={index * 60}>
              <div className="building-item">
                <span className={`building-status status-${item.status}`}>{item.status}</span>
                <div>
                  <h3 className="building-item-title">{item.name}</h3>
                  <p className="building-item-desc">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
