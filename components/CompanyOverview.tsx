import type { Locale } from "../lib/content";
import { overview } from "../lib/overview";

export function CompanyOverview({ locale }: { locale: Locale }) {
  const copy = overview[locale];
  return (
    <>
      <section className="editorial section-shell" id="focus" aria-labelledby="focus-title">
        <nav className="overview-nav" aria-label={copy.nav.label}>
          <a href="#focus">{copy.nav.focus}</a>
          <a href="#projects">{copy.nav.projects}</a>
          <a href="#approach">{copy.nav.approach}</a>
          <a href="#contact">{copy.nav.contact}</a>
        </nav>
        <div className="editorial-heading">
          <div>
            <p className="eyebrow"><span>02</span>{copy.focus.eyebrow}</p>
            <h2 id="focus-title">{copy.focus.title}</h2>
          </div>
          <p className="editorial-intro">{copy.focus.intro}</p>
        </div>
        <div className="focus-grid">
          {copy.focus.cards.map((card, index) => (
            <article className="focus-card" key={card.title}>
              <span className="editorial-number" aria-hidden="true">0{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial section-shell" id="projects" aria-labelledby="projects-title">
        <div className="editorial-heading">
          <div>
            <p className="eyebrow"><span>03</span>{copy.projects.eyebrow}</p>
            <h2 id="projects-title">{copy.projects.title}</h2>
          </div>
          <p className="editorial-intro">{copy.projects.intro}</p>
        </div>
        <div className="project-grid">
          {copy.projects.items.map((project) => (
            <article className="project-card" id={project.id} key={project.id}>
              <p className="project-category">{project.category}</p>
              <h3>{project.name}</h3>
              <p className="project-title">{project.title}</p>
              <p className="project-body">{project.body}</p>
              <a className="editorial-link" href={project.href}>
                {project.linkLabel}<span aria-hidden="true">↗</span>
              </a>
              {project.note && <p className="project-note">{project.note}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="editorial section-shell" id="approach" aria-labelledby="approach-title">
        <div className="editorial-heading">
          <div>
            <p className="eyebrow"><span>04</span>{copy.approach.eyebrow}</p>
            <h2 id="approach-title">{copy.approach.title}</h2>
          </div>
          <p className="editorial-intro">{copy.approach.body}</p>
        </div>
        <ol className="approach-grid">
          {copy.approach.steps.map((step, index) => (
            <li key={step.title}>
              <span className="editorial-number" aria-hidden="true">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="editorial-invitation">
          <p>{copy.approach.invitation}</p>
          <a className="editorial-link" href="#contact">{copy.approach.action}<span aria-hidden="true">↘</span></a>
        </div>
      </section>
    </>
  );
}
