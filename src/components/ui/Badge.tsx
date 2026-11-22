import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const tones = {
  primary: "bg-primary-100 text-primary-800",
  accent: "bg-accent-100 text-accent-700",
  solid: "bg-accent-600 text-white",
} as const;

export function Badge({
  tone = "accent",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
