import { PageHeader } from '../components/PageHeader'
import { PersonCard } from '../components/PersonCard'
import { profile } from '../data/profile'

const categories: { key: keyof typeof profile.team; label: string }[] = [
  { key: 'postdoctoral', label: 'Postdoctoral' },
  { key: 'phd', label: 'Ph.D. Students' },
  { key: 'masters', label: 'M.S.(R) Student' },
  { key: 'projectStaff', label: 'Research Staff' },
  { key: 'visiting', label: 'Visiting' },
  { key: 'btechMinorProject', label: 'B.Tech. Students' },
]

export function People() {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Group Members"
        lead={`Motivated researchers and students are welcome to join our group for Postdoc, Ph.D., M. Tech. (PG), and B. Tech. (UG) research. Please write to me (philipsajeev "at" iitd "dot" ac "dot" in) if you are interested in our research.`}
      />
      {categories.map(({ key, label }, i) => {
        const members = profile.team[key]
        if (members.length === 0) return null
        return (
          <section key={key} className={`section ${i % 2 === 0 ? '' : 'section-alt'}`}>
            <div className="section-head">
              <h2>{label}</h2>
            </div>
            <div className="people-grid">
              {members.map((person, j) => (
                <PersonCard key={person.name} index={j} person={person} />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
