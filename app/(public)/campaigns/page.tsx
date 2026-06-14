'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Users, Calendar } from 'lucide-react'
import Navbar from '@/components/ui/Navbar'
import CampaignCard from '@/components/campaigns/CampaignCard'
import ChatBot from '@/components/chatbot/ChatBot'

const CATEGORIES = ['All', 'Education', 'Healthcare', 'Environment', 'Community', 'Other']

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/campaigns?status=active')
      .then(r => r.json())
      .then(d => {
        setCampaigns(d.campaigns || [])
        setFiltered(d.campaigns || [])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let results = campaigns
    if (search) results = results.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    )
    if (category !== 'All') results = results.filter(c => c.category === category.toLowerCase())
    setFiltered(results)
  }, [search, category, campaigns])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Active Campaigns</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Join a cause, log your hours, and make a real difference in children's lives.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="input pl-10"
              placeholder="Search campaigns..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="h-40 bg-gray-100 rounded-xl mb-4" />
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg">No campaigns found. Try a different filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((campaign, i) => (
              <motion.div
                key={campaign._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <CampaignCard campaign={campaign} />
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <ChatBot />
    </div>
  )
}
