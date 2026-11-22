"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SocialIconLink, type SocialLink } from "@/components/icons/Social";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { isActive } from "./NavLinks";

export type MobileContact = {
  email: string;
  phone: string;
  socials: SocialLink[];
};

const roundIcon = "grid size-11 place-items-center rounded-full bg-primary-100";

/** Menu plein écran pour mobile et tablette (< 1024 px). */
export function MobileMenu({ contact }: { contact: MobileContact }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fermeture automatique au changement de page
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Bloque le scroll de la page et gère la touche Échap
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        data-open={open}
        className="group relative grid size-11 place-items-center rounded-full text-primary-800 transition-colors hover:bg-primary-100"
      >
        <span className="absolute h-0.5 w-5 -translate-y-[5px] rounded-full bg-current transition-transform duration-300 group-data-[open=true]:translate-y-0 group-data-[open=true]:rotate-45" />
        <span className="absolute h-0.5 w-5 translate-y-[5px] rounded-full bg-current transition-transform duration-300 group-data-[open=true]:translate-y-0 group-data-[open=true]:-rotate-45" />
      </button>

      <div
        id="mobile-menu"
        data-open={open}
        inert={!open}
        className={cn(
          "group fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-surface px-6 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
          "invisible opacity-0 transition-[opacity,visibility] duration-300",
          "data-[open=true]:visible data-[open=true]:opacity-100",
        )}
      >
        <nav aria-label="Navigation mobile">
          <ul className="divide-y divide-primary-100">
            {siteConfig.nav.map((item, i) => (
              <li
                key={item.href}
                className="translate-y-3 opacity-0 transition duration-500 ease-out-soft group-data-[open=true]:translate-y-0 group-data-[open=true]:opacity-100"
                style={{ transitionDelay: open ? `${60 + i * 45}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={
                    isActive(pathname, item.href) ? "page" : undefined
                  }
                  className="group/link flex items-center justify-between py-4 font-display text-3xl text-primary-900 aria-[current=page]:text-accent-600"
                >
                  {item.label}
                  <span
                    className="size-2 rounded-full bg-accent-500 opacity-0 group-aria-[current=page]/link:opacity-100"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto space-y-6 pt-10 opacity-0 transition-opacity delay-300 duration-500 group-data-[open=true]:opacity-100">
          <ButtonLink href={siteConfig.cta.href} className="w-full" arrow>
            {siteConfig.cta.label}
          </ButtonLink>
          <div className="flex items-center justify-between text-primary-700">
            <div className="flex gap-2">
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                className={roundIcon}
                aria-label="Appeler"
              >
                <Phone className="size-5" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                className={roundIcon}
                aria-label="Envoyer un email"
              >
                <Mail className="size-5" />
              </a>
            </div>
            <div className="flex gap-2">
              {contact.socials.map((link) => (
                <SocialIconLink
                  key={link.key}
                  link={link}
                  className={roundIcon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
