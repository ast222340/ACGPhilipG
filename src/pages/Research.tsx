import { PageHeader } from '../components/PageHeader'
import { profile, type PresentationEntry } from '../data/profile'
import { useInView } from '../hooks/useInView'

const headerImage = `${import.meta.env.BASE_URL}research.png`

function ResearchCard({
  index,
  title,
  description,
}: {
  index: number
  title: string
  description: string | string[]
}) {
  const { ref, inView } = useInView<HTMLElement>()
  const paragraphs = Array.isArray(description) ? description : [description]
  return (
    <article
      ref={ref}
      className={`research-card reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <h3>{title}</h3>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </article>
  )
}

function ProjectCard({ index, item }: { index: number; item: PresentationEntry }) {
  const { ref, inView } = useInView<HTMLElement>()
  return (
    <article
      ref={ref}
      className={`award-card reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${(index % 6) * 70}ms` }}
    >
      <h3>{item.title}</h3>
      {item.authors && <p className="pub-authors">{item.authors}</p>}
      <p className="award-desc">{item.detail}</p>
    </article>
  )
}

export function Research() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Research"
        lead="Core themes and questions driving the work."
        image={headerImage}
      />
      <section className="section">
        <div className="research-grid">
          {profile.researchThemes.map((theme, i) => (
            <ResearchCard key={theme.title} index={i} title={theme.title} description={theme.description} />
          ))}
        </div>
      </section>
      <section className="section section-alt">
        <div className="section-head">
          <h2>Research Projects / Consultancies</h2>
        </div>
        <div className="award-grid project-grid">
          {profile.researchProjects.map((item, i) => (
            <ProjectCard key={item.title} index={i} item={item} />
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <h2>Completed Research Projects / Consultancies</h2>
        </div>
        <div className="award-grid project-grid">
          {profile.completedResearchProjects.map((item, i) => (
            <ProjectCard key={item.title} index={i} item={item} />
          ))}
        </div>
      </section>
    </>
  )
}
