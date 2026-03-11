import SectionHeader from './SectionHeader'

const terminalLines = [
  { key: 'class', eq: '', val: 'MLEngineer:', keyColor: '#ff6b6b', valColor: '#00cfff' },
  { key: '  name', eq: '=', val: 'Vivekraj Adhikari Dhanuk', keyColor: '#c77dff', valColor: '#ffd93d' },
  { key: '  location', eq: '=', val: '"Chittoor, IN"', keyColor: '#c77dff', valColor: '#ffd93d' },
  { key: '  education', eq: '=', val: '"B.Tech. Computer Science"', keyColor: '#c77dff', valColor: '#ffd93d' },
  { key: '  experience', eq: '=', val: '"3+ years"', keyColor: '#c77dff', valColor: '#ffd93d' },
  { key: '  focus', eq: '=', val: '["ML","Maths","MLOps"]', keyColor: '#c77dff', valColor: '#ffd93d' },
  { key: '  leetcode', eq: '=', val: '110+ Questions Solved', keyColor: '#c77dff', valColor: '#00ff88' },
]

const socialLinks = ['GitHub', 'LinkedIn']

export default function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-8 py-24">
      <SectionHeader index="03" title="About" accent="Me" />

      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Bio */}
        <div>
          <p className="font-mono text-[12px] text-white/45 leading-loose mb-5">
            Machine Learning Engineer with a deep passion for turning raw data into
            production-grade intelligent systems. I specialise in end-to-end ML
            workflows — from exploratory analysis to model deployment and monitoring.
          </p>
          <p className="font-mono text-[12px] text-white/45 leading-loose">
            Currently focused on classification and regression models, scalable inference, and
            applied machine learning for real-world problem solving.
          </p>

          <div className="flex flex-wrap gap-5 mt-8">
            {socialLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-mono text-[10px] tracking-wide text-white/40 border-b border-white/15 pb-px hover:text-brand hover:border-brand transition-all duration-200"
              >
                {link} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Terminal card */}
        <div className="bg-dark-800 border border-white/7 rounded overflow-hidden">
          {/* Window chrome */}
          <div className="bg-dark-700 px-4 py-2.5 flex items-center gap-2">
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
            <span className="font-mono text-[10px] text-white/20 ml-2">profile.py</span>
          </div>

          {/* Code */}
          <div className="p-6 font-mono text-[11px] leading-loose">
            {terminalLines.map((line, i) => (
              <div key={i}>
                <span style={{ color: line.keyColor }}>{line.key}</span>
                {line.eq && (
                  <span className="text-white/30"> {line.eq} </span>
                )}
                <span style={{ color: line.valColor }}>{line.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
