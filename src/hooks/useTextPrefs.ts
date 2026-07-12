import { useEffect, useState } from 'react'

type FontSize = 'medium' | 'big'

const BOLD_KEY = 'text-bold'
const FONT_SIZE_KEY = 'text-size'

function getInitialBold(): boolean {
  return window.localStorage.getItem(BOLD_KEY) === 'on'
}

function getInitialFontSize(): FontSize {
  return window.localStorage.getItem(FONT_SIZE_KEY) === 'big' ? 'big' : 'medium'
}

export function useTextPrefs() {
  const [bold, setBold] = useState<boolean>(getInitialBold)
  const [fontSize, setFontSize] = useState<FontSize>(getInitialFontSize)

  useEffect(() => {
    document.documentElement.setAttribute('data-bold', bold ? 'on' : 'off')
    window.localStorage.setItem(BOLD_KEY, bold ? 'on' : 'off')
  }, [bold])

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize)
    window.localStorage.setItem(FONT_SIZE_KEY, fontSize)
  }, [fontSize])

  const toggleBold = () => setBold((current) => !current)
  const toggleFontSize = () => setFontSize((current) => (current === 'medium' ? 'big' : 'medium'))

  return { bold, toggleBold, fontSize, toggleFontSize }
}
