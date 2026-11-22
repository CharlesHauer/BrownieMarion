"use client";

import {
  type ComponentProps,
  type CSSProperties,
  useEffect,
  useRef,
} from "react";

/*
 * Apparition douce au scroll.
 * - Le contenu est visible par défaut (HTML serveur, sans JS, JS lent…).
 * - Après chargement, seuls les éléments situés SOUS l'écran sont masqués,
 *   puis révélés quand on les atteint : l'info visible n'attend jamais.
 * - Un seul IntersectionObserver partagé. Styles : globals.css ([data-reveal]).
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-shown", "");
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  return observer;
}

type RevealProps = ComponentProps<"div"> & {
  /** Délai en ms, pour faire apparaître des éléments en cascade */
  delay?: number;
};

export function Reveal({ delay = 0, style, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Déjà à l'écran (ou au-dessus) : on n'y touche pas.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.setAttribute("data-reveal", "");
    const obs = getObserver();
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      style={{ "--delay": `${delay}ms`, ...style } as CSSProperties}
      {...props}
    />
  );
}
