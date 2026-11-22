import { Camera } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type PhotoProps = {
  /** Chemin de l'image (ex : "/images/marion.jpg"). Vide = zone à remplir. */
  src?: string;
  alt: string;
  /** Consigne affichée tant qu'il n'y a pas d'image */
  hint?: string;
  /** Ratio CSS, ex : "4/5", "16/9", "1/1" */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Photo responsive. Sans `src`, affiche une zone indiquant quelle image
 * insérer : il suffit ensuite de déposer le fichier dans public/images
 * et de renseigner `src`.
 */
export function Photo({
  src,
  alt,
  hint,
  ratio = "4/3",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  className,
}: PhotoProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-card bg-primary-100",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-primary-300 p-4 text-center text-primary-600"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0 14px, color-mix(in oklab, var(--primary-200) 35%, transparent) 14px 15px)",
          }}
        >
          <Camera
            className="size-8 transition-transform duration-500 group-hover:scale-110"
            aria-hidden
          />
          <span className="text-sm font-bold">Photo à insérer</span>
          {hint && (
            <span className="max-w-60 text-xs text-primary-500">{hint}</span>
          )}
        </div>
      )}
    </div>
  );
}
