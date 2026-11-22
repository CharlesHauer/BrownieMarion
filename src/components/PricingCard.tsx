import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Fill } from "@/components/ui/Todo";
import { cn } from "@/lib/cn";
import type { Formule } from "@/lib/content";

export function PricingCard({
  offer,
  className,
}: {
  offer: Formule;
  className?: string;
}) {
  const hl = offer.mise_en_avant;
  const muted = hl ? "text-primary-200" : "text-ink-muted";

  return (
    <article
      className={cn(
        "lift relative flex h-full flex-col rounded-card p-7",
        hl
          ? "bg-primary-800 text-primary-100 shadow-xl shadow-primary-900/20"
          : "bg-white ring-1 ring-primary-100",
        className,
      )}
    >
      {hl && (
        <Badge tone="solid" className="absolute -top-3 left-7">
          Le plus choisi
        </Badge>
      )}
      <h3 className={cn("text-xl", hl && "text-white")}>{offer.nom}</h3>
      {offer.description && (
        <p className={cn("mt-2 text-sm", muted)}>
          <Fill text={offer.description} />
        </p>
      )}

      <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
        <span
          className={cn(
            "font-display text-4xl font-semibold",
            hl ? "text-white" : "text-primary-900",
          )}
        >
          <Fill text={offer.prix} />
        </span>
        {offer.detail_prix && (
          <span className={cn("text-sm", muted)}>
            <Fill text={offer.detail_prix} />
          </span>
        )}
      </p>

      <ul className="mt-6 mb-8 space-y-3 text-sm">
        {offer.inclus.map((f) => (
          <li key={f} className="flex gap-3">
            <Check
              className={cn(
                "mt-0.5 size-4 shrink-0",
                hl ? "text-accent-200" : "text-accent-600",
              )}
              aria-hidden
            />
            <span>
              <Fill text={f} />
            </span>
          </li>
        ))}
      </ul>

      <ButtonLink
        href="/contact"
        variant={hl ? "accent" : "secondary"}
        className="mt-auto w-full"
        arrow
      >
        Choisir
      </ButtonLink>
    </article>
  );
}
