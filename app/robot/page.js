"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faVolumeXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { profile } from "@/data/profile";
import { useSpeech } from "@/lib/use-speech";
import "./robot.css";

const RobotScene = dynamic(() => import("@/components/RobotScene"), { ssr: false });

const introLine = `Halo, saya ${profile.name}. ${profile.tagline}`;

export default function RobotPage() {
  const { speak, stop, speaking, supported, talkLevelRef } = useSpeech();
  const [message, setMessage] = useState("");
  const [hasIntroduced, setHasIntroduced] = useState(false);
  const introFiredRef = useRef(false);

  useEffect(() => {
    if (introFiredRef.current || !supported) return;
    introFiredRef.current = true;
    const timer = setTimeout(() => {
      speak(introLine);
      setHasIntroduced(true);
    }, 700);
    return () => clearTimeout(timer);
  }, [speak, supported]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!message.trim()) return;
    speak(message.trim());
    setMessage("");
  }

  return (
    <div className="robot-page">
      <Link href="/" className="robot-back">
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to portfolio
      </Link>

      <RobotScene talkLevelRef={talkLevelRef} />

      <div className="robot-overlay">
        <div className="robot-caption">
          <p className="eyebrow">{speaking ? "speaking" : "idle"}</p>
          <p className="robot-caption-text">
            {hasIntroduced ? "Ketik pesan, saya bacakan." : "Menyiapkan perkenalan..."}
          </p>
        </div>

        {!supported && (
          <p className="robot-unsupported">
            Browser ini tidak mendukung text-to-speech. Robot tetap bisa dilihat, tapi tidak bisa
            bersuara.
          </p>
        )}

        <form className="robot-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tulis sesuatu untuk dibacakan..."
            disabled={!supported}
            maxLength={280}
          />
          {speaking ? (
            <button type="button" className="robot-btn robot-btn-stop" onClick={stop}>
              <FontAwesomeIcon icon={faVolumeXmark} />
            </button>
          ) : (
            <button type="submit" className="robot-btn" disabled={!supported || !message.trim()}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          )}
        </form>

        <p className="robot-hint">Drag robot untuk memutar. TTS pakai suara bawaan browser kamu.</p>
      </div>
    </div>
  );
}
