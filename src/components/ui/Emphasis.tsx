/**
 * Affiche un titre où les mots entre *étoiles* sont mis en valeur :
 * écriture manuscrite + couleur d'accent + trait de pinceau (comme le flyer).
 */
export function Emphasis({ text }: { text: string }) {
  return text.split(/\*(.+?)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={`mot-${part}`}
        className="relative inline-block font-script text-[1.12em] leading-none font-bold text-accent-600"
      >
        {part}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
          className="absolute -bottom-1.5 left-0 h-2.5 w-full text-accent-500/70"
        >
          <path
            d="M2 9C50 3 150 2 198 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </span>
    ) : (
      part
    ),
  );
}
