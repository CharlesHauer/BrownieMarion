import { Quote, Star } from "lucide-react";
import { Fill } from "@/components/ui/Todo";
import type { Avis } from "@/lib/content";

export function TestimonialCard({ t }: { t: Avis }) {
  const initial =
    t.prenom
      .replace(/\[\[|\]\]/g, "")
      .trim()
      .charAt(0) || "?";

  return (
    <figure className="lift flex h-full flex-col rounded-card bg-white p-7 ring-1 ring-primary-100">
      <div className="flex items-center justify-between">
        <div
          role="img"
          className="flex gap-0.5 text-amber-500"
          aria-label="5 étoiles sur 5"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="size-4 fill-current" aria-hidden />
          ))}
        </div>
        <Quote className="size-8 text-primary-200" aria-hidden />
      </div>
      <blockquote className="mt-4 flex-1 text-ink/85">
        <Fill text={t.texte} />
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          className="grid size-11 place-items-center rounded-full bg-accent-100 font-display text-lg text-accent-700"
          aria-hidden
        >
          {initial}
        </span>
        <span className="text-sm">
          <span className="block font-bold text-primary-900">
            <Fill text={t.prenom} />
          </span>
          {t.chien && (
            <span className="text-ink-muted">
              <Fill text={t.chien} />
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
