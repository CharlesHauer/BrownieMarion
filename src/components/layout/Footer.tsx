import { Mail, MapPin, PawPrint, Phone } from "lucide-react";
import Link from "next/link";
import { getSocialLinks, SocialIconLink } from "@/components/icons/Social";
import { Container } from "@/components/ui/Container";
import { Fill } from "@/components/ui/Todo";
import { siteConfig } from "@/config/site";
import { getInfos, telHref } from "@/lib/content";

export function Footer() {
  const infos = getInfos();

  return (
    <footer className="bg-primary-900 text-primary-200">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr]">
        <div>
          <p className="flex items-center gap-2 font-display text-xl text-white">
            <PawPrint className="size-5 text-accent-500" aria-hidden />
            {infos.nom_du_site}
          </p>
          <p className="mt-3 max-w-xs text-sm">
            <Fill text={infos.slogan} />
          </p>
          <div className="mt-6 flex gap-3">
            {getSocialLinks(infos.reseaux).map((link) => (
              <SocialIconLink
                key={link.key}
                link={link}
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent-600"
              />
            ))}
          </div>
        </div>

        <nav aria-label="Liens du pied de page">
          <p className="mb-4 text-sm font-bold tracking-widest text-white uppercase">
            Navigation
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-1">
            {[...siteConfig.nav, siteConfig.cta].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="space-y-3 text-sm not-italic">
          <p className="mb-4 text-sm font-bold tracking-widest text-white uppercase">
            Contact
          </p>
          <a
            href={`mailto:${infos.email}`}
            className="flex items-center gap-3 hover:text-white"
          >
            <Mail className="size-4 shrink-0" aria-hidden /> {infos.email}
          </a>
          <a
            href={telHref(infos.telephone)}
            className="flex items-center gap-3 hover:text-white"
          >
            <Phone className="size-4 shrink-0" aria-hidden /> {infos.telephone}
          </a>
          <p className="flex items-center gap-3">
            <MapPin className="size-4 shrink-0" aria-hidden />
            <span>
              <Fill text={infos.zone} />
            </span>
          </p>
        </address>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-primary-300 sm:flex-row sm:justify-between">
          <p>© {infos.nom_du_site} — Prototype</p>
          <Link href="/charte" className="hover:text-white">
            Charte graphique
          </Link>
        </Container>
      </div>

      {/* Espace pour la barre d'actions mobile */}
      <div
        className="h-[calc(4.5rem+env(safe-area-inset-bottom))] sm:hidden"
        aria-hidden
      />
    </footer>
  );
}
