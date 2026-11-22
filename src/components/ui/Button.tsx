import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-primary-600 text-white shadow-sm shadow-primary-900/20 hover:bg-primary-700",
  secondary:
    "bg-white text-primary-800 ring-1 ring-primary-200 hover:bg-primary-50",
  accent: "bg-accent-600 text-white hover:bg-accent-700",
  light: "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClasses(variant: ButtonVariant = "primary") {
  return cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold whitespace-nowrap transition-[background-color,box-shadow,scale] duration-200 active:scale-[0.98]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
  );
}

function Arrow() {
  return (
    <ArrowRight
      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  arrow?: boolean;
};

export function ButtonLink({
  variant,
  arrow,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonClasses(variant), className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  arrow?: boolean;
};

export function Button({
  variant,
  arrow,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonClasses(variant), className)}
      {...props}
    >
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
