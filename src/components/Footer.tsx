import casLogo from '../cas.png'
import { profile } from '../data/profile'
import { IconArrowUp, IconGithub, IconLinkedin, IconMail, IconScholar, IconX } from './Icons'

const iconMap = {
  mail: IconMail,
  github: IconGithub,
  linkedin: IconLinkedin,
  scholar: IconScholar,
  x: IconX,
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img className="footer-logo" src={casLogo} alt="Centre for Atmospheric Sciences logo" />
          <div>
            <p className="footer-brand-name">Atmospheric Chemistry Group</p>
            <p className="footer-brand-detail">Centre for Atmospheric Sciences, IIT Delhi</p>
            <p className="footer-brand-detail">{profile.address}</p>
          </div>
        </div>
        <div className="footer-actions">
          <div className="footer-socials">
            {profile.socials.map((social) => {
              const Icon = iconMap[social.icon]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="footer-social"
                >
                  <Icon />
                </a>
              )
            })}
          </div>
          <button
            type="button"
            className="footer-top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <IconArrowUp />
          </button>
        </div>
      </div>
      <p className="footer-copyright">
        © {new Date().getFullYear()} Atmospheric Chemistry Group, IIT Delhi
      </p>
    </footer>
  )
}
