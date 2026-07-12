import { IconArrowUpRight } from '../components/Icons'
import { PageHeader } from '../components/PageHeader'
import { profile, type HighlightItem } from '../data/profile'
import { useInView } from '../hooks/useInView'

function resolveImage(src: string) {
  return src.startsWith('http') ? src : `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`
}

function HighlightCard({ index, highlight }: { index: number; highlight: HighlightItem }) {
  const { ref, inView } = useInView<HTMLElement>()

  const text = (
    <>
      <div className="award-head">
        <h3>{highlight.title}</h3>
        <span className="award-year">{highlight.date}</span>
      </div>
      {highlight.description && <p className="award-desc">{highlight.description}</p>}
      {highlight.href && (
        <span className="pub-links">
          Read more
          <IconArrowUpRight className="icon-inline" />
        </span>
      )}
    </>
  )

  const inner = highlight.image ? (
    <>
      <img className="highlight-img" src={resolveImage(highlight.image)} alt="" loading="lazy" />
      <div className="highlight-body">{text}</div>
    </>
  ) : (
    text
  )

  return (
    <article
      ref={ref}
      className={`award-card highlight-card ${highlight.image ? 'has-image' : ''} reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      {highlight.href ? (
        <a className="highlight-link" href={highlight.href} target="_blank" rel="noreferrer">
          {inner}
        </a>
      ) : (
        <div className="highlight-link">{inner}</div>
      )}
    </article>
  )
}

export function Highlights() {
  return (
    <>
      <PageHeader
        eyebrow="Highlights"
        title="Highlights"
        lead="Recent achievements, media mentions, and milestones."
        image={resolveImage('/map.png')}
      />
      <section className="section">
        <div className="award-grid highlight-grid">
          {profile.highlights.map((highlight, i) => (
            <HighlightCard key={highlight.title} index={i} highlight={highlight} />
          ))}
        </div>
      </section>
    </>
  )
}
