import Image from "next/image";
import type { Locale } from "../lib/content";
import { content } from "../lib/content";
import { ContactForm } from "./ContactForm";

const localeLinks: { locale: Locale; label: string; href: string }[] = [
  { locale: "kk", label: "ҚАЗ", href: "/" },
  { locale: "ru", label: "РУС", href: "/ru" },
  { locale: "en", label: "ENG", href: "/en" },
];

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <Image src="/barfin-bear.svg" alt="" width={42} height={42} priority />
    </span>
  );
}

function BrandName() {
  return (
    <span className="brand-name">
      <strong>BARFIN</strong>
      <small>NETWORK LIMITED</small>
    </span>
  );
}

export function Landing({ locale }: { locale: Locale }) {
  const copy = content[locale];

  return (
    <div className="site" lang={locale}>
      <a className="skip-link" href="#main">{copy.skip}</a>

      <header className="site-header">
        <a className="brand" href={locale === "kk" ? "/" : `/${locale}`} aria-label="Barfin Network Limited">
          <Mark />
          <BrandName />
        </a>

        <nav className="site-nav" aria-label={copy.nav.label}>
          <a href="#company">{copy.nav.company}</a>
          <a href="#contact">{copy.nav.contact}</a>
        </nav>

        <div className="language-switch" aria-label="Language">
          {localeLinks.map((item) => (
            <a key={item.locale} href={item.href} aria-current={locale === item.locale ? "page" : undefined}>{item.label}</a>
          ))}
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <Image className="hero-image" src="/hero-architecture.jpg" alt={copy.hero.imageAlt} fill priority sizes="100vw" />
          <div className="hero-shade" />
          <div className="hero-copy section-shell">
            <p className="eyebrow"><span>00</span>{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}<br /><em>{copy.hero.titleAccent}</em></h1>
            <p className="hero-lede">{copy.hero.body}</p>
            <a className="button button-primary" href="#contact">{copy.hero.action}<span>↘</span></a>
          </div>
          <div className="hero-foot section-shell" aria-hidden="true">
            <span>51.13° N · 71.43° E</span>
            <span>{copy.hero.scroll} ↓</span>
          </div>
        </section>

        <section className="manifest section-shell" id="company">
          <figure className="manifest-visual">
            <Image src="/evolving-system.jpg" alt={copy.manifest.imageAlt} fill sizes="(max-width: 760px) 100vw, 48vw" />
            <figcaption>BARFIN · FIELD NOTE 01</figcaption>
          </figure>

          <div className="manifest-copy">
            <p className="eyebrow"><span>01</span>{copy.manifest.eyebrow}</p>
            <h2>{copy.manifest.title}</h2>
            <p>{copy.manifest.body}</p>
            <div className="manifest-note"><i />{copy.manifest.note}</div>
          </div>
        </section>

        <section className="contact section-shell" id="contact">
          <div className="contact-heading">
            <p className="eyebrow"><span>02</span>{copy.contact.eyebrow}</p>
            <h2>{copy.contact.title}</h2>
            <p>{copy.contact.body}</p>
          </div>
          <ContactForm locale={locale} copy={copy.contact} />
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-brand"><Mark /><BrandName /></div>
        <p>{copy.footer.descriptor}</p>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Barfin Network Limited</span>
          <span>{copy.footer.registration}</span>
          <span>{copy.footer.location}</span>
        </div>
      </footer>
    </div>
  );
}
