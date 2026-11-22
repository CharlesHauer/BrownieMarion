import { Award } from "lucide-react";
import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { Card } from "@/components/ui/Card";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Fill } from "@/components/ui/Todo";
import { getAPropos, getInfos } from "@/lib/content";
import { icons } from "@/lib/icons";

export function generateMetadata(): Metadata {
  const { nom, metier } = getInfos();
  return {
    title: "À propos",
    description: `Découvrez ${nom}, ${metier.toLowerCase()} : son parcours, ses formations et sa méthode.`,
  };
}

export default function AProposPage() {
  const infos = getInfos();
  const p = getAPropos();

  return (
    <>
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal className="relative order-last lg:order-first">
            <Photo
              src={p.photo_portrait}
              alt={`Portrait de ${infos.nom}`}
              hint="Grand portrait de Marion avec Brownie, format portrait"
              ratio="4/5"
              priority
              className="rounded-[calc(var(--radius)*2)]"
            />
            <div
              aria-hidden
              className="absolute -right-4 -bottom-4 -z-10 size-full rounded-[calc(var(--radius)*2)] bg-accent-100"
            />
          </Reveal>
          <Reveal delay={100}>
            <Eyebrow>À propos</Eyebrow>
            <h1 className="mt-3 text-h1">{p.titre}</h1>
            <p className="mt-6 text-lg text-ink-muted">
              <Fill text={p.presentation} />
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
              {p.chiffres.map((s) => (
                <div
                  key={s.texte}
                  className="rounded-card bg-surface-alt px-2 py-3 text-center sm:p-4"
                >
                  <dt className="sr-only">{s.texte}</dt>
                  <dd className="font-display text-xl leading-tight text-primary-700 sm:text-3xl">
                    <Fill text={s.chiffre} />
                  </dd>
                  <dd className="mt-1 text-[11px] leading-tight text-ink-muted sm:text-xs">
                    {s.texte}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section
        tone="alt"
        eyebrow={p.parcours.surtitre}
        title={p.parcours.titre}
      >
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6 text-lg text-ink/85">
            {p.parcours.paragraphes.map((para, i) => (
              <Reveal key={para} delay={i * 80}>
                <p>
                  <Fill text={para} />
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <Card interactive={false}>
              <h3 className="flex items-center gap-2 text-xl">
                <Award className="size-5 text-accent-600" aria-hidden />
                {p.formations.titre}
              </h3>
              <ul className="mt-5 space-y-3">
                {p.formations.liste.map((c) => (
                  <li key={c} className="flex gap-3 text-sm">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-500" />
                    <span>
                      <Fill text={c} />
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow={p.methode.surtitre} title={p.methode.titre} centered>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {p.valeurs.map((v, i) => {
            const Icon = icons[v.icone];
            return (
              <Reveal key={v.titre} delay={i * 100}>
                <Card className="h-full">
                  <Icon className="size-7 text-accent-600" aria-hidden />
                  <h3 className="mt-4 text-xl">{v.titre}</h3>
                  <p className="mt-2 text-ink-muted">
                    <Fill text={v.texte} />
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {p.photos.length > 0 && (
        <Section tone="alt">
          <Reveal className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {p.photos.map((ph, i) => (
              <Photo
                key={ph.description}
                src={ph.photo}
                alt={ph.description}
                hint={ph.description}
                ratio="1/1"
                sizes="(min-width: 768px) 33vw, 50vw"
                className={i === 2 ? "col-span-2 md:col-span-1" : undefined}
              />
            ))}
          </Reveal>
        </Section>
      )}

      <CtaBanner title={p.bandeau_titre} />
    </>
  );
}
