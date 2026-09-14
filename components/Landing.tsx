import type { Locale } from "../lib/content";
import { content } from "../lib/content";
import { SystemCore } from "./SystemCore";

const localeLinks: { locale: Locale; label: string; href: string }[] = [
  { locale: "kk", label: "ҚАЗ", href: "/" },
  { locale: "ru", label: "РУС", href: "/ru" },
  { locale: "en", label: "ENG", href: "/en" },
];

function Mark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /></span>;
}

export function Landing({ locale }: { locale: Locale }) {
  const copy = content[locale];

  return (
    <div className="site" lang={locale}>
      <a className="skip-link" href="#main">{copy.skip}</a>

      <header className="site-header">
        <a className="brand" href={locale === "kk" ? "/" : `/${locale}`} aria-label="Barfin Network Limited">
          <Mark />
          <span>BARFIN</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#services">{copy.nav.services}</a>
          <a href="#method">{copy.nav.method}</a>
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
        <section className="hero section-shell">
          <div className="hero-grid" />
          <div className="hero-copy">
            <p className="eyebrow"><span>00</span>{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}<br /><em>{copy.hero.titleAccent}</em></h1>
            <p className="hero-lede">{copy.hero.body}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="mailto:info@barfin.org?subject=Project%20inquiry%20%E2%80%94%20Barfin">{copy.hero.primary}<span>↗</span></a>
              <a className="button button-ghost" href="#method">{copy.hero.secondary}<span>↓</span></a>
            </div>
            <dl className="telemetry">
              {copy.hero.telemetry.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </div>
          <div className="hero-visual">
            <SystemCore label={copy.hero.systemLabel} live={copy.hero.live} />
          </div>
          <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
        </section>

        <section className="services section-shell" id="services">
          <div className="section-heading">
            <p className="eyebrow"><span>{copy.services.eyebrow.split(" · ")[0]}</span>{copy.services.eyebrow.split(" · ")[1]}</p>
            <h2>{copy.services.title}</h2>
            <p>{copy.services.body}</p>
          </div>
          <div className="service-grid">
            {copy.services.items.map((item) => (
              <article className="service-card" key={item.number}>
                <div className="service-number">{item.number}</div>
                <div className="service-symbol" aria-hidden="true"><i /><i /><i /></div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="method section-shell" id="method">
          <div className="method-visual" aria-hidden="true">
            <div className="signal-map">
              <span className="signal-line line-a" /><span className="signal-line line-b" /><span className="signal-line line-c" />
              <i className="signal-node node-a" /><i className="signal-node node-b" /><i className="signal-node node-c" /><i className="signal-node node-d" />
              <div className="signal-center"><span>BARFIN</span><small>SYSTEM MAP</small></div>
            </div>
          </div>
          <div className="method-copy">
            <p className="eyebrow"><span>{copy.method.eyebrow.split(" · ")[0]}</span>{copy.method.eyebrow.split(" · ")[1]}</p>
            <h2>{copy.method.title}</h2>
            <p className="method-lede">{copy.method.body}</p>
            <ol className="steps">
              {copy.method.steps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="company section-shell" id="company">
          <div className="company-intro">
            <p className="eyebrow"><span>{copy.company.eyebrow.split(" · ")[0]}</span>{copy.company.eyebrow.split(" · ")[1]}</p>
            <blockquote>“{copy.company.quote}”</blockquote>
          </div>
          <div className="company-detail">
            <p>{copy.company.body}</p>
            <dl className="facts">
              {copy.company.facts.map((fact) => <div key={fact.label}><dt>{fact.value}</dt><dd>{fact.label}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className="contact section-shell" id="contact">
          <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
          <div className="contact-copy">
            <p className="eyebrow"><span>{copy.contact.eyebrow.split(" · ")[0]}</span>{copy.contact.eyebrow.split(" · ")[1]}</p>
            <h2>{copy.contact.title}</h2>
            <p>{copy.contact.body}</p>
            <a className="email-link" href="mailto:info@barfin.org?subject=Project%20inquiry%20%E2%80%94%20Barfin">{copy.contact.action}<span>↗</span></a>
            <small>{copy.contact.response}</small>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-brand"><Mark /><strong>BARFIN</strong><span>{copy.footer.descriptor}</span></div>
        <div className="footer-meta"><span>Barfin Network Limited</span><span>{copy.footer.registration}</span><span>{copy.footer.location}</span></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Barfin Network Limited</span><a href="mailto:info@barfin.org">info@barfin.org</a></div>
      </footer>
    </div>
  );
}
