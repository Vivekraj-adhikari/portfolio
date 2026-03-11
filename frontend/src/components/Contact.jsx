import SectionHeader from './SectionHeader'

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-white/5"
    >
      <div className="max-w-xl mx-auto px-8 py-24 text-center">
        <SectionHeader index="04" title="Let's" accent="Connect" />

        <p className="font-mono text-[12px] text-white/35 leading-loose mb-10">
          Open to new opportunities, collaborations, and interesting ML problems.
        </p>

        <a
          href="mailto:vivekraj.offcial@email.com"
          className="inline-block font-mono text-[12px] tracking-[0.12em] px-10 py-4 border border-brand text-brand rounded-sm hover:bg-brand hover:text-[#080b0f] transition-all duration-200"
        >
          SAY HELLO →
        </a>

        <div className="mt-5 font-mono text-[11px] text-white/20">
          vivekraj.offcial@email.com
        </div>
      </div>
    </section>
  )
}
