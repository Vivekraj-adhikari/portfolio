import { useState, useEffect } from 'react'

export function useTypewriter(text, speed = 40) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return displayed
}
