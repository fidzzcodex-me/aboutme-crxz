import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { profile } from "@/data/profile";
import Reveal from "@/components/Reveal";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <Reveal as="div" className="about-copy">
          <p className="eyebrow">about</p>
          <h2 className="section-title">A little about me</h2>
          {profile.about.map((paragraph, index) => (
            <p key={index} className="about-paragraph">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <div className="profile-card card">
            <div className="profile-card-icon">
              <FontAwesomeIcon icon={faCode} />
            </div>
            <p className="profile-card-name mono">{profile.name}</p>
            <p className="profile-card-role">{profile.role}</p>
            <div className="profile-card-divider" />
            <p className="profile-card-note">
              Bukan developer besar. Cuma yang terus mencoba, satu project pada satu waktu.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
