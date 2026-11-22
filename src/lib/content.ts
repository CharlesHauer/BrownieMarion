/**
 * Lecture des textes du site depuis le dossier contenu/ (fichiers YAML).
 * Chaque fichier est vérifié : en cas d'erreur, un message en français
 * indique le fichier et le champ à corriger.
 *
 * Serveur uniquement (lecture de fichiers).
 */
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parse, YAMLParseError } from "yaml";
import { z } from "zod";
import { iconNames } from "./icons";

z.config(z.locales.fr());

const CONTENT_DIR = path.join(process.cwd(), "contenu");

// ---------- Types communs ----------

/** Texte obligatoire (les retours à la ligne superflus sont nettoyés) */
const text = z.string().trim().min(1);
/** Texte facultatif : vide → undefined */
const optionalText = z
  .string()
  .trim()
  .nullish()
  .transform((v) => v || undefined);
/** Nom de fichier photo → chemin public/images */
const photo = optionalText.transform((v) =>
  v ? `/images/${v.replace(/^\/?(images\/)?/, "")}` : undefined,
);
const icon = z.enum(iconNames);
/** oui / non (ou true / false) */
const yesNo = z
  .union([z.boolean(), z.enum(["oui", "non", "Oui", "Non"])])
  .nullish()
  .transform((v) => v === true || v === "oui" || v === "Oui");
const heading = z.object({ surtitre: optionalText, titre: text });

// ---------- Schémas des fichiers ----------

const infosSchema = z.object({
  nom: text,
  metier: text,
  nom_du_site: text,
  slogan: text,
  description_google: text,
  email: text,
  telephone: text,
  zone: text,
  horaires: optionalText,
  reseaux: z.object({
    instagram: optionalText,
    facebook: optionalText,
    tiktok: optionalText,
  }),
  bouton_principal: text,
  bandeau: z.object({ titre: text, texte: text }),
});

const accueilSchema = z.object({
  haut_de_page: z.object({
    surtitre: optionalText,
    titre: text,
    texte: text,
    photo,
    points_forts: z.array(z.object({ icone: icon, texte: text })),
    badge: z.object({ chiffre: text, texte: text }).nullish(),
  }),
  presentation: z.object({
    surtitre: optionalText,
    photo_1: photo,
    photo_2: photo,
    bouton: text,
  }),
  methode: heading.extend({ intro: optionalText }),
  prestations: heading,
  galerie: heading,
  avis: heading,
});

const aproposSchema = z.object({
  titre: text,
  presentation: text,
  photo_portrait: photo,
  chiffres: z.array(z.object({ chiffre: z.coerce.string(), texte: text })),
  parcours: heading.extend({ paragraphes: z.array(text) }),
  formations: z.object({ titre: text, liste: z.array(text) }),
  methode: heading,
  valeurs: z.array(z.object({ icone: icon, titre: text, texte: text })),
  photos: z.array(z.object({ photo, description: text })),
  bandeau_titre: optionalText,
});

const prestationsSchema = z.object({
  surtitre: optionalText,
  titre: text,
  intro: optionalText,
  liste: z.array(
    z.object({
      titre: text,
      icone: icon,
      resume: text,
      pour_qui: optionalText,
      etapes: z
        .array(text)
        .nullish()
        .transform((v) => v ?? []),
      photo,
      description_photo: optionalText,
    }),
  ),
});

const tarifsSchema = z.object({
  surtitre: optionalText,
  titre: text,
  intro: optionalText,
  formules: z.array(
    z.object({
      nom: text,
      prix: z.coerce.string(),
      detail_prix: optionalText,
      description: optionalText,
      inclus: z
        .array(text)
        .nullish()
        .transform((v) => v ?? []),
      mise_en_avant: yesNo,
    }),
  ),
  infos_pratiques: heading.extend({
    liste: z.array(z.object({ icone: icon, titre: text, texte: text })),
  }),
  faq: heading.extend({
    questions: z.array(z.object({ question: text, reponse: text })),
  }),
});

const avisSchema = z.object({
  avis: z.array(z.object({ texte: text, prenom: text, chien: optionalText })),
});

const ratios = { portrait: "3/4", paysage: "4/3", carre: "1/1" } as const;

const galerieSchema = z.object({
  surtitre: optionalText,
  titre: text,
  intro: optionalText,
  photos: z.array(
    z.object({
      photo,
      description: text,
      format: z
        .enum(["portrait", "paysage", "carre"])
        .default("paysage")
        .transform((f) => ratios[f]),
    }),
  ),
  instagram: z.object({ titre: text, bouton: text }),
});

const contactSchema = z.object({
  surtitre: optionalText,
  titre: text,
  intro: optionalText,
  reseaux: z.object({ titre: text, texte: optionalText }),
  formulaire: z.object({
    titre: text,
    confirmation_titre: text,
    confirmation_texte: text,
  }),
});

// ---------- Chargement ----------

function load<S extends z.ZodType>(file: string, schema: S): z.output<S> {
  const where = `contenu/${file}`;
  let raw: string;
  try {
    raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  } catch {
    throw new Error(`Fichier introuvable : ${where}`);
  }

  let data: unknown;
  try {
    data = parse(raw);
  } catch (e) {
    const line =
      e instanceof YAMLParseError && e.linePos
        ? ` (ligne ${e.linePos[0].line})`
        : "";
    throw new Error(
      `Erreur de mise en forme dans ${where}${line}.\n` +
        "Vérifiez les décalages en début de ligne et les deux-points ( : ).\n" +
        "Astuce : un texte qui contient « : » ou commence par [ doit être entre guillemets.",
    );
  }

  const result = schema.safeParse(data);
  if (!result.success) {
    const details = result.error.issues
      .map((i) => `  • ${i.path.join(" › ") || "(fichier)"} : ${i.message}`)
      .join("\n");
    throw new Error(`Erreur dans ${where} :\n${details}`);
  }
  return result.data;
}

// `cache` : chaque fichier n'est lu qu'une fois par affichage de page.
export const getInfos = cache(() =>
  load("01-infos-generales.yaml", infosSchema),
);
export const getAccueil = cache(() => load("02-accueil.yaml", accueilSchema));
export const getAPropos = cache(() => load("03-a-propos.yaml", aproposSchema));
export const getPrestations = cache(() =>
  load("04-prestations.yaml", prestationsSchema),
);
export const getTarifs = cache(() => load("05-tarifs.yaml", tarifsSchema));
export const getAvis = cache(() => load("06-avis-clients.yaml", avisSchema));
export const getGalerie = cache(() => load("07-galerie.yaml", galerieSchema));
export const getContact = cache(() => load("08-contact.yaml", contactSchema));

export type Infos = ReturnType<typeof getInfos>;
export type Prestation = ReturnType<typeof getPrestations>["liste"][number];
export type Formule = ReturnType<typeof getTarifs>["formules"][number];
export type Avis = ReturnType<typeof getAvis>["avis"][number];

/** Identifiant d'ancre à partir d'un titre : "Éducation du chiot" → "education-du-chiot" */
export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
