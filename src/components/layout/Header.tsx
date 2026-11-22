import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { type MobileContact, MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

type HeaderProps = { brand: string; name: string; contact: MobileContact };

export function Header({ brand, name, contact }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50">
      {/* Fond flouté séparé : un backdrop-filter sur le header casserait
          le positionnement "fixed" du menu mobile. */}
      <div
        aria-hidden
        className="header-bg absolute inset-0 -z-10 border-b border-primary-100/70 bg-surface/80 backdrop-blur-md"
      />
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt=""
            width={594}
            height={481}
            priority
            className="h-12 w-auto transition-transform duration-500 group-hover:scale-105 lg:h-14"
          />
          <span className="leading-none">
            <span className="block font-script text-2xl font-bold text-primary-800 lg:text-[1.7rem]">
              {brand}
            </span>
            <span className="mt-0.5 block text-xs font-semibold tracking-wide text-ink-muted">
              {name}
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
