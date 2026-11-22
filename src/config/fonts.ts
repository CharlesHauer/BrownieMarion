/**
 * Polices du site (auto-hébergées par next/font, aucune requête vers Google).
 * Le choix titre/texte par thème se fait dans src/styles/theme.css
 * via --font-heading et --font-body.
 */
import { Fraunces, Nunito, Outfit } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// Utilisée seulement par le thème "épuré" : pas de préchargement.
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: false,
});

export const fontVariables = [nunito, fraunces, outfit]
  .map((font) => font.variable)
  .join(" ");
