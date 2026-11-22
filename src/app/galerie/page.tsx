import { Camera } from "lucide-react";
import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { InstagramIcon } from "@/components/icons/Social";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Fill } from "@/components/ui/Todo";
import { getGalerie, getInfos } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { intro } = getGalerie();
  return { title: "Galerie", description: intro };
}

export default function GaleriePage() {
  const page = getGalerie();
  const instagram = getInfos().reseaux.instagram;

  return (
    <>
      <Section
        titleAs="h1"
        eyebrow={page.surtitre}
        title={page.titre}
        intro={page.intro && <Fill text={page.intro} />}
      >
        {/* Mosaïque type "masonry" en CSS pur */}
        <div className="columns-2 gap-3 sm:gap-4 lg:columns-3">
          {page.photos.map((g, i) => (
            <Reveal
              key={g.description}
              delay={(i % 3) * 80}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <figure>
                <Photo
                  src={g.photo}
                  alt={g.description}
                  hint={g.description}
                  ratio={g.format}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                />
                <figcaption className="mt-2 px-1 text-sm text-ink-muted">
                  {g.description}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {instagram && (
          <Reveal className="mt-16 flex flex-col items-center gap-4 rounded-card bg-surface-alt p-8 text-center sm:p-12">
            <Camera className="size-8 text-accent-600" aria-hidden />
            <p className="font-display text-2xl text-primary-900">
              {page.instagram.titre}
            </p>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary-600 px-6 font-semibold text-white transition-colors hover:bg-primary-700"
            >
              <InstagramIcon className="size-5" /> {page.instagram.bouton}
            </a>
          </Reveal>
        )}
      </Section>
      <CtaBanner />
    </>
  );
}
