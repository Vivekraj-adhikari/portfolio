export default function SectionHeader({ index, title, accent }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] text-brand tracking-[0.2em]">
          // {index}
        </span>
        <div className="w-10 h-px bg-brand" />
      </div>
      <h2 className="font-serif text-[clamp(32px,5vw,52px)] text-gray-100 font-normal">
        {title}{' '}
        <span className="italic text-brand">{accent}</span>
      </h2>
    </div>
  )
}
