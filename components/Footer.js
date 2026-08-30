"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { profile } from "@/data/profile";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-copy mono">© {year} {profile.name}</p>
          <p className="footer-tagline">Building small things, learning every day.</p>
        </div>

        <div className="footer-right">
          <div className="footer-status">
            <span className="status-dot" aria-hidden="true" />
            available for small projects
          </div>

          <div className="footer-socials">
            <a href={profile.contact.tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a href={profile.contact.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>

          <button type="button" className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>
    </footer>
  );
}
