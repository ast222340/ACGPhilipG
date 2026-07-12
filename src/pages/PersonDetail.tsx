import { Link, useParams } from 'react-router-dom'
import { IconArrowLeft } from '../components/Icons'
import { profile, type Person } from '../data/profile'
import { slugify } from '../utils/slug'

const CATEGORY_LABELS: Record<keyof typeof profile.team, string> = {
  postdoctoral: 'Postdoctoral',
  phd: 'Ph.D. Students',
  masters: 'M.S.(R) Student',
  projectStaff: 'Research Staff',
  visiting: 'Visiting',
  btechMinorProject: 'B.Tech. Students',
  alumni: 'Alumni',
  btechAlumni: 'B.Tech. Students (Alumni)',
}

const DETAIL_SECTIONS: {
  key: keyof Pick<
    Person,
    'aboutMe' | 'researchInterests' | 'education' | 'conferencePresentations' | 'skillsTools' | 'contact'
  >
  title: string
  empty: string
  type: 'prose' | 'list'
}[] = [
  { key: 'aboutMe', title: 'About Me', empty: 'Add a short introduction here.', type: 'prose' },
  { key: 'researchInterests', title: 'Research Interests', empty: 'Add research interests here.', type: 'list' },
  { key: 'education', title: 'Education', empty: 'Add educational background here.', type: 'list' },
  {
    key: 'conferencePresentations',
    title: 'Conference Presentations',
    empty: 'Add conference presentations here.',
    type: 'list',
  },
  { key: 'skillsTools', title: 'Skills & Tools', empty: 'Add relevant skills and tools here.', type: 'list' },
  { key: 'contact', title: 'Contact', empty: 'Add contact details here.', type: 'list' },
]

function initialsOf(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
}

function findPerson(slug: string): { person: Person; category: keyof typeof profile.team } | undefined {
  for (const key of Object.keys(profile.team) as (keyof typeof profile.team)[]) {
    const match = profile.team[key].find((person) => slugify(person.name) === slug)
    if (match) return { person: match, category: key }
  }
  return undefined
}

export function PersonDetail() {
  const { slug } = useParams<{ slug: string }>()
  const found = slug ? findPerson(slug) : undefined

  if (!found) {
    return (
      <section className="page-hero person-detail-hero">
        <Link className="back-link" to="/people">
          <IconArrowLeft className="icon-inline" />
          Back to Group Members
        </Link>
        <p className="eyebrow">Our Team</p>
        <h1>Person not found</h1>
        <p className="page-lead">We couldn&rsquo;t find that group member.</p>
      </section>
    )
  }

  const { person, category } = found

  return (
    <>
      <section className="page-hero person-detail-hero">
        <Link className="back-link" to="/people">
          <IconArrowLeft className="icon-inline" />
          Back to Group Members
        </Link>
        {person.photo ? (
          <img className="person-photo person-photo-lg" src={person.photo} alt={person.name} />
        ) : (
          <div className="person-avatar person-avatar-lg" aria-hidden="true">
            {initialsOf(person.name)}
          </div>
        )}
        <p className="eyebrow">{CATEGORY_LABELS[category]}</p>
        <h1>{person.name}</h1>
        <p className="page-lead">{person.role}</p>
      </section>
      <PersonDetailBody person={person} />
    </>
  )
}

function PersonDetailBody({ person }: { person: Person }) {
  return (
    <>
      {DETAIL_SECTIONS.map(({ key, title, empty, type }, i) => {
        const items = person[key]
        return (
          <section key={key} className={`section ${i % 2 === 0 ? '' : 'section-alt'}`}>
            <div className="section-head">
              <h2>{title}</h2>
            </div>
            <div className="page-content">
              {items && items.length > 0 ? (
                type === 'prose' ? (
                  items.map((paragraph, j) => <p key={j}>{paragraph}</p>)
                ) : (
                  <ul className="person-detail-list">
                    {items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )
              ) : (
                <p className="person-detail-empty">{empty}</p>
              )}
            </div>
          </section>
        )
      })}
    </>
  )
}
