"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCopy, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { profile } from "@/data/profile";
import Reveal from "@/components/Reveal";
import Toast from "@/components/Toast";
import "./Contact.css";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [toast, setToast] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setToast({ message: "Email copied to clipboard", type: "success" });
    } catch {
      setToast({ message: "Could not copy email", type: "error" });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("idle");
        setToast({ message: data.error || "Failed to send message", type: "error" });
        return;
      }

      setStatus("idle");
      setForm(initialForm);
      setToast({ message: "Message sent, thanks!", type: "success" });
    } catch {
      setStatus("idle");
      setToast({ message: "Something went wrong, try again", type: "error" });
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-grid">
        <Reveal>
          <p className="eyebrow">contact</p>
          <h2 className="section-title">Let&apos;s build something</h2>
          <p className="section-lead">
            Ada ide project atau mau ngobrol soal bot dan automation? Kirim pesan lewat form,
            atau hubungi langsung lewat salah satu channel di bawah.
          </p>

          <div className="contact-links">
            <button type="button" className="contact-link-btn" onClick={handleCopyEmail}>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>{profile.contact.email}</span>
              <FontAwesomeIcon icon={faCopy} className="copy-icon" />
            </button>
            <a href={profile.contact.tiktokUrl} target="_blank" rel="noreferrer" className="contact-link-btn">
              <FontAwesomeIcon icon={faTiktok} />
              <span>{profile.contact.tiktok}</span>
            </a>
            <a href={profile.contact.instagramUrl} target="_blank" rel="noreferrer" className="contact-link-btn">
              <FontAwesomeIcon icon={faInstagram} />
              <span>{profile.contact.instagram}</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form className="contact-form card" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project"
              />
            </div>
            <button type="submit" className="btn btn-primary contact-submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </Reveal>
      </div>

      <Toast
        message={toast?.message}
        type={toast?.type}
        onDismiss={() => setToast(null)}
      />
    </section>
  );
}
