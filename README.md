# Site vitrine – Marion, éducatrice canine (prototype)

## Stack

- **Next.js 16** (App Router, Turbopack, React Compiler) avec **React 19**
- **TypeScript**
- **Tailwind CSS v4** : la charte graphique est pilotée par des variables CSS
- **Biome** : lint et formatage
- **lucide-react** (icônes), **clsx** et **tailwind-merge** (helper `cn`)
- **Node 24 LTS** (épinglé dans `.node-version` ; avec fnm : `fnm use`)

## Démarrage

```bash
fnm use                      # Node 24
npm install
cp .env.example .env.local   # puis renseigner l'URL du site
npm run dev                  # http://localhost:3000
```

| Script              | Rôle                          |
| ------------------- | ----------------------------- |
| `npm run dev`       | Serveur de développement      |
| `npm run build`     | Build de production           |
| `npm run start`     | Lancer le build de production |
| `npm run lint`      | Vérification Biome            |
| `npm run format`    | Correction et formatage Biome |
| `npm run typecheck` | Vérification TypeScript       |

## Pages

Accueil · À propos · Prestations · Galerie · Tarifs · Contact, plus `/charte` : la charte graphique, avec un aperçu en direct des thèmes. Cette page est exclue du référencement.

## Modifier les textes (pour Marion)

Tous les textes du site sont dans le dossier **`contenu/`**, en fichiers YAML nommés par page (`01-infos-generales.yaml`, `02-accueil.yaml`…). Le guide **[`contenu/00-LISEZ-MOI.md`](contenu/00-LISEZ-MOI.md)** explique comment les modifier sans connaissances techniques. Les photos vont dans `public/images/`.

Chaque fichier est vérifié par `src/lib/content.ts` (avec Zod) : une erreur affiche le fichier et le champ à corriger, en français.

## Modifier le design (développeur)

| Quoi                                  | Où                         |
| ------------------------------------- | -------------------------- |
| Couleurs, arrondis, polices par thème | `src/styles/theme.css`     |
| Thème actif, menu, URL                | `src/config/site.ts`       |
| Polices chargées                      | `src/config/fonts.ts`      |
| Icônes utilisables dans `contenu/`    | `src/lib/icons.ts`         |

Conventions du prototype : `[[texte]]` = texte à compléter (surligné en jaune) ; `<Photo>` sans image = zone « Photo à insérer » ; `TODO` dans le code = reste à finaliser (ex. envoi du formulaire dans `src/app/contact/actions.ts`).

## Structure

```
src/
├── app/                 # Routes (1 dossier = 1 page)
│   ├── layout.tsx       # Polices, thème, header, footer, transitions de page
│   ├── globals.css      # Tailwind et liaison des tokens, effets
│   └── contact/         # Page, formulaire (client) et Server Action
├── components/
│   ├── layout/          # Header, menu mobile, barre d'action mobile, footer
│   ├── ui/              # Button, Card, Section, Photo, Reveal, Todo, Badge…
│   └── icons/           # Logos des réseaux sociaux
├── config/              # site.ts, fonts.ts
├── styles/theme.css     # Charte graphique
└── lib/                 # content.ts (lecture de contenu/), icons.ts, cn.ts
contenu/                 # Textes du site (YAML) + guide pour Marion
```
