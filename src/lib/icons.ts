import {
  Brain,
  CalendarCheck,
  CreditCard,
  Dog,
  Flag,
  Footprints,
  GraduationCap,
  Heart,
  HeartHandshake,
  House,
  type LucideIcon,
  MapPin,
  PawPrint,
  RotateCcw,
  Search,
  Sparkles,
  Sprout,
  Star,
  Sun,
  Trees,
  Users,
} from "lucide-react";

/**
 * Icônes utilisables dans les fichiers du dossier contenu/ (champ « icone »).
 * Pour en ajouter une : https://lucide.dev/icons puis l'importer ici.
 * Penser à mettre à jour la liste dans contenu/00-LISEZ-MOI.md.
 */
export const icons = {
  chien: Dog,
  maison: House,
  pattes: Footprints,
  coeur: Heart,
  "poignee-de-main": HeartHandshake,
  cerveau: Brain,
  etincelles: Sparkles,
  pousse: Sprout,
  etoile: Star,
  soleil: Sun,
  arbres: Trees,
  groupe: Users,
  lieu: MapPin,
  "carte-bancaire": CreditCard,
  annulation: RotateCcw,
  calendrier: CalendarCheck,
  patte: PawPrint,
  drapeau: Flag,
  diplome: GraduationCap,
  loupe: Search,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as [IconName, ...IconName[]];
