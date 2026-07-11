import { PageHeader } from '../components/PageHeader'
import { PersonCard } from '../components/PersonCard'
import { profile } from '../data/profile'

export function AlumniList() {
  return (
    <>
      <PageHeader eyebrow="Group Info" title="Alumni List & Map" lead="Where our alumni are now." />
      <section className="section">
        <div className="section-head">
          <h2>Alumni</h2>
        </div>
        <div className="people-grid">
          {profile.team.alumni.map((person, i) => (
            <PersonCard key={person.name} index={i} person={person} />
          ))}
        </div>
      </section>
      <section className="section section-alt">
        <div className="section-head">
          <h2>B. Tech. Students</h2>
          <p className="section-note">Completed: Non-Graded Unit (NGU) Minor Design Project</p>
        </div>
        <div className="people-grid">
          {profile.team.btechAlumni.map((person, i) => (
            <PersonCard key={person.name} index={i} person={person} />
          ))}
        </div>
      </section>
    </>
  )
}
