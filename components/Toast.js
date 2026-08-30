"use client";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./Toast.css";

export default function Toast({ message, type = "success", onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`} role="status">
      <FontAwesomeIcon icon={type === "success" ? faCircleCheck : faCircleExclamation} />
      <span>{message}</span>
    </div>
  );
}
