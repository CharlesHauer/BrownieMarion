import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getSocialLinks, socialMeta } from "@/components/icons/Social";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Fill } from "@/components/ui/Todo";
import { getContact, getInfos, getPrestations, telHref } from "@/lib/content";
import { ContactForm } from "./ContactForm";

export function generateMetadata(): Metadata {
  const { intro } = getContact();
  return { title: "Contact", description: intro };
}

export default function ContactPage() {
  const infos = getInfos();
  const page = getContact();
  const socials = getSocialLinks(infos.reseaux);
  const services = getPrestations().liste.map((s) => s.titre);

  const channels = [
    {
      icon: Phone,
      label: "Téléphone",
      value: infos.telephone,
      href: telHref(infos.telephone),
    },
    {
      icon: Mail,
      label: "Email",
      value: infos.email,
      href: `mailto:${infos.email}`,
    },
    { icon: MapPin, label: "Zone d'intervention", value: infos.zone },
    ...(infos.horaires
      ? [{ icon: Clock, label: "Disponibilités", value: infos.horaires }]
      : []),
  ];

  return (
    <Section
      titleAs="h1"
      eyebrow={page.surtitre}
      title={page.titre}
      intro={page.intro && <Fill text={page.intro} />}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <div className="space-y-4">
          {channels.map(({ icon: Icon, label, value, href }, i) => {
            const content = (
              <>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-700 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-ink-muted">{label}</span>
                  <span className="block truncate font-semibold text-primary-900">
                    <Fill text={value} />
                  </span>
                </span>
              </>
            );
            return (
              <Reveal key={label} delay={i * 60}>
                {href ? (
                  <a
                    href={href}
                    className="lift group flex items-center gap-4 rounded-card bg-white p-5 ring-1 ring-primary-100"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-card bg-white p-5 ring-1 ring-primary-100">
                    {content}
                  </div>
                )}
              </Reveal>
            );
          })}

          {socials.length > 0 && (
            <Reveal delay={260} className="rounded-card bg-primary-800 p-6">
              <p className="font-display text-xl text-white">
                {page.reseaux.titre}
              </p>
              {page.reseaux.texte && (
                <p className="mt-1 text-sm text-primary-200">
                  {page.reseaux.texte}
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                {socials.map(({ key, href }) => {
                  const { Icon, label } = socialMeta[key];
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-accent-600"
                    >
                      <Icon className="size-4" />
                      {label}
                    </a>
                  );
                })}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={120}>
          <Card interactive={false} className="sm:p-10">
            <h2 className="text-2xl">{page.formulaire.titre}</h2>
            <p className="mt-2 mb-8 text-sm text-ink-muted">
              Les champs sans mention sont obligatoires.
            </p>
            <ContactForm
              services={services}
              confirmation={{
                title: page.formulaire.confirmation_titre,
                text: page.formulaire.confirmation_texte,
              }}
            />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
