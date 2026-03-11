import { useState, useEffect } from 'react'

const navLinks = ['Projects', 'Skills', 'About', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setActive(id.toLowerCase())
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/5 backdrop-blur-xl bg-[#080b0f]/90'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-8 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand animate-pulse-dot" />
          <span className="text-[11px] tracking-[0.15em] text-gray-100 font-mono">
            ML.PORTFOLIO
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`font-mono text-[11px] tracking-[0.12em] uppercase pb-1 border-b transition-all duration-200 ${
                active === link.toLowerCase()
                  ? 'text-brand border-brand'
                  : 'text-white/35 border-transparent hover:text-brand hover:border-brand'
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
