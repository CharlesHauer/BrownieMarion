import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  interactive = true,
  ...props
}: ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-card bg-white p-6 shadow-sm ring-1 ring-primary-100 sm:p-8",
        interactive && "lift",
        className,
      )}
      {...props}
    />
  );
}
