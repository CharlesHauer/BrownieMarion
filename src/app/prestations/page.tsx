import { Users } from "lucide-react";
import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Fill } from "@/components/ui/Todo";
import { cn } from "@/lib/cn";
import { getPrestations, slugify } from "@/lib/content";
import { icons } from "@/lib/icons";

export function generateMetadata(): Metadata {
  const { liste } = getPrestations();
  return {
    title: "Prestations",
    description: `${liste.map((s) => s.titre).join(", ")} : des accompagnements sur mesure.`,
  };
}

export default function PrestationsPage() {
  const page = getPrestations();

  return (
    <>
      <Section
        titleAs="h1"
        eyebrow={page.surtitre}
        title={page.titre}
        intro={page.intro && <Fill text={page.intro} />}
        className="pb-0 sm:pb-0"
      >
        {/* Sommaire rapide (pratique sur mobile) */}
        <nav
          aria-label="Prestations"
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {page.liste.map((s) => (
            <a
              key={s.titre}
              href={`#${slugify(s.titre)}`}
              className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary-800 ring-1 ring-primary-200 transition-colors hover:bg-primary-50"
            >
              {s.titre}
            </a>
          ))}
        </nav>
      </Section>

      <Section>
        <div className="space-y-20 sm:space-y-28">
          {page.liste.map((s, i) => {
            const Icon = icons[s.icone];
            return (
              <article
                key={s.titre}
                id={slugify(s.titre)}
                className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={cn(i % 2 === 1 && "lg:order-last")}>
                  <Photo
                    src={s.photo}
                    alt={s.titre}
                    hint={s.description_photo}
                    ratio="4/3"
                  />
                </Reveal>
                <Reveal delay={100}>
                  <span className="inline-flex rounded-2xl bg-accent-100 p-3 text-accent-700">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h2 className="mt-4 text-h2">{s.titre}</h2>
                  <p className="mt-4 text-lg text-ink-muted">
                    <Fill text={s.resume} />
                  </p>
                  {s.pour_qui && (
                    <p className="mt-6 flex items-center gap-2 font-semibold text-primary-800">
                      <Users className="size-5 text-accent-600" aria-hidden />
                      <span>
                        <Fill text={s.pour_qui} />
                      </span>
                    </p>
                  )}
                  {s.etapes.length > 0 && (
                    <ol className="mt-6 space-y-3">
                      {s.etapes.map((step, n) => (
                        <li key={step} className="flex gap-3">
                          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-600 text-sm font-bold text-white">
                            {n + 1}
                          </span>
                          <span className="pt-0.5">
                            <Fill text={step} />
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                  <ButtonLink
                    href="/tarifs"
                    variant="secondary"
                    className="mt-8"
                    arrow
                  >
                    Voir le tarif
                  </ButtonLink>
                </Reveal>
              </article>
            );
          })}
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
