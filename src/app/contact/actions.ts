"use server";

export type ContactField =
  | "name"
  | "email"
  | "phone"
  | "dog"
  | "service"
  | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const get = (k: ContactField) => String(formData.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    dog: get("dog"),
    service: get("service"),
    message: get("message"),
  };

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Merci d'indiquer votre nom.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Adresse email invalide.";
  if (values.message.length < 10)
    errors.message = "Votre message est un peu court (10 caractères minimum).";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  // TODO (prototype) : brancher l'envoi réel de l'email (Resend, Brevo…).
  await new Promise((resolve) => setTimeout(resolve, 600));

  return { status: "success" };
}
