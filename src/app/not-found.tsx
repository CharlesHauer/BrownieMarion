import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl">Page introuvable</h1>
      <p className="mt-4 text-ink/75">
        Cette page s'est échappée comme un chien sans laisse…
      </p>
      <ButtonLink href="/" className="mt-8">
        Retour à l'accueil
      </ButtonLink>
    </Container>
  );
}
