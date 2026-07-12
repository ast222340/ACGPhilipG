import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTextPrefs } from '../hooks/useTextPrefs'
import { useTheme } from '../hooks/useTheme'
import { IconChevronDown, IconClose, IconMenu, IconMoon, IconSun } from './Icons'

const casLogo = `${import.meta.env.BASE_URL}cas.png`

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/research', label: 'Research' },
  { to: '/publications', label: 'Publications' },
  { to: '/presentation', label: 'Presentation' },
  { to: '/people', label: 'People' },
  { to: 'https://geoschem.github.io/', label: 'GEOS-chem', external: true },
  { to: '/highlights', label: 'Highlights' },
]

const groupInfoLinks = [
  { to: '/group-info/meeting', label: 'Group Meeting' },
  { to: '/group-info/seminars', label: 'Seminars' },
  { to: '/group-info/alumni', label: 'Alumni List & Map' },
  { to: '/gallery', label: 'Group Photos' },
  { to: '/group-info/faq', label: 'FAQ for PhD Applicants' },
  { to: '/group-info/contact', label: 'Contact Us' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [groupOpen, setGroupOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { bold, toggleBold, fontSize, toggleFontSize } = useTextPrefs()

  const closeAll = () => {
    setOpen(false)
    setGroupOpen(false)
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-brand" onClick={closeAll}>
          <img className="nav-brand-logo" src={casLogo} alt="" aria-hidden="true" />
          <span className="nav-brand-name">ACG</span>
        </Link>
        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          {navLinks.map((link) =>
            link.external ? (
              <a key={link.to} href={link.to} target="_blank" rel="noreferrer" onClick={closeAll}>
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={closeAll}
              >
                {link.label}
              </NavLink>
            ),
          )}
          <div className={`nav-dropdown ${groupOpen ? 'is-open' : ''}`}>
            <div className="nav-dropdown-trigger">
              <NavLink
                to="/group-info"
                end
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={closeAll}
              >
                Group info
              </NavLink>
              <button
                type="button"
                className="nav-dropdown-toggle"
                aria-expanded={groupOpen}
                aria-label={groupOpen ? 'Collapse Group info menu' : 'Expand Group info menu'}
                onClick={() => setGroupOpen((v) => !v)}
              >
                <IconChevronDown />
              </button>
            </div>
            <div className="nav-dropdown-panel">
              {groupInfoLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={closeAll}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
        <div className="nav-controls">
          <button
            type="button"
            className="nav-text-toggle"
            aria-pressed={bold}
            aria-label={bold ? 'Turn off bold text' : 'Turn on bold text'}
            onClick={toggleBold}
          >
            B
          </button>
          <button
            type="button"
            className="nav-text-toggle"
            aria-pressed={fontSize === 'big'}
            aria-label={fontSize === 'big' ? 'Switch to medium text size' : 'Switch to big text size'}
            onClick={toggleFontSize}
          >
            A+
          </button>
          <button
            type="button"
            className="nav-theme-toggle"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>
  )
}
