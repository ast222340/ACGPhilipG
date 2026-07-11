import { Hero } from '../components/Hero'
import { profile } from '../data/profile'
import groupPhoto from '../group.jpeg'

export function Home() {
  return (
    <>
      <Hero />
      <section className="section">
        <div className="pi-row">
          <div className="pi-photo-placeholder">Coming soon</div>
          <div>
            <h2 className="pi-name">{profile.pi.name}</h2>
            <p className="pi-title">{profile.pi.title}</p>
            <p className="pi-bio">{profile.pi.bio[0]}</p>
          </div>
        </div>
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
