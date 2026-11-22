import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import { PricingCard } from "@/components/PricingCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Fill } from "@/components/ui/Todo";
import { getTarifs } from "@/lib/content";
import { icons } from "@/lib/icons";

export function generateMetadata(): Metadata {
  const { formules } = getTarifs();
  return {
    title: "Tarifs",
    description: `Grille tarifaire : ${formules.map((f) => f.nom.toLowerCase()).join(", ")}.`,
  };
}

export default function TarifsPage() {
  const page = getTarifs();

  return (
    <>
      <Section
        titleAs="h1"
        eyebrow={page.surtitre}
        title={page.titre}
        intro={page.intro && <Fill text={page.intro} />}
        className="overflow-hidden"
      >
        {/* Mobile : carrousel horizontal. Desktop : grille. */}
        <Reveal className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-4 pb-6 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 xl:grid-cols-4">
          {page.formules.map((offer) => (
            <div
              key={offer.nom}
              className="w-[82%] shrink-0 snap-start sm:w-[55%] md:w-auto"
            >
              <PricingCard offer={offer} />
            </div>
          ))}
        </Reveal>
        <p className="mt-2 text-center text-sm text-ink-muted md:hidden">
          ← Faites défiler pour voir toutes les formules →
        </p>
      </Section>

      <Section
        tone="alt"
        eyebrow={page.infos_pratiques.surtitre}
        title={page.infos_pratiques.titre}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {page.infos_pratiques.liste.map((info, i) => {
            const Icon = icons[info.icone];
            return (
              <Reveal
                key={info.titre}
                delay={i * 80}
                className="rounded-card bg-white p-6 ring-1 ring-primary-100"
              >
                <Icon className="size-6 text-accent-600" aria-hidden />
                <h3 className="mt-4 text-lg">{info.titre}</h3>
                <p className="mt-2 text-sm text-ink-muted">
                  <Fill text={info.texte} />
                </p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section eyebrow={page.faq.surtitre} title={page.faq.titre} centered>
        <div className="mx-auto max-w-3xl space-y-3">
          {page.faq.questions.map((item, i) => (
            <Reveal key={item.question} delay={i * 60}>
              <details className="faq group rounded-card bg-white ring-1 ring-primary-100 transition-shadow open:shadow-md">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold text-primary-900 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    className="size-5 shrink-0 text-accent-600 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="px-6 pb-6 text-ink-muted">
                  <Fill text={item.reponse} />
                </p>
              </details>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-ink-muted">Vous avez une autre question ?</p>
          <ButtonLink
            href="/contact"
            variant="secondary"
            className="mt-4"
            arrow
          >
            Poser ma question
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
