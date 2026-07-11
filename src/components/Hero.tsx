import { useEffect, useState } from 'react'
import casLogo from '../cas.png'
import iitdLogo from '../IITD.svg'
import image1 from '../1.png'
import image3 from '../2.jpeg'

const STEP_DURATION = 5000
const FADE_DURATION = 900

const heroSteps = [
  { type: 'image', src: image1 },
  { type: 'image', src: image3 },
  { type: 'video', src: `${import.meta.env.BASE_URL}3.mp4` },
  { type: 'video', src: `${import.meta.env.BASE_URL}4.mp4` },
  { type: 'video', src: `${import.meta.env.BASE_URL}5.mp4` },
] as const

function HeroMedia({ index, fadeIn }: { index: number; fadeIn: boolean }) {
  const step = heroSteps[index]
  const className = `hero-media${fadeIn ? ' hero-media-enter' : ''}`

  if (step.type === 'image') {
    return <img className={className} src={step.src} alt="" aria-hidden="true" />
  }
  return <video className={className} src={step.src} autoPlay muted playsInline aria-hidden="true" />
}

export function Hero() {
  const [step, setStep] = useState(0)
  const [prevStep, setPrevStep] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevStep(step)
      setStep((current) => (current + 1) % heroSteps.length)
    }, STEP_DURATION)
    return () => clearTimeout(timer)
  }, [step])

  useEffect(() => {
    if (prevStep === null) return
    const timer = setTimeout(() => setPrevStep(null), FADE_DURATION)
    return () => clearTimeout(timer)
  }, [prevStep])

  return (
    <section id="top" className="hero">
      {prevStep !== null && <HeroMedia key={prevStep} index={prevStep} fadeIn={false} />}
      <HeroMedia key={step} index={step} fadeIn />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-inner">
        <img className="hero-logo" src={casLogo} alt="Centre for Atmospheric Sciences logo" />
        <div className="hero-text">
          <p className="eyebrow">Welcome</p>
          <h1>Atmospheric Chemistry Group</h1>
          <p className="hero-tagline">Centre for Atmospheric Sciences, IIT Delhi</p>
        </div>
        <img className="hero-logo" src={iitdLogo} alt="IIT Delhi logo" />
      </div>
    </section>
  )
}
