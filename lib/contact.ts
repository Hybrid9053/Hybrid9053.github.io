/** Contact form validation — shared by the client form and the API route. */

export const topics = ["Software engineering", "AI development", "Cybersecurity (authorized)", "Technical consulting", "Research / collaboration", "Other"] as const;

export type ContactInput = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

export const limits = { name: 100, email: 254, message: 5000, minMessage: 20 } as const;

export function validateContact(raw: Record<string, unknown>): { ok: true; data: ContactInput } | { ok: false; errors: ContactErrors } {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  // Strip control characters (incl. CR/LF) from single-line fields to prevent header injection.
  const line = (v: unknown) => str(v).replace(/[\u0000-\u001f\u007f]+/g, " ");

  const data: ContactInput = {
    name: line(raw.name),
    email: line(raw.email).toLowerCase(),
    topic: line(raw.topic),
    message: str(raw.message).replace(/\r\n/g, "\n"),
  };

  const errors: ContactErrors = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  else if (data.name.length > limits.name) errors.name = `Please keep your name under ${limits.name} characters.`;

  if (!EMAIL_RE.test(data.email) || data.email.length > limits.email) errors.email = "Please enter a valid email address.";

  if (!(topics as readonly string[]).includes(data.topic)) errors.topic = "Please choose a topic.";

  if (data.message.length < limits.minMessage) errors.message = `Please write at least ${limits.minMessage} characters.`;
  else if (data.message.length > limits.message) errors.message = `Please keep your message under ${limits.message} characters.`;

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
