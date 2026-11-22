"use client";

import { useEffect, useState } from "react";
import { siteConfig, type ThemeId, themes } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Aperçu des thèmes en direct (page /charte uniquement).
 * Le thème d'origine est restauré en quittant la page.
 */
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>(siteConfig.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(
    () => () => {
      document.documentElement.dataset.theme = siteConfig.theme;
    },
    [],
  );

  return (
    <fieldset
      aria-label="Thème"
      className="inline-flex flex-wrap gap-1 rounded-full bg-white p-1 ring-1 ring-primary-100"
    >
      {themes.map((t) => (
        <button
          key={t.id}
          type="button"
          aria-pressed={theme === t.id}
          onClick={() => setTheme(t.id)}
          className={cn(
            "min-h-10 rounded-full px-5 text-sm font-semibold transition-colors",
            theme === t.id
              ? "bg-primary-600 text-white"
              : "text-ink-muted hover:bg-primary-50",
          )}
        >
          {t.label}
        </button>
      ))}
    </fieldset>
  );
}
