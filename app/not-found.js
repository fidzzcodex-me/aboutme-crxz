import Link from "next/link";
import "./not-found.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-terminal">
        <div className="terminal-bar">
          <span className="terminal-dot" />
          <span className="terminal-dot" />
          <span className="terminal-dot" />
        </div>
        <div className="terminal-body mono">
          <p className="terminal-code">404</p>
          <p className="terminal-line">
            <span className="terminal-prompt">$</span> route_not_found
          </p>
          <p className="terminal-desc">The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="btn btn-primary terminal-btn">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
