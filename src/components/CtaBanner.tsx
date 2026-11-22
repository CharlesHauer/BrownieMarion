import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Fill } from "@/components/ui/Todo";
import { siteConfig } from "@/config/site";
import { getInfos } from "@/lib/content";

type CtaBannerProps = {
  /** Remplace le titre défini dans contenu/01-infos-generales.yaml */
  title?: string;
  /** Affiche le bouton secondaire "Voir les tarifs" */
  showPricing?: boolean;
};

/** Bandeau d'appel à l'action commun à toutes les pages. */
export function CtaBanner({ title, showPricing = true }: CtaBannerProps) {
  const infos = getInfos();

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[calc(var(--radius)*2)] bg-primary-800 px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-accent-500/30 blur-3xl"
        />
        <h2 className="relative text-h2 text-white">
          {title ?? infos.bandeau.titre}
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-primary-200">
          <Fill text={infos.bandeau.texte} />
        </p>
        <div className="relative mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.discoveryHref} variant="accent" arrow>
            {infos.bouton_principal}
          </ButtonLink>
          {showPricing && (
            <ButtonLink href="/tarifs" variant="light">
              Voir les tarifs
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </section>
  );
}
