import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import Projects    from './components/Projects'
import Skills      from './components/Skills'
import About       from './components/About'
import Contact     from './components/Contact'
import Footer      from './components/Footer'
import ProjectPage from './pages/ProjectPage'

// ── Portfolio home ─────────────────────────────────────────────────────────────
function Home() {
  return (
    <div style={{ background: '#080b0f', minHeight: '100vh', color: '#e0e0e0' }}>
      <div className="fixed inset-0 pointer-events-none z-50" style={{
        background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)',
      }} />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

// ── Root with router ───────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                    element={<Home />} />
        <Route path="/project/:slug"       element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  )
}
