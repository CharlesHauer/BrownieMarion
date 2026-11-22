import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

const tones = {
  default: "",
  alt: "bg-surface-alt",
  dark: "bg-primary-900 text-primary-100 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white",
} as const;

type SectionProps = Omit<ComponentProps<"section">, "title"> & {
  eyebrow?: ReactNode;
  title?: ReactNode;
  intro?: ReactNode;
  /** "h1" pour le titre principal d'une page, "h2" sinon. */
  titleAs?: "h1" | "h2";
  tone?: keyof typeof tones;
  centered?: boolean;
};

export function Section({
  eyebrow,
  title,
  intro,
  titleAs: Heading = "h2",
  tone = "default",
  centered,
  className,
  children,
  ...props
}: SectionProps) {
  const hasHeader = eyebrow || title || intro;

  return (
    <section
      className={cn("py-16 sm:py-24", tones[tone], className)}
      {...props}
    >
      <Container>
        {hasHeader && (
          <Reveal
            className={cn(
              "mb-10 max-w-2xl sm:mb-14",
              centered && "mx-auto text-center",
            )}
          >
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <Heading
                className={cn(
                  Heading === "h1" ? "text-h1" : "text-h2",
                  eyebrow && "mt-3",
                )}
              >
                {title}
              </Heading>
            )}
            {intro && (
              <p
                className={cn(
                  "mt-4 text-lg",
                  tone === "dark" ? "text-primary-200" : "text-ink-muted",
                )}
              >
                {intro}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-accent-600 uppercase">
      <span className="h-px w-6 bg-current" aria-hidden />
      {children}
    </p>
  );
}
