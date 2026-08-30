"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Web Speech API does not expose the synthesized audio as a stream, so we
// cannot run a real AnalyserNode on it like we could with an <audio> tag.
// While speaking, talkLevel is a synthesized pulse (not real amplitude) —
// good enough to drive mouth/head bob, not a real lipsync signal.
export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const talkLevelRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function pulse() {
    talkLevelRef.current = 0.35 + Math.random() * 0.65;
    rafRef.current = requestAnimationFrame(pulse);
  }

  const speak = useCallback((text) => {
    if (!supported || !text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 0.98;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      setSpeaking(true);
      pulse();
    };
    utterance.onend = () => {
      setSpeaking(false);
      talkLevelRef.current = 0;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    utterance.onerror = () => {
      setSpeaking(false);
      talkLevelRef.current = 0;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    window.speechSynthesis.speak(utterance);
  }, [supported]);

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
    setSpeaking(false);
    talkLevelRef.current = 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [supported]);

  return { speak, stop, speaking, supported, talkLevelRef };
}
