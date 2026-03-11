import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TAG_COLORS } from '../data/projects'

export default function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const color = TAG_COLORS[project.tag] || '#00ff88'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col gap-4 p-7 rounded-sm border transition-all duration-300 overflow-hidden animate-fade-up"
      style={{
        animationDelay: `${index * 0.08}s`,
        background: hovered
          ? `linear-gradient(135deg, ${color}0f 0%, rgba(10,14,20,0.95) 100%)`
          : 'rgba(10,14,20,0.85)',
        borderColor: hovered ? color : 'rgba(255,255,255,0.07)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 20px 40px rgba(0,0,0,0.6), 0 0 20px ${color}22`
          : '0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-0 h-0"
        style={{
          borderTop: `32px solid ${color}22`,
          borderLeft: '32px solid transparent',
        }}
      />

      {/* Top row */}
      <div className="flex justify-between items-start">
        <span
          className="font-mono text-[11px] px-2.5 py-0.5 rounded-sm tracking-wide"
          style={{ color, background: `${color}18` }}
        >
          {project.tag}
        </span>
        <span className="font-mono text-[11px] text-white/20">
          {String(project.id).padStart(2, '0')}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-[20px] text-gray-100 leading-tight font-normal">
        {project.title}
      </h3>

      {/* Description */}
      <p className="font-mono text-[12px] text-white/45 leading-loose">
        {project.description}
      </p>

      {/* Metrics */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(project.metrics).map(([k, v]) => (
          <div
            key={k}
            className="font-mono text-[10px] bg-white/4 border border-white/8 rounded-sm px-2 py-1 text-white/50"
          >
            <span style={{ color }}>{k}: </span>
            {v}
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] px-2 py-0.5 border border-white/10 rounded-sm text-white/40"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 mt-1 flex-wrap">
        <a
          href={project.github}
          className="font-mono text-[11px] hover:underline transition-colors"
          style={{ color }}
        >
          ⌥ GitHub
        </a>
        <button
          onClick={() => navigate(`/project/${project.slug}`)}
          className="font-mono text-[11px] px-3 py-1 rounded-sm border transition-all duration-200 ml-auto"
          style={{
            borderColor: `${color}44`,
            color: color,
            background: `${color}0d`,
            cursor: 'pointer',
            letterSpacing: '0.06em',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${color}22` }}
          onMouseLeave={e => { e.currentTarget.style.background = `${color}0d` }}
        >
          ▶ Try Demo
        </button>
      </div>
    </div>
  )
}
