'use client'
import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface DonorEntry {
  donorName: string
  amount: number
  createdAt: string
}

export default function DonationStrip() {
  const [donors, setDonors] = useState<DonorEntry[]>([])

  useEffect(() => {
    fetch('/api/donations?limit=10')
      .then((r) => r.json())
      .then((d) => setDonors(d.donations || []))
      .catch(() => {})
  }, [])

  if (!donors.length) return null

  const doubled = [...donors, ...donors]

  return (
    <div className="bg-orange-50 border-y border-orange-100 py-2.5 overflow-hidden">
      <div className="flex items-center gap-3 animate-[ticker_25s_linear_infinite] w-max">
        {doubled.map((d, i) => (
          <span key={i} className="flex items-center gap-1.5 text-sm text-orange-700 whitespace-nowrap px-4">
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-300" />
            <strong>{d.donorName}</strong> donated {formatCurrency(d.amount)}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
