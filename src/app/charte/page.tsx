import { Dog } from "lucide-react";
import type { Metadata } from "next";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { Todo } from "@/components/ui/Todo";

export const metadata: Metadata = {
  title: "Charte graphique",
  robots: { index: false, follow: false },
};

const scales = [
  {
    name: "Primaire",
    token: "primary",
    steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  { name: "Accent", token: "accent", steps: [50, 100, 200, 500, 600, 700] },
];

const neutrals = [
  { name: "Surface", v: "--surface" },
  { name: "Surface alt.", v: "--surface-alt" },
  { name: "Texte", v: "--ink" },
  { name: "Texte secondaire", v: "--ink-muted" },
];

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-primary-200 py-10">
      <h2 className="mb-6 text-sm font-bold tracking-widest text-accent-600 uppercase font-sans">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function ChartePage() {
  return (
    <Section
      titleAs="h1"
      eyebrow="Prototype"
      title="Charte graphique"
      intro="Couleurs, typographies et composants du site. Changez de thème pour prévisualiser une variante sur tout le site."
    >
      <div className="sticky top-20 z-10 mb-10 lg:top-24">
        <ThemeSwitcher />
      </div>

      <Block title="Couleurs">
        <div className="space-y-6">
          {scales.map((scale) => (
            <div key={scale.token}>
              <p className="mb-2 font-semibold text-primary-900">
                {scale.name}
              </p>
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                {scale.steps.map((s) => (
                  <div key={s}>
                    <div
                      className="aspect-square rounded-xl ring-1 ring-black/5"
                      style={{ background: `var(--${scale.token}-${s})` }}
                    />
                    <p className="mt-1 text-center text-xs text-ink-muted">
                      {s}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {neutrals.map((n) => (
              <div
                key={n.v}
                className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-primary-100"
              >
                <span
                  className="size-10 shrink-0 rounded-lg ring-1 ring-black/10"
                  style={{ background: `var(${n.v})` }}
                />
                <span className="text-sm">
                  <span className="block font-semibold">{n.name}</span>
                  <code className="text-xs text-ink-muted">{n.v}</code>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Block>

      <Block title="Typographie">
        <div className="space-y-5">
          <p className="font-display text-display text-primary-900">Display</p>
          <p className="font-display text-h1 text-primary-900">Titre H1</p>
          <p className="font-display text-h2 text-primary-900">Titre H2</p>
          <p className="font-display text-xl text-primary-900">Titre H3</p>
          <p className="max-w-prose text-lg text-ink-muted">
            Texte d'introduction. Des méthodes positives et bienveillantes pour
            accompagner votre chien à chaque étape de sa vie.
          </p>
          <p className="max-w-prose">
            Texte courant. Les tailles des titres s'adaptent automatiquement à
            la largeur de l'écran.
          </p>
        </div>
      </Block>

      <Block title="Boutons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primaire</Button>
          <Button variant="secondary">Secondaire</Button>
          <Button variant="accent" arrow>
            Accent
          </Button>
          <ButtonLink href="/contact" arrow>
            Lien avec flèche
          </ButtonLink>
          <span className="rounded-full bg-primary-800 p-2">
            <Button variant="light">Sur fond sombre</Button>
          </span>
        </div>
      </Block>

      <Block title="Badges & textes à compléter">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Accent</Badge>
          <Badge tone="primary">Primaire</Badge>
          <Badge tone="solid">Le plus choisi</Badge>
          <span>
            Exemple : éducatrice depuis <Todo>X</Todo> ans
          </span>
        </div>
      </Block>

      <Block title="Cartes & photos">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <Dog className="size-7 text-accent-600" aria-hidden />
            <h3 className="mt-4 text-xl">Carte</h3>
            <p className="mt-2 text-ink-muted">Se soulève au survol.</p>
          </Card>
          <Photo alt="Exemple" hint="Zone photo à remplir" ratio="4/3" />
          <div className="rounded-card bg-primary-800 p-6 text-primary-100">
            <h3 className="text-xl text-white">Bloc sombre</h3>
            <p className="mt-2 text-sm">Pour les appels à l'action.</p>
          </div>
        </div>
      </Block>

      <Block title="Modifier la charte">
        <ul className="space-y-2 text-sm text-ink/85">
          <li>
            <code className="rounded bg-surface-alt px-1.5 py-0.5">
              src/styles/theme.css
            </code>{" "}
            : couleurs, arrondis, polices de chaque thème
          </li>
          <li>
            <code className="rounded bg-surface-alt px-1.5 py-0.5">
              src/config/site.ts
            </code>{" "}
            : thème actif (<code>theme</code>)
          </li>
          <li>
            <code className="rounded bg-surface-alt px-1.5 py-0.5">
              src/config/fonts.ts
            </code>{" "}
            : polices chargées
          </li>
        </ul>
      </Block>
    </Section>
  );
}
