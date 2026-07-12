import { Hero } from '../components/Hero'
import { profile } from '../data/profile'

const groupPhoto = `${import.meta.env.BASE_URL}group.jpeg`

export function Home() {
  return (
    <>
      <Hero />
      <section className="section">
        <a className="pi-row" href={profile.pi.url} target="_blank" rel="noreferrer">
          <img className="pi-photo" src={`${import.meta.env.BASE_URL}photo.png`} alt={profile.pi.name} />
          <div>
            <h2 className="pi-name">{profile.pi.name}</h2>
            <p className="pi-title">{profile.pi.title}</p>
            <p className="pi-bio">{profile.pi.bio[0]}</p>
          </div>
        </a>
      </section>
      <section className="section section-alt">
        <div className="pi-photo-grid">
          <img src={groupPhoto} alt="Research group" />
          <p>{profile.pi.bio[1]}</p>
        </div>
      </section>
    </>
  )
}
