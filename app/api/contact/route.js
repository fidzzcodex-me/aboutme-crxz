import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rate-limit";
import { sendContactMessage } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value) {
  return value.replace(/[<>]/g, "").trim();
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests, please try again in a minute." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? sanitize(body.name) : "";
  const email = typeof body.email === "string" ? sanitize(body.email) : "";
  const message = typeof body.message === "string" ? sanitize(body.message) : "";

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json(
      { error: "Name must be between 2 and 100 characters." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  if (message.length < 10 || message.length > 2000) {
    return NextResponse.json(
      { error: "Message must be between 10 and 2000 characters." },
      { status: 400 }
    );
  }

  try {
    await sendContactMessage({ name, email, message });
  } catch (error) {
    console.error("[api/contact] failed to send message:", error);
    return NextResponse.json(
      { error: "Could not send your message right now, please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
