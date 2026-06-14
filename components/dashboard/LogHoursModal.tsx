'use client'
import { useState, useEffect } from 'react'
import { X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LogHoursModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ hours: '', description: '', campaignId: '', date: new Date().toISOString().slice(0, 10) })
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/campaigns').then(r => r.json()).then(d => setCampaigns(d.campaigns || []))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/volunteers/hours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, hours: parseFloat(form.hours) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success('Hours submitted for approval!')
      onSuccess()
      onClose()
    } catch (err: any) {
      toast.error(err.message || 'Failed to log hours')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Log Volunteer Hours</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Hours Spent</label>
            <input type="number" step="0.5" min="0.5" max="24" className="input" placeholder="e.g. 3.5"
              value={form.hours} onChange={e => setForm({ ...form, hours: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">What did you do?</label>
            <textarea className="input resize-none h-24" placeholder="Describe your contribution..."
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign (optional)</label>
            <select className="input" value={form.campaignId} onChange={e => setForm({ ...form, campaignId: e.target.value })}>
              <option value="">Select a campaign</option>
              {campaigns.map((c: any) => <option key={c._id} value={c._id}>{c.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
            <input type="date" className="input" value={form.date} max={new Date().toISOString().slice(0, 10)}
              onChange={e => setForm({ ...form, date: e.target.value })} required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Submitting...' : 'Submit Hours'}
          </button>
        </form>
      </div>
    </div>
  )
}
