import { useState } from 'react'

const base = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '12px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '2px',
  color: '#e0e0e0',
  outline: 'none',
  width: '100%',
  padding: '10px 12px',
  transition: 'border-color 0.2s',
}

function Label({ children, required }) {
  return (
    <label style={{
      display: 'block',
      fontFamily: "'Space Mono', monospace",
      fontSize: '10px',
      letterSpacing: '0.12em',
      color: 'rgba(255,255,255,0.4)',
      marginBottom: '8px',
      textTransform: 'uppercase',
    }}>
      {children}
      {required && <span style={{ color: '#ff6b6b', marginLeft: '4px' }}>*</span>}
    </label>
  )
}

function focusStyle(e, accentColor) {
  e.target.style.borderColor = accentColor
}
function blurStyle(e) {
  e.target.style.borderColor = 'rgba(255,255,255,0.1)'
}

// ── Tags input ────────────────────────────────────────────────────────────────
function TagsInput({ field, value, onChange, accentColor }) {
  const [input, setInput] = useState('')
  const tags = value ? value.split(',').map(t => t.trim()).filter(Boolean) : []

  const addTag = (raw) => {
    const parts = raw.split(',').map(t => t.trim()).filter(Boolean)
    const next = [...new Set([...tags, ...parts])]
    onChange(next.join(', '))
    setInput('')
  }

  const removeTag = (t) => {
    onChange(tags.filter(x => x !== t).join(', '))
  }

  return (
    <div>
      <div style={{
        ...base,
        padding: '8px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        minHeight: '44px',
        alignItems: 'center',
      }}>
        {tags.map(t => (
          <span key={t} style={{
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}44`,
            color: accentColor,
            borderRadius: '2px',
            padding: '2px 8px',
            fontSize: '11px',
            fontFamily: "'Space Mono', monospace",
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            {t}
            <button
              type="button"
              onClick={() => removeTag(t)}
              style={{ background: 'none', border: 'none', color: accentColor, cursor: 'pointer', padding: 0, lineHeight: 1 }}
            >×</button>
          </span>
        ))}
        <input
          value={input}
          placeholder={tags.length === 0 ? field.placeholder : 'Add more…'}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); if (input.trim()) addTag(input) }
            if (e.key === 'Backspace' && !input && tags.length) removeTag(tags[tags.length - 1])
          }}
          onBlur={() => { if (input.trim()) addTag(input) }}
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#e0e0e0',
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            flex: 1,
            minWidth: '120px',
            padding: '2px 4px',
          }}
        />
      </div>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginTop: '6px' }}>
        Press Enter or comma to add a tag
      </p>
    </div>
  )
}

// ── Range / slider ────────────────────────────────────────────────────────────
function RangeInput({ field, value, onChange, accentColor }) {
  const val = value !== undefined && value !== '' ? Number(value) : field.min
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
          {field.min}{field.unit}
        </span>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '13px',
          color: accentColor,
          fontWeight: 700,
        }}>
          {val}{field.unit}
        </span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
          {field.max}{field.unit}
        </span>
      </div>
      <input
        type="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={val}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', accentColor }}
      />
    </div>
  )
}

// ── Main DemoField ─────────────────────────────────────────────────────────────
export default function DemoField({ field, value, onChange, accentColor }) {
  const color = accentColor || '#00ff88'
  const handleFocus = e => focusStyle(e, color)
  const handleBlur  = e => blurStyle(e)

  return (
    <div>
      <Label required={field.required}>{field.label}</Label>

      {field.type === 'text' && (
        <input
          type="text"
          value={value || ''}
          placeholder={field.placeholder}
          onChange={e => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={base}
        />
      )}

      {field.type === 'number' && (
        <input
          type="number"
          value={value || ''}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          step={field.step}
          onChange={e => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={base}
        />
      )}

      {field.type === 'textarea' && (
        <textarea
          value={value || ''}
          placeholder={field.placeholder}
          rows={field.rows || 4}
          onChange={e => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ ...base, resize: 'vertical', lineHeight: 1.8 }}
        />
      )}

      {field.type === 'select' && (
        <select
          value={value || field.options[0].value}
          onChange={e => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ ...base, cursor: 'pointer' }}
        >
          {field.options.map(opt => (
            <option key={opt.value} value={opt.value} style={{ background: '#0d1117' }}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {field.type === 'file' && (
        <div>
          <label style={{ display: 'block', cursor: 'pointer' }}>
            <div style={{
              ...base,
              padding: '20px',
              textAlign: 'center',
              borderStyle: 'dashed',
              borderColor: value ? color : 'rgba(255,255,255,0.12)',
              color: value ? color : 'rgba(255,255,255,0.3)',
            }}>
              {value
                ? `✓ ${value.name}`
                : `Click to upload  ·  ${field.accept || 'any file'}`}
            </div>
            <input
              type="file"
              accept={field.accept}
              style={{ display: 'none' }}
              onChange={e => onChange(e.target.files[0] || null)}
            />
          </label>
        </div>
      )}

      {field.type === 'range' && (
        <RangeInput field={field} value={value} onChange={onChange} accentColor={color} />
      )}

      {field.type === 'tags' && (
        <TagsInput field={field} value={value} onChange={onChange} accentColor={color} />
      )}
    </div>
  )
}
