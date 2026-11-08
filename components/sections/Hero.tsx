import Image from "next/image";
import { Building2, Download, Mail, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/icons/BrandIcons";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { contact, profile, socials } from "@/data/profile";
import { capabilities } from "@/data/skills";

export function Hero() {
  const heroSocials = socials.filter((s) => s.key === "github" || s.key === "linkedin");

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x grid items-center gap-14 pb-20 pt-14 md:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28">
        <div className="anim-rise">
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="tracking-[0.3em] text-fg">IBRAHYBRID</span>
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} aria-hidden="true" /> {profile.location}
            </span>
          </p>

          <h1 id="hero-title" className="mt-7">
            <span className="block font-display text-lg font-medium text-fg md:text-xl">{profile.name}</span>
            <span className="mt-4 block font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.25rem]">
              Engineering Ideas into <span className="text-gradient">Intelligent Systems.</span>
            </span>
          </h1>

          <p className="mt-5 font-mono text-sm text-muted">
            {profile.roles.join(" · ")}
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/#work">Explore My Work</ButtonLink>
            <ButtonLink href="/#contact" variant="ghost">
              Let&apos;s Collaborate
            </ButtonLink>
            {profile.cv && (
              <a
                href={profile.cv}
                download
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-muted hover:text-fg"
              >
                <Download size={16} aria-hidden="true" /> Download CV
              </a>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-sm">
            <a
              href={profile.founderOf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted hover:text-fg"
            >
              <Building2 size={15} aria-hidden="true" />
              Founder of <span className="text-fg">{profile.founderOf.name}</span>
            </a>
            <span className="hidden h-4 w-px bg-line-strong sm:block" aria-hidden="true" />
            <div className="flex items-center gap-1">
              {heroSocials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} profile`}
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  <SocialIcon name={s.key} size={17} />
                </a>
              ))}
              <a
                href={`mailto:${contact.email}`}
                aria-label={`Email ${contact.email}`}
                className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <Mail size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="anim-rise [animation-delay:150ms]">
          {profile.portrait ? (
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-line">
              <Image src={profile.portrait} alt={`Portrait of ${profile.name}`} fill priority sizes="(min-width: 1024px) 24rem, 80vw" className="object-cover" />
            </div>
          ) : (
            <HeroVisual />
          )}
          <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Core capabilities">
            {capabilities.map((c) => (
              <li
                key={c}
                className="rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
