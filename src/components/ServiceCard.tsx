import { Card } from "@/components/ui/Card";
import { Fill } from "@/components/ui/Todo";
import { cn } from "@/lib/cn";
import type { Prestation } from "@/lib/content";
import { icons } from "@/lib/icons";

/** Carte compacte (accueil) */
export function ServiceCard({
  service,
  className,
}: {
  service: Prestation;
  className?: string;
}) {
  const Icon = icons[service.icone];

  return (
    <Card className={cn("group h-full", className)}>
      <div className="mb-5 inline-flex rounded-2xl bg-accent-100 p-3 text-accent-700 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
        <Icon className="size-6" aria-hidden />
      </div>
      <h3 className="text-xl">{service.titre}</h3>
      <p className="mt-2 text-ink-muted">
        <Fill text={service.resume} />
      </p>
    </Card>
  );
}
