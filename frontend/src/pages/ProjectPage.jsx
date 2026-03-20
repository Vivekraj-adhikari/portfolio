import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import projects, { TAG_COLORS } from '../data/projects'
import DemoField from '../components/DemoField'
import DemoOutput from '../components/DemoOutput'

// ─── tiny spinner ──────────────────────────────────────────────────────────────
function Spinner({ color }) {
  return (
    <span style={{
      display: 'inline-block',
      width: '14px',
      height: '14px',
      border: `2px solid ${color}44`,
      borderTopColor: color,
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
      verticalAlign: 'middle',
    }} />
  )
}

// ─── status strip ─────────────────────────────────────────────────────────────
function StatusBar({ status, message, color }) {
  const cfg = {
    idle: { bg: 'rgba(255,255,255,0.03)', text: 'rgba(255,255,255,0.25)', icon: '○' },
    loading: { bg: `${color}0d`, text: color, icon: null },
    success: { bg: 'rgba(0,255,136,0.06)', text: '#00ff88', icon: '✓' },
    error: { bg: 'rgba(255,107,107,0.08)', text: '#ff6b6b', icon: '✕' },
  }
  const c = cfg[status] || cfg.idle

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 14px',
      background: c.bg,
      border: `1px solid ${c.text}22`,
      borderRadius: '2px',
      fontFamily: "'Space Mono', monospace",
      fontSize: '11px',
      color: c.text,
      letterSpacing: '0.06em',
      transition: 'all 0.3s',
    }}>
      {status === 'loading' ? <Spinner color={color} /> : <span>{c.icon}</span>}
      <span>{message}</span>
    </div>
  )
}

// ─── main page ────────────────────────────────────────────────────────────────
export default function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  const [values, setValues] = useState({})
  const [status, setStatus] = useState('idle')   // idle | loading | success | error
  const [message, setMessage] = useState('Fill in the fields and click Run Model')
  const [result, setResult] = useState(null)

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#080b0f', gap: '16px' }}>
        <p style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(255,255,255,0.35)' }}>Project not found.</p>
        <Link to="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#00ff88' }}>← Back to portfolio</Link>
      </div>
    )
  }

  const color = TAG_COLORS[project.tag] || '#00ff88'

  const setValue = (id, val) => setValues(prev => ({ ...prev, [id]: val }))

  // ── build FormData or JSON body from current values ─────────────────────────
  const buildPayload = () => {
    const hasFile = project.demo.fields.some(f => f.type === 'file')
    if (hasFile) {
      const fd = new FormData()
      project.demo.fields.forEach(f => {
        const v = values[f.label]
        if (v !== undefined && v !== null && v !== '') fd.append(f.id, v)
      })
      return { body: fd, headers: {} }
    }
    const obj = {}
    project.demo.fields.forEach(f => {
      const v = values[f.id]
      if (v !== undefined && v !== null && v !== '') obj[f.id] = v
    })
    return {
      body: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' },
    }
  }

  const handleRun = async () => {
    // Validate required fields
    const missing = project.demo.fields.filter(f => f.required && !values[f.id])
    if (missing.length) {
      setStatus('error')
      setMessage(`Missing required field: "${missing[0].label}"`)
      return
    }

    setStatus('loading')
    setMessage('Sending request to model API…')
    setResult(null)

    try {
      const { body, headers } = buildPayload()
      const res = await fetch(project.apiEndpoint, { method: 'POST', headers, body })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`API returned ${res.status}: ${errText}`)
      }

      const data = await res.json()
      setResult(data)
      setStatus('success')
      setMessage('Inference complete')
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Request failed — check the API endpoint.')
    }
  }

  const handleReset = () => {
    setValues({})
    setResult(null)
    setStatus('idle')
    setMessage('Fill in the fields and click Run Model')
  }

  return (
    <div style={{ background: '#080b0f', minHeight: '100vh', color: '#e0e0e0' }}>
      {/* Global scanline */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)',
      }} />

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: 'blur(14px)',
        background: 'rgba(8,11,15,0.88)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: 'rgba(255,255,255,0.35)',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            transition: 'color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = color }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
          >
            ← BACK TO PORTFOLIO
          </Link>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            color: color,
            background: `${color}18`,
            padding: '3px 10px',
            borderRadius: '2px',
            letterSpacing: '0.1em',
          }}>
            {project.tag}
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px 80px' }}>

        {/* ── Project header ───────────────────────────────────────────────── */}
        <div style={{ marginBottom: '48px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: color, letterSpacing: '0.2em' }}>
              // {String(project.id).padStart(2, '0')}
            </span>
            <div style={{ width: '40px', height: '1px', background: color }} />
          </div>

          <h1 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(28px, 4vw, 52px)',
            color: '#f5f5f5',
            fontWeight: 400,
            marginBottom: '16px',
            lineHeight: 1.1,
          }}>
            {project.title}
          </h1>

          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            color: 'rgba(255,255,255,0.42)',
            lineHeight: 2,
            maxWidth: '680px',
            marginBottom: '24px',
          }}>
            {project.longDescription}
          </p>

          {/* Metrics + tech row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {Object.entries(project.metrics).map(([k, v]) => (
                <div key={k} style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  padding: '5px 10px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '2px',
                  color: 'rgba(255,255,255,0.5)',
                }}>
                  <span style={{ color }}>{k}: </span>{v}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  padding: '5px 10px',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '2px',
                  color: 'rgba(255,255,255,0.35)',
                }}>
                  {t}
                </span>
              ))}
            </div>
            <a href={project.github} target="_blank" rel="noreferrer" style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
              color: color,
              textDecoration: 'none',
              marginLeft: 'auto',
              alignSelf: 'center',
            }}>
              ⌥ View on GitHub →
            </a>
          </div>
        </div>

        {/* ── Two-column demo layout ───────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>

          {/* LEFT — input form */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{ width: '4px', height: '18px', background: color, borderRadius: '2px' }} />
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                Input Parameters
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {project.demo.fields.map(field => (
                <DemoField
                  key={field.id}
                  field={field}
                  value={values[field.id]}
                  onChange={val => setValue(field.id, val)}
                  accentColor={color}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
              <button
                onClick={handleRun}
                disabled={status === 'loading'}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  padding: '12px 28px',
                  background: status === 'loading' ? `${color}44` : color,
                  color: '#080b0f',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontWeight: 700,
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {status === 'loading' ? (
                  <><Spinner color="#080b0f" /> RUNNING…</>
                ) : (
                  '▶ RUN MODEL'
                )}
              </button>
              <button
                onClick={handleReset}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  padding: '12px 20px',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
              >
                ↺ RESET
              </button>
            </div>
          </div>

          {/* RIGHT — output */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{ width: '4px', height: '18px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px' }} />
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                Model Output
              </span>
            </div>

            {/* Status bar — always visible */}
            <div style={{ marginBottom: '16px' }}>
              <StatusBar status={status} message={message} color={color} />
            </div>

            {/* Result */}
            {result ? (
              <DemoOutput
                outputType={project.demo.outputType}
                result={result}
                accentColor={color}
              />
            ) : (
              /* Empty state */
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '280px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px dashed rgba(255,255,255,0.07)',
                borderRadius: '2px',
                gap: '12px',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  border: `1px dashed ${color}44`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: `${color}66`,
                  fontSize: '20px',
                }}>
                  ◎
                </div>
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.2)',
                  textAlign: 'center',
                  letterSpacing: '0.06em',
                }}>
                  Output will appear here<br />after you run the model
                </p>
              </div>
            )}

            {/* API endpoint hint */}
            <div style={{
              marginTop: '20px',
              padding: '12px 14px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '2px',
            }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em', marginBottom: '6px' }}>
                API ENDPOINT
              </p>
              <code style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                color: color,
                wordBreak: 'break-all',
              }}>
                POST {project.apiEndpoint}
              </code>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
