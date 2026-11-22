"use client";

import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { type ComponentProps, useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { type ContactField, type ContactState, sendContact } from "./actions";

const inputClasses =
  "w-full rounded-xl bg-surface px-4 py-3 text-base ring-1 ring-primary-200 transition-shadow outline-none placeholder:text-ink/40 focus:ring-2 focus:ring-primary-500 aria-invalid:ring-red-400";

type ContactFormProps = {
  /** Titres des prestations (contenu/04-prestations.yaml) */
  services: string[];
  confirmation: { title: string; text: string };
};

export function ContactForm({ services, confirmation }: ContactFormProps) {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    sendContact,
    { status: "idle" },
  );

  if (state.status === "success") {
    return (
      <div className="animate-fade-up flex flex-col items-center gap-4 py-12 text-center">
        <CircleCheck className="size-14 text-accent-600" aria-hidden />
        <h2 className="text-2xl">{confirmation.title}</h2>
        <p className="max-w-sm text-ink-muted">{confirmation.text}</p>
        <p className="text-xs text-ink/50">
          (Prototype : l'envoi réel d'email reste à brancher.)
        </p>
      </div>
    );
  }

  const field = (name: ContactField) => ({
    id: name,
    name,
    defaultValue: state.values?.[name],
    "aria-invalid": state.errors?.[name] ? true : undefined,
    "aria-describedby": state.errors?.[name] ? `${name}-error` : undefined,
  });

  return (
    <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field label="Nom et prénom" name="name" error={state.errors?.name}>
        <input
          {...field("name")}
          autoComplete="name"
          required
          className={inputClasses}
        />
      </Field>
      <Field label="Email" name="email" error={state.errors?.email}>
        <input
          {...field("email")}
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          className={inputClasses}
        />
      </Field>
      <Field label="Téléphone" name="phone" optional>
        <input
          {...field("phone")}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={inputClasses}
        />
      </Field>
      <Field label="Votre chien" name="dog" optional>
        <input
          {...field("dog")}
          placeholder="Nom, âge, race…"
          className={inputClasses}
        />
      </Field>
      <Field
        label="Votre demande"
        name="service"
        optional
        className="sm:col-span-2"
      >
        <select {...field("service")} className={inputClasses}>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
          <option value="Question">Une simple question</option>
        </select>
      </Field>
      <Field
        label="Message"
        name="message"
        error={state.errors?.message}
        className="sm:col-span-2"
      >
        <textarea
          {...field("message")}
          rows={5}
          required
          placeholder="Parlez-moi de votre chien et de vos objectifs…"
          className={cn(inputClasses, "resize-y")}
        />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          {pending ? "Envoi…" : "Envoyer le message"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  optional,
  className,
  children,
}: ComponentProps<"div"> & {
  label: string;
  name: ContactField;
  error?: string;
  optional?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={name} className="text-sm font-bold text-primary-900">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-ink/50">(facultatif)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
