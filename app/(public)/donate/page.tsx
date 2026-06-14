'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, CheckCircle, Loader2 } from 'lucide-react'
import Navbar from '@/components/ui/Navbar'
import ChatBot from '@/components/chatbot/ChatBot'
import { formatCurrency, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

const PRESET_AMOUNTS = [100, 250, 500, 1000, 2500, 5000]

export default function DonatePage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [recentDonors, setRecentDonors] = useState<any[]>([])
  const [stats, setStats] = useState<any>({})
  const [form, setForm] = useState({
    donorName: '', donorEmail: '', amount: '', campaignId: '', message: '', anonymous: false,
  })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    fetch('/api/campaigns').then(r => r.json()).then(d => setCampaigns(d.campaigns || []))
    fetch('/api/donations?limit=8').then(r => r.json()).then(d => {
      setRecentDonors(d.donations || [])
      setStats(d.stats || {})
    })
  }, [])

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault()
    if (!form.amount || parseFloat(form.amount) < 1) {
      toast.error('Please enter a valid amount')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setDone(true)
      toast.success(data.message)
    } catch (err: any) {
      toast.error(err.message || 'Donation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card max-w-md w-full mx-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you! 🙏</h2>
            <p className="text-gray-500 mb-2">Your donation of <strong>{formatCurrency(parseFloat(form.amount))}</strong> has been received.</p>
            <p className="text-sm text-gray-400 mb-6">You're helping build a brighter future for children who need it most.</p>
            <div className="flex gap-3">
              <button onClick={() => { setDone(false); setForm({ donorName:'',donorEmail:'',amount:'',campaignId:'',message:'',anonymous:false }) }}
                className="btn-outline flex-1">Donate Again</button>
              <a href="/campaigns" className="btn-primary flex-1 text-center">View Campaigns</a>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Make a Difference Today</h1>
          <p className="text-gray-500 text-lg">Every rupee goes directly to children who need it most.</p>
          {stats.total && (
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mt-4 text-sm font-medium">
              <Heart className="w-4 h-4 fill-green-400" />
              {formatCurrency(stats.total)} raised by {stats.count} donors
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Donation form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Donation</h2>
              <form onSubmit={handleDonate} className="space-y-4">
                {/* Preset amounts */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount</label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {PRESET_AMOUNTS.map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setForm({ ...form, amount: amt.toString() })}
                        className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          form.amount === amt.toString()
                            ? 'bg-brand-500 text-white border-brand-500'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-brand-300'
                        }`}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number" min="1" className="input" placeholder="Or enter custom amount (₹)"
                    value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                  <input type="text" className="input" placeholder="Priya Sharma"
                    value={form.donorName} onChange={e => setForm({ ...form, donorName: e.target.value })} required={!form.anonymous} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email (optional)</label>
                  <input type="email" className="input" placeholder="priya@example.com"
                    value={form.donorEmail} onChange={e => setForm({ ...form, donorEmail: e.target.value })} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Support a Campaign (optional)</label>
                  <select className="input" value={form.campaignId} onChange={e => setForm({ ...form, campaignId: e.target.value })}>
                    <option value="">General Fund</option>
                    {campaigns.map((c: any) => <option key={c._id} value={c._id}>{c.title}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message (optional)</label>
                  <input type="text" className="input" placeholder="Leave a note of encouragement..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} maxLength={200} />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setForm({ ...form, anonymous: !form.anonymous, donorName: !form.anonymous ? 'Anonymous' : '' })}
                    className={`w-10 h-6 rounded-full transition-colors relative ${form.anonymous ? 'bg-brand-500' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${form.anonymous ? 'left-5' : 'left-1'}`} />
                  </div>
                  <span className="text-sm text-gray-600">Donate anonymously</span>
                </label>

                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Heart className="w-5 h-5" />}
                  {loading ? 'Processing...' : `Donate ${form.amount ? formatCurrency(parseFloat(form.amount)) : 'Now'}`}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  🔒 Secure donation · 100% goes to NayePankh programs
                </p>
              </form>
            </div>
          </motion.div>

          {/* Recent donors */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="card h-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Donors ❤️</h2>
              {recentDonors.length === 0 ? (
                <div className="text-center py-12 text-gray-400">Be the first to donate!</div>
              ) : (
                <div className="space-y-3">
                  {recentDonors.map((d, i) => (
                    <motion.div
                      key={d._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-3 bg-orange-50 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-amber-400 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {d.donorName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{d.donorName}</p>
                        {d.message && <p className="text-xs text-gray-500 truncate">"{d.message}"</p>}
                        <p className="text-xs text-gray-400">{formatDate(d.createdAt)}</p>
                      </div>
                      <span className="font-bold text-brand-600 text-sm flex-shrink-0">
                        {formatCurrency(d.amount)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <ChatBot />
    </div>
  )
}
