"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** Barre d'actions collée en bas de l'écran sur mobile. */
export function MobileActionBar({ phone }: { phone: string }) {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-primary-100 bg-surface/85 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
      <div className="flex gap-3">
        <a
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
          className={cn(buttonClasses("secondary"), "flex-1")}
        >
          <Phone className="size-4" aria-hidden />
          Appeler
        </a>
        <ButtonLink href={siteConfig.cta.href} className="flex-1">
          {siteConfig.cta.label}
        </ButtonLink>
      </div>
    </div>
  );
}
