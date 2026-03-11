// DemoOutput.jsx
// Renders the API result depending on the project's outputType.
// Each renderer expects `result` to follow a specific shape — documented inline.

const mono = { fontFamily: "'Space Mono', monospace" }

// ── helpers ───────────────────────────────────────────────────────────────────
function Panel({ children, accentColor }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.35)',
      border: `1px solid ${accentColor}33`,
      borderRadius: '2px',
      padding: '24px',
    }}>
      {children}
    </div>
  )
}

// ── label output ──────────────────────────────────────────────────────────────
// Expected shape:
// { label: string, confidence: number (0-1), scores?: { [label]: number } }
function LabelOutput({ result, accentColor }) {
  const scores = result.scores
    ? Object.entries(result.scores).sort((a, b) => b[1] - a[1])
    : [[result.label, result.confidence]]

  return (
    <Panel accentColor={accentColor}>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{
          ...mono,
          fontSize: '11px',
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>Prediction</span>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '28px',
          color: accentColor,
          fontStyle: 'italic',
        }}>{result.label}</span>
        <span style={{
          ...mono,
          fontSize: '11px',
          color: 'rgba(255,255,255,0.4)',
          marginLeft: 'auto',
        }}>
          {(result.confidence * 100).toFixed(1)}% confidence
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {scores.map(([lbl, score]) => (
          <div key={lbl}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ ...mono, fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{lbl}</span>
              <span style={{ ...mono, fontSize: '11px', color: accentColor }}>
                {(score * 100).toFixed(1)}%
              </span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${score * 100}%`,
                background: `linear-gradient(to right, ${accentColor}88, ${accentColor})`,
                borderRadius: '2px',
                transition: 'width 0.8s ease',
              }} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

// ── image output ──────────────────────────────────────────────────────────────
// Expected shape: { imageUrl: string }  (URL or base64 data URI)
function ImageOutput({ result, accentColor }) {
  return (
    <Panel accentColor={accentColor}>
      <p style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
        Model Output
      </p>
      <img
        src={result.imageUrl}
        alt="Model output"
        style={{
          width: '100%',
          maxHeight: '480px',
          objectFit: 'contain',
          border: `1px solid ${accentColor}22`,
          borderRadius: '2px',
          display: 'block',
        }}
      />
      {result.caption && (
        <p style={{ ...mono, fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '12px', textAlign: 'center' }}>
          {result.caption}
        </p>
      )}
    </Panel>
  )
}

// ── chart output ──────────────────────────────────────────────────────────────
// Expected shape: { labels: string[], values: number[], lower?: number[], upper?: number[] }
// Pure CSS/SVG chart — no external library needed.
function ChartOutput({ result, accentColor }) {
  const { labels, values, lower, upper } = result
  const max = Math.max(...values, ...(upper || []))
  const min = Math.min(...values, ...(lower || []))
  const range = max - min || 1
  const W = 600
  const H = 220
  const PAD = { top: 20, right: 20, bottom: 40, left: 52 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  const x = (i) => PAD.left + (i / (labels.length - 1)) * chartW
  const y = (v) => PAD.top + chartH - ((v - min) / range) * chartH

  const linePath = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ')

  // confidence band
  let bandPath = ''
  if (lower && upper) {
    const top    = upper.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ')
    const bottom = lower.map((v, i) => `L${x(i)},${y(v)}`).reverse().join(' ')
    bandPath = `${top} ${bottom} Z`
  }

  // y-axis ticks
  const ticks = 5
  const yTicks = Array.from({ length: ticks }, (_, i) => min + (range * i) / (ticks - 1))

  return (
    <Panel accentColor={accentColor}>
      <p style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
        Forecast
      </p>
      <div style={{ overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', minWidth: '360px', display: 'block' }}>
          {/* Grid lines */}
          {yTicks.map((t, i) => (
            <g key={i}>
              <line
                x1={PAD.left} y1={y(t)} x2={W - PAD.right} y2={y(t)}
                stroke="rgba(255,255,255,0.06)" strokeWidth="1"
              />
              <text
                x={PAD.left - 8} y={y(t) + 4}
                fill="rgba(255,255,255,0.3)"
                fontSize="10"
                textAnchor="end"
                fontFamily="Space Mono, monospace"
              >
                {t.toFixed(0)}
              </text>
            </g>
          ))}

          {/* Confidence band */}
          {bandPath && (
            <path d={bandPath} fill={accentColor} fillOpacity="0.1" />
          )}

          {/* Main line */}
          <path d={linePath} fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Dots */}
          {values.map((v, i) => (
            <circle key={i} cx={x(i)} cy={y(v)} r="3" fill={accentColor} />
          ))}

          {/* X-axis labels — show ~6 evenly spaced */}
          {labels.map((lbl, i) => {
            const step = Math.max(1, Math.floor(labels.length / 6))
            if (i % step !== 0 && i !== labels.length - 1) return null
            return (
              <text
                key={i}
                x={x(i)}
                y={H - PAD.bottom + 16}
                fill="rgba(255,255,255,0.3)"
                fontSize="10"
                textAnchor="middle"
                fontFamily="Space Mono, monospace"
              >
                {lbl}
              </text>
            )
          })}
        </svg>
      </div>
    </Panel>
  )
}

// ── list output ───────────────────────────────────────────────────────────────
// Expected shape: { items: Array<{ title, subtitle?, score? }> }
function ListOutput({ result, accentColor }) {
  return (
    <Panel accentColor={accentColor}>
      <p style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
        Results — {result.items.length} items
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {result.items.map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px 14px',
            background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
            borderRadius: '2px',
          }}>
            <span style={{ ...mono, fontSize: '11px', color: accentColor, minWidth: '28px' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ ...mono, fontSize: '13px', color: '#f0f0f0' }}>{item.title}</div>
              {item.subtitle && (
                <div style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>
                  {item.subtitle}
                </div>
              )}
            </div>
            {item.score !== undefined && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', minWidth: '72px' }}>
                <span style={{ ...mono, fontSize: '11px', color: accentColor }}>
                  {(item.score * 100).toFixed(0)}%
                </span>
                <div style={{ width: '60px', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
                  <div style={{ width: `${item.score * 100}%`, height: '100%', background: accentColor, borderRadius: '2px', transition: 'width 0.6s ease' }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Panel>
  )
}

// ── json fallback ─────────────────────────────────────────────────────────────
function JsonOutput({ result, accentColor }) {
  return (
    <Panel accentColor={accentColor}>
      <p style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
        Raw Response
      </p>
      <pre style={{
        ...mono,
        fontSize: '11px',
        color: '#e0e0e0',
        lineHeight: 1.8,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        maxHeight: '400px',
        overflowY: 'auto',
        margin: 0,
      }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </Panel>
  )
}

// ── main export ───────────────────────────────────────────────────────────────
export default function DemoOutput({ outputType, result, accentColor }) {
  if (!result) return null

  switch (outputType) {
    case 'label':  return <LabelOutput result={result} accentColor={accentColor} />
    case 'image':  return <ImageOutput result={result} accentColor={accentColor} />
    case 'chart':  return <ChartOutput result={result} accentColor={accentColor} />
    case 'list':   return <ListOutput  result={result} accentColor={accentColor} />
    default:       return <JsonOutput  result={result} accentColor={accentColor} />
  }
}
