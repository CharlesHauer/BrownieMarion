/**
 * Réglages techniques du site.
 * Les TEXTES (nom, coordonnées, réseaux, contenus des pages) sont dans
 * le dossier contenu/ à la racine du projet.
 */

/** Thèmes définis dans src/styles/theme.css */
export const themes = [
  { id: "chaleureux", label: "Chaleureux" },
  { id: "foret", label: "Forêt" },
  { id: "epure", label: "Épuré" },
] as const;

export type ThemeId = (typeof themes)[number]["id"];

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fr_FR",

  /** Thème actif : "chaleureux" | "foret" | "epure" */
  theme: "chaleureux" as ThemeId,

  nav: [
    { href: "/", label: "Accueil" },
    { href: "/a-propos", label: "À propos" },
    { href: "/prestations", label: "Prestations" },
    { href: "/galerie", label: "Galerie" },
    { href: "/tarifs", label: "Tarifs" },
  ],

  /** Bouton à droite de la navbar : unique point d'entrée vers le contact */
  cta: { href: "/contact", label: "Contact" },

  /** Destination du bouton principal (son texte est dans contenu/) */
  discoveryHref: "/contact",
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
