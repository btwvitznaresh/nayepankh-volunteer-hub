'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Users, Calendar, MapPin, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const CATEGORY_COLORS: Record<string, string> = {
  education:   'bg-blue-100 text-blue-700',
  healthcare:  'bg-red-100 text-red-700',
  environment: 'bg-green-100 text-green-700',
  community:   'bg-purple-100 text-purple-700',
  other:       'bg-gray-100 text-gray-600',
}

const CATEGORY_ICONS: Record<string, string> = {
  education: '📚', healthcare: '🏥', environment: '🌿', community: '🤝', other: '⭐',
}

export default function CampaignCard({ campaign }: { campaign: any }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [joining, setJoining] = useState(false)
  const [joined, setJoined] = useState(
    campaign.volunteers?.includes((session?.user as any)?.id)
  )

  const progress = Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100)

  async function handleJoin() {
    if (!session) {
      router.push('/login')
      return
    }
    setJoining(true)
    try {
      const res = await fetch('/api/campaigns/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId: campaign._id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setJoined(data.joined)
      toast.success(data.message)
    } catch (err: any) {
      toast.error(err.message || 'Action failed')
    } finally {
      setJoining(false)
    }
  }

  async function handleShare() {
    const url = `${window.location.origin}/campaigns/${campaign._id}`
    if (navigator.share) {
      await navigator.share({ title: campaign.title, url })
    } else {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied!')
    }
  }

  return (
    <div className="card hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      {/* Category header */}
      <div className="flex items-center justify-between mb-4">
        <span className={`badge ${CATEGORY_COLORS[campaign.category] ?? 'bg-gray-100 text-gray-600'}`}>
          {CATEGORY_ICONS[campaign.category]} {campaign.category}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Users className="w-3 h-3" /> {campaign.volunteers?.length ?? 0}
        </span>
      </div>

      {/* Title & description */}
      <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-brand-600 transition-colors">
        {campaign.title}
      </h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{campaign.description}</p>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-4">
        {campaign.location && (
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {campaign.location}</span>
        )}
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" /> Ends {formatDate(campaign.endDate)}
        </span>
      </div>

      {/* Progress */}
      {campaign.goalAmount > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span className="font-medium text-gray-700">{formatCurrency(campaign.raisedAmount)} raised</span>
            <span>{Math.round(progress)}% of {formatCurrency(campaign.goalAmount)}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleJoin}
          disabled={joining}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
            joined
              ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
              : 'btn-primary'
          }`}
        >
          {joining ? <Loader2 className="w-4 h-4 animate-spin" /> : joined ? '✓ Joined' : '+ Join Campaign'}
        </button>
        <button
          onClick={handleShare}
          className="btn-outline px-3 py-2.5 text-sm"
          title="Share campaign"
        >
          🔗
        </button>
      </div>
    </div>
  )
}
