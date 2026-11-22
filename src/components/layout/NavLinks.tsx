"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Liens de la navbar desktop, avec soulignement animé. */
export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {siteConfig.nav.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            className={cn(
              "relative py-2 font-semibold text-ink/75 transition-colors hover:text-primary-700",
              "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent-500 after:transition-transform after:duration-300 hover:after:scale-x-100",
              "aria-[current=page]:text-primary-800 aria-[current=page]:after:scale-x-100",
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
