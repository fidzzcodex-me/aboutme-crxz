async function sendViaResend({ name, email, message }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "portfolio@resend.dev",
      to: process.env.CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `New message from ${name}`,
      text: message,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend request failed: ${res.status} ${detail}`);
  }
}

async function sendViaConsole({ name, email, message }) {
  console.log("[contact] no email provider configured, message received:", {
    name,
    email,
    message,
  });
}

export async function sendContactMessage(payload) {
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    await sendViaResend(payload);
    return;
  }

  await sendViaConsole(payload);
}
