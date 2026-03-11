import skills from '../data/skills'
import SectionHeader from './SectionHeader'

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-b border-white/5"
    >
      <div className="max-w-5xl mx-auto px-8 py-24">
        <SectionHeader index="02" title="Tech" accent="Stack" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map(({ category, items }) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-brand text-xs">▸</span>
                <span className="font-mono text-[10px] tracking-[0.15em] text-brand">
                  {category.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[11px] px-3 py-1 border border-white/8 rounded-sm text-white/50 hover:border-brand hover:text-brand hover:bg-brand/6 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
