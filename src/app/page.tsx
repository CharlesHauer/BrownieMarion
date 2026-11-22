import { Star } from "lucide-react";
import type { CSSProperties } from "react";
import { CtaBanner } from "@/components/CtaBanner";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Fill } from "@/components/ui/Todo";
import { siteConfig } from "@/config/site";
import {
  getAccueil,
  getAPropos,
  getAvis,
  getGalerie,
  getInfos,
  getPrestations,
} from "@/lib/content";
import { icons } from "@/lib/icons";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Titre du hero : les mots entre *étoiles* sont mis en valeur. */
function HeroTitle({ text }: { text: string }) {
  return text.split(/\*(.+?)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={`mot-${part}`}
        className="relative whitespace-nowrap text-primary-600 italic"
      >
        {part}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
          className="absolute -bottom-1 left-0 h-3 w-full text-accent-500"
        >
          <path
            d="M2 9C50 3 150 2 198 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </span>
    ) : (
      part
    ),
  );
}

export default function HomePage() {
  const infos = getInfos();
  const accueil = getAccueil();
  const apropos = getAPropos();
  const { liste: prestations } = getPrestations();
  const { photos } = getGalerie();
  const { avis } = getAvis();
  const hero = accueil.haut_de_page;

  return (
    <>
      {/* ---------- Haut de page ---------- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-accent-100 opacity-70 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-32 size-[28rem] rounded-full bg-primary-100 opacity-80 blur-3xl"
        />

        <Container className="relative grid items-center gap-12 py-12 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
          <div>
            {hero.surtitre && (
              <div className="animate-fade-up">
                <Eyebrow>{hero.surtitre}</Eyebrow>
              </div>
            )}
            <h1 className="animate-fade-up mt-5 text-display" style={delay(80)}>
              <HeroTitle text={hero.titre} />
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-xl text-lg text-ink-muted sm:text-xl"
              style={delay(160)}
            >
              <Fill text={hero.texte} />
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={delay(240)}
            >
              <ButtonLink href={siteConfig.discoveryHref} arrow>
                {infos.bouton_principal}
              </ButtonLink>
              <ButtonLink href="/prestations" variant="secondary">
                Découvrir les prestations
              </ButtonLink>
            </div>
            <ul
              className="animate-fade-up mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary-800"
              style={delay(320)}
            >
              {hero.points_forts.map(({ icone, texte }) => {
                const Icon = icons[icone];
                return (
                  <li key={texte} className="flex items-center gap-2">
                    <Icon className="size-5 text-accent-600" aria-hidden />
                    {texte}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="animate-fade-up relative" style={delay(200)}>
            <Photo
              src={hero.photo}
              alt={`${infos.nom}, ${infos.metier}`}
              hint="Photo principale : Marion avec Brownie, en extérieur, format portrait"
              ratio="4/5"
              priority
              className="rounded-[calc(var(--radius)*2)] shadow-2xl shadow-primary-900/15"
            />
            {hero.badge && (
              <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-card bg-white p-4 shadow-xl ring-1 ring-primary-100 sm:-left-6">
                <span className="grid size-11 place-items-center rounded-full bg-amber-100 text-amber-600">
                  <Star className="size-5 fill-current" aria-hidden />
                </span>
                <span className="text-sm leading-tight">
                  <span className="block font-bold text-primary-900">
                    <Fill text={hero.badge.chiffre} />
                  </span>
                  <span className="text-ink-muted">
                    <Fill text={hero.badge.texte} />
                  </span>
                </span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ---------- Présentation ---------- */}
      <Section tone="alt">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="grid grid-cols-2 gap-4">
            <Photo
              src={accueil.presentation.photo_1}
              alt={`Portrait de ${infos.nom}`}
              hint="Portrait de Marion souriante"
              ratio="3/4"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
            <Photo
              src={accueil.presentation.photo_2}
              alt={`${infos.nom} en séance`}
              hint="Marion en pleine séance"
              ratio="3/4"
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="mt-10"
            />
          </Reveal>
          <Reveal delay={100}>
            {accueil.presentation.surtitre && (
              <Eyebrow>{accueil.presentation.surtitre}</Eyebrow>
            )}
            <h2 className="mt-3 text-h2">{apropos.titre}</h2>
            <p className="mt-5 text-lg text-ink-muted">
              <Fill text={apropos.presentation} />
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-primary-200 py-6">
              {apropos.chiffres.map((s) => (
                <div key={s.texte}>
                  <dt className="sr-only">{s.texte}</dt>
                  <dd className="font-display text-3xl text-primary-700">
                    <Fill text={s.chiffre} />
                  </dd>
                  <dd className="mt-1 text-xs text-ink-muted sm:text-sm">
                    {s.texte}
                  </dd>
                </div>
              ))}
            </dl>
            <ButtonLink
              href="/a-propos"
              variant="secondary"
              className="mt-8"
              arrow
            >
              {accueil.presentation.bouton}
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Méthode ---------- */}
      <Section
        eyebrow={accueil.methode.surtitre}
        title={accueil.methode.titre}
        intro={accueil.methode.intro}
        centered
      >
        <div className="grid gap-6 md:grid-cols-3">
          {apropos.valeurs.map((v, i) => {
            const Icon = icons[v.icone];
            return (
              <Reveal key={v.titre} delay={i * 100}>
                <Card className="h-full text-center">
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary-100 text-primary-700">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl">{v.titre}</h3>
                  <p className="mt-2 text-ink-muted">
                    <Fill text={v.texte} />
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------- Prestations ---------- */}
      <Section
        tone="alt"
        eyebrow={accueil.prestations.surtitre}
        title={accueil.prestations.titre}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {prestations.map((s, i) => (
            <Reveal key={s.titre} delay={i * 80}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/prestations" arrow>
            Toutes les prestations
          </ButtonLink>
          <ButtonLink href="/tarifs" variant="secondary">
            Voir les tarifs
          </ButtonLink>
        </div>
      </Section>

      {/* ---------- Galerie ---------- */}
      <Section eyebrow={accueil.galerie.surtitre} title={accueil.galerie.titre}>
        <Reveal className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
          {photos.slice(0, 5).map((g, i) => (
            <Photo
              key={g.description}
              src={g.photo}
              alt={g.description}
              hint={g.description}
              ratio={i === 0 ? "1/1" : "4/3"}
              sizes="(min-width: 768px) 25vw, 50vw"
              className={
                i === 0
                  ? "col-span-2 md:row-span-2 md:aspect-auto! md:h-full"
                  : ""
              }
            />
          ))}
        </Reveal>
        <ButtonLink href="/galerie" variant="secondary" className="mt-10" arrow>
          Voir la galerie
        </ButtonLink>
      </Section>

      {/* ---------- Avis ---------- */}
      {avis.length > 0 && (
        <Section
          tone="alt"
          eyebrow={accueil.avis.surtitre}
          title={accueil.avis.titre}
          className="overflow-hidden"
        >
          <Reveal className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {avis.map((t, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: liste statique
                key={i}
                className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-auto"
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </Reveal>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}
