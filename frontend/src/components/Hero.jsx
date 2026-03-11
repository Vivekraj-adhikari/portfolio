import NeuralCanvas from './NeuralCanvas'
import { useTypewriter } from '../hooks/useTypewriter'

// ─── Replace this path with your own photo ───────────────────────────────────
// e.g. import profileImg from '../assets/profile.jpg'
// and swap the <img src={...} /> below.
// For now we use a generated placeholder avatar.
const PLACEHOLDER_AVATAR = 'https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=mlportfolio&backgroundColor=0d1117'

const TYPEWRITER_TEXT =
  'Building intelligent systems that learn from data — from neural architecture design to production ML pipelines.'

const stats = [
  // ['3+', 'ML Projects'],
  // ['3+', 'Years Experience'],
  // ['4', 'Kaggle Medals'],
  // ['2', 'Published Papers'],
]

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_TEXT, 28)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden border-b border-white/5"
    >
      <NeuralCanvas />

      {/* ── Two-column layout ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 w-full pt-20 pb-12">
        <div className="flex flex-col-reverse md:flex-row items-center gap-16">

          {/* ── LEFT: Profile image ── */}
          <div className="flex-shrink-0 flex flex-col items-center gap-5">
            {/* Outer glow ring */}
            <div
              className="relative"
              style={{ filter: 'drop-shadow(0 0 24px rgba(0,255,136,0.25))' }}
            >
              {/* Rotating dashed border */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px dashed rgba(0,255,136,0.35)',
                  borderRadius: '50%',
                  animation: 'spin 18s linear infinite',
                  transform: 'scale(1.07)',
                }}
              />
              {/* Solid accent ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid rgba(0,255,136,0.15)',
                  borderRadius: '50%',
                  transform: 'scale(1.14)',
                }}
              />

              {/* Photo */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: '240px',
                  height: '240px',
                  borderRadius: '50%',
                  border: '2px solid rgba(0,255,136,0.4)',
                  background: '#0d1117',
                }}
              >
                <img
                  src={PLACEHOLDER_AVATAR}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* Subtle green tint overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(160deg, rgba(0,255,136,0.07) 0%, transparent 60%)',
                    borderRadius: '50%',
                  }}
                />
              </div>
            </div>

            {/* Status badge */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-sm"
              style={{
                background: 'rgba(0,255,136,0.07)',
                border: '1px solid rgba(0,255,136,0.2)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#00ff88',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                  display: 'inline-block',
                }}
              />
              <span
                className="font-mono text-[10px] tracking-widest"
                style={{ color: '#00ff88', letterSpacing: '0.12em' }}
              >
                OPEN TO WORK
              </span>
            </div>
          </div>

          {/* ── RIGHT: Text content ── */}
          <div className="flex-1 min-w-0">
            {/* Eyebrow label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] text-brand tracking-[0.2em]">
                MACHINE LEARNING ENGINEER
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-brand/40 to-transparent max-w-[120px]" />
            </div>

            {/* Headline */}
            <h1 className="font-serif text-[clamp(40px,6vw,82px)] leading-none text-gray-100 font-normal mb-6">
              Hello, I&apos;m
              <br />
              <span className="italic text-brand">Vivekraj.</span>
            </h1>

            {/* Typewriter */}
            <p className="font-mono text-[12px] text-white/40 max-w-[460px] leading-loose mb-10">
              {typed}
              <span className="cursor-blink text-brand">▌</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="font-mono text-[11px] tracking-[0.1em] px-7 py-3 bg-brand text-[#080b0f] font-bold rounded-sm hover:bg-[#00cc6a] transition-colors duration-200"
              >
                VIEW PROJECTS →
              </button>
              <a
                href="#"
                className="font-mono text-[11px] tracking-[0.1em] px-7 py-3 border border-white/15 text-white/50 rounded-sm hover:border-brand hover:text-brand transition-all duration-200"
              >
                DOWNLOAD CV
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 mt-14">
              {stats.map(([number, label]) => (
                <div key={label}>
                  <div className="font-serif text-[34px] italic text-brand leading-none">{number}</div>
                  <div className="font-mono text-[10px] tracking-[0.12em] text-white/30 mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: scale(1.07) rotate(0deg); }
          to   { transform: scale(1.07) rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
