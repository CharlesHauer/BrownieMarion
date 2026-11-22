import { Fragment, type ReactNode } from "react";

/** Texte à compléter, surligné pour être repéré facilement dans le prototype. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <mark
      title="Texte à compléter"
      className="rounded-sm bg-amber-200/90 px-1 text-amber-950 [box-decoration-break:clone]"
    >
      [{children}]
    </mark>
  );
}

/**
 * Affiche une chaîne en transformant chaque [[…]] en <Todo>.
 * Ex : "Éducatrice depuis [[X]] ans" → Éducatrice depuis [X] ans (surligné)
 */
export function Fill({ text }: { text: string }) {
  const parts = text.split(/\[\[(.+?)\]\]/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: ordre fixe
          <Todo key={i}>{part}</Todo>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: ordre fixe
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
