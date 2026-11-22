import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { getSocialLinks } from "@/components/icons/Social";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { fontVariables } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { getInfos } from "@/lib/content";
import "./globals.css";

export function generateMetadata(): Metadata {
  const infos = getInfos();
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${infos.nom_du_site} – ${infos.metier}`,
      template: `%s | ${infos.nom_du_site}`,
    },
    description: infos.description_google,
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: infos.nom_du_site,
    },
  };
}

export const viewport: Viewport = {
  // Permet d'utiliser toute la surface de l'écran (encoches, barre iOS)
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const infos = getInfos();
  const contact = {
    email: infos.email,
    phone: infos.telephone,
    socials: getSocialLinks(infos.reseaux),
  };

  return (
    <html
      lang="fr"
      data-theme={siteConfig.theme}
      data-scroll-behavior="smooth"
      className={fontVariables}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only z-60 rounded-full bg-primary-700 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <Header brand={infos.nom_du_site} name={infos.nom} contact={contact} />
        <ViewTransition>
          <main id="contenu" className="flex-1">
            {children}
          </main>
        </ViewTransition>
        <Footer />
        <MobileActionBar phone={infos.telephone} />
      </body>
    </html>
  );
}
