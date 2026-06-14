interface Badge { name: string; icon: string; desc: string }

export default function BadgeGrid({ badges }: { badges: Badge[] }) {
  if (!badges.length) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        <p className="text-3xl mb-2">🏅</p>
        <p>Log hours and join campaigns to earn badges!</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-3 gap-3">
      {badges.map((b) => (
        <div key={b.name} className="flex flex-col items-center text-center p-3 bg-orange-50 rounded-2xl border border-orange-100">
          <span className="text-3xl mb-1.5">{b.icon}</span>
          <span className="text-xs font-semibold text-gray-800">{b.name}</span>
          <span className="text-[11px] text-gray-400 mt-0.5">{b.desc}</span>
        </div>
      ))}
    </div>
  )
}
