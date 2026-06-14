'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Heart, Megaphone, Clock, CheckCircle, XCircle, Search } from 'lucide-react'
import Navbar from '@/components/ui/Navbar'
import toast from 'react-hot-toast'
import { formatCurrency, formatDate } from '@/lib/utils'
import CreateCampaignModal from '@/components/admin/CreateCampaignModal'
import ApproveHoursPanel from '@/components/admin/ApproveHoursPanel'

export default function AdminPage() {
  const [tab, setTab] = useState<'volunteers' | 'campaigns' | 'donations' | 'hours'>('volunteers')
  const [volunteers, setVolunteers] = useState<any[]>([])
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [donations, setDonations] = useState<any[]>([])
  const [donationStats, setDonationStats] = useState<any>({})
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showCreateCampaign, setShowCreateCampaign] = useState(false)

  useEffect(() => { fetchAll() }, [])

  async function fetchAll() {
    const [volRes, campRes, donRes] = await Promise.all([
      fetch('/api/volunteers?status=&search='),
      fetch('/api/campaigns?status=all'),
      fetch('/api/donations?limit=20'),
    ])
    const [volData, campData, donData] = await Promise.all([volRes.json(), campRes.json(), donRes.json()])
    setVolunteers(volData.volunteers || [])
    setCampaigns(campData.campaigns || [])
    setDonations(donData.donations || [])
    setDonationStats(donData.stats || {})
  }

  async function updateVolunteerStatus(userId: string, status: string) {
    const res = await fetch('/api/volunteers', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, status }),
    })
    if (res.ok) {
      toast.success(`Volunteer ${status}!`)
      fetchAll()
    } else {
      toast.error('Failed to update status')
    }
  }

  const filteredVolunteers = volunteers.filter(v =>
    (!statusFilter || v.status === statusFilter) &&
    (!search || v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase()))
  )

  const stats = [
    { label: 'Total Volunteers', value: volunteers.length, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Pending Approval', value: volunteers.filter(v => v.status === 'pending').length, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length, icon: Megaphone, color: 'text-green-600 bg-green-50' },
    { label: 'Total Raised', value: formatCurrency(donationStats.total ?? 0), icon: Heart, color: 'text-red-600 bg-red-50' },
  ]

  const tabs = [
    { key: 'volunteers', label: 'Volunteers' },
    { key: 'campaigns', label: 'Campaigns' },
    { key: 'donations', label: 'Donations' },
    { key: 'hours', label: 'Approve Hours' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 mt-1">Manage volunteers, campaigns, and donations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Volunteers tab */}
        {tab === 'volunteers' && (
          <div className="card">
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input className="input pl-9" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="input w-auto" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">City</th>
                    <th className="pb-3 font-medium">Hours</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Joined</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredVolunteers.map(v => (
                    <tr key={v._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 font-medium text-gray-900">{v.name}</td>
                      <td className="py-3 text-gray-500">{v.email}</td>
                      <td className="py-3 text-gray-500">{v.city || '—'}</td>
                      <td className="py-3 font-medium">{v.totalHours}h</td>
                      <td className="py-3">
                        <span className={`badge ${
                          v.status === 'active' ? 'bg-green-100 text-green-700' :
                          v.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>{v.status}</span>
                      </td>
                      <td className="py-3 text-gray-400 text-xs">{formatDate(v.createdAt)}</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          {v.status !== 'active' && (
                            <button onClick={() => updateVolunteerStatus(v._id, 'active')}
                              className="p-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors" title="Approve">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {v.status !== 'inactive' && (
                            <button onClick={() => updateVolunteerStatus(v._id, 'inactive')}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors" title="Deactivate">
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredVolunteers.length === 0 && (
                <div className="text-center py-12 text-gray-400">No volunteers found</div>
              )}
            </div>
          </div>
        )}

        {/* Campaigns tab */}
        {tab === 'campaigns' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600 text-sm">{campaigns.length} total campaigns</p>
              <button onClick={() => setShowCreateCampaign(true)} className="btn-primary text-sm">+ Create Campaign</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {campaigns.map(c => (
                <div key={c._id} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{c.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{c.category} · {c.volunteers?.length ?? 0} volunteers</p>
                    </div>
                    <span className={`badge ${
                      c.status === 'active' ? 'bg-green-100 text-green-700' :
                      c.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{c.status}</span>
                  </div>
                  <div className="progress-bar mb-2">
                    <div className="progress-fill" style={{ width: `${Math.min((c.raisedAmount / c.goalAmount) * 100, 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹{c.raisedAmount?.toLocaleString('en-IN')} raised</span>
                    <span>Goal: ₹{c.goalAmount?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Donations tab */}
        {tab === 'donations' && (
          <div className="card">
            <div className="mb-4 p-4 bg-green-50 rounded-xl flex items-center gap-3">
              <Heart className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Total raised: {formatCurrency(donationStats.total ?? 0)} from {donationStats.count ?? 0} donors
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">Donor</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Campaign</th>
                    <th className="pb-3 font-medium">Message</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {donations.map(d => (
                    <tr key={d._id} className="hover:bg-gray-50">
                      <td className="py-3 font-medium">{d.donorName}</td>
                      <td className="py-3 text-green-700 font-semibold">{formatCurrency(d.amount)}</td>
                      <td className="py-3 text-gray-500 text-xs">{d.campaign?.title || 'General'}</td>
                      <td className="py-3 text-gray-400 text-xs max-w-[200px] truncate">{d.message || '—'}</td>
                      <td className="py-3 text-gray-400 text-xs">{formatDate(d.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Hours approval tab */}
        {tab === 'hours' && <ApproveHoursPanel />}
      </main>

      {showCreateCampaign && (
        <CreateCampaignModal onClose={() => setShowCreateCampaign(false)} onSuccess={fetchAll} />
      )}
    </div>
  )
}
