import { PawPrint } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { type MobileContact, MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

type HeaderProps = { name: string; job: string; contact: MobileContact };

export function Header({ name, job, contact }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50">
      {/* Fond flouté séparé : un backdrop-filter sur le header casserait
          le positionnement "fixed" du menu mobile. */}
      <div
        aria-hidden
        className="header-bg absolute inset-0 -z-10 border-b border-primary-100/70 bg-surface/80 backdrop-blur-md"
      />
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-lg font-semibold text-primary-900"
        >
          <span className="grid size-9 place-items-center rounded-full bg-primary-600 text-white transition-transform duration-500 group-hover:-rotate-12">
            <PawPrint className="size-5" aria-hidden />
          </span>
          <span className="leading-tight">
            {name}
            <span className="block font-sans text-xs font-semibold tracking-wide text-ink-muted">
              {job}
            </span>
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <NavLinks className="flex items-center gap-7" />
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={siteConfig.cta.href}
            className="hidden min-h-10 px-5 text-sm sm:inline-flex"
          >
            {siteConfig.cta.label}
          </ButtonLink>
          <MobileMenu contact={contact} />
        </div>
      </Container>
    </header>
  );
}
