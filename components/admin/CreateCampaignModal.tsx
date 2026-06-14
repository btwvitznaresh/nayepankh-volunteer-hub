'use client'
import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CreateCampaignModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({
    title: '', description: '', category: 'community', goalAmount: '',
    startDate: '', endDate: '', location: '', tags: '',
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          goalAmount: parseFloat(form.goalAmount),
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
          status: 'active',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success('Campaign created!')
      onSuccess()
      onClose()
    } catch (err: any) {
      toast.error(err.message || 'Failed to create campaign')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">Create New Campaign</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {[
            { label: 'Campaign Title', key: 'title', type: 'text', placeholder: 'Education Drive 2025' },
            { label: 'Location', key: 'location', type: 'text', placeholder: 'Delhi, India' },
            { label: 'Tags (comma separated)', key: 'tags', type: 'text', placeholder: 'education, kids, literacy' },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              <input type={type} className="input" placeholder={placeholder}
                value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea className="input resize-none h-28" placeholder="Describe the campaign and its impact..."
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {['education','healthcare','environment','community','other'].map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Goal Amount (₹)</label>
              <input type="number" className="input" placeholder="100000"
                value={form.goalAmount} onChange={e => setForm({ ...form, goalAmount: e.target.value })} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
              <input type="date" className="input" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
              <input type="date" className="input" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
        </form>
      </div>
    </div>
  )
}
