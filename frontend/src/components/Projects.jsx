import { useState } from 'react'
import projects, { TAG_COLORS } from '../data/projects'
import ProjectCard from './ProjectCard'
import SectionHeader from './SectionHeader'

const ALL = 'All'
const allTags = [ALL, ...Object.keys(TAG_COLORS)]

export default function Projects() {
  const [filter, setFilter] = useState(ALL)

  const filtered =
    filter === ALL ? projects : projects.filter((p) => p.tag === filter)

  return (
    <section id="projects" className="max-w-5xl mx-auto px-8 py-24">
      <SectionHeader index="01" title="Featured" accent="Projects" />

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`font-mono text-[10px] tracking-wide px-4 py-1.5 rounded-sm border transition-all duration-200 ${
              filter === tag
                ? 'border-brand text-brand bg-brand/8'
                : 'border-white/10 text-white/35 hover:border-brand/60 hover:text-brand/70'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
