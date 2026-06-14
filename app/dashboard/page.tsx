'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Award, Target, TrendingUp, Plus, Download } from 'lucide-react'
import Navbar from '@/components/ui/Navbar'
import HoursChart from '@/components/dashboard/HoursChart'
import BadgeGrid from '@/components/dashboard/BadgeGrid'
import LogHoursModal from '@/components/dashboard/LogHoursModal'
import CertificateButton from '@/components/dashboard/CertificateButton'
import ChatBot from '@/components/chatbot/ChatBot'
import { calculateLevel, getBadges, getInitials, formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<any>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [monthly, setMonthly] = useState<any[]>([])
  const [showLog, setShowLog] = useState(false)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const res = await fetch('/api/volunteers/hours')
    const data = await res.json()
    setLogs(data.logs || [])
    setMonthly(data.monthly || [])
  }

  const user = session?.user as any
  const totalHours = user?.totalHours ?? logs.filter((l: any) => l.status === 'approved').reduce((s: number, l: any) => s + l.hours, 0)
  const campaigns = user?.campaignsJoined?.length ?? 0
  const level = calculateLevel(totalHours)
  const badges = getBadges(totalHours, campaigns)

  const statCards = [
    { label: 'Total Hours', value: totalHours, icon: Clock, color: 'bg-blue-50 text-blue-600' },
    { label: 'Campaigns Joined', value: campaigns, icon: Target, color: 'bg-green-50 text-green-600' },
    { label: 'Badges Earned', value: badges.length, icon: Award, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Current Level', value: level.level, icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-16">

        {/* Welcome header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-amber-400 flex items-center justify-center text-white font-bold text-xl shadow-md">
              {getInitials(user?.name ?? 'V')}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hi, {user?.name?.split(' ')[0]} 👋</h1>
              <p className={`text-sm font-medium ${level.color}`}>{level.level} Volunteer</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowLog(true)} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Log Hours
            </button>
            <CertificateButton totalHours={totalHours} name={user?.name} />
          </div>
        </motion.div>

        {/* Level progress */}
        {level.next && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="card mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Progress to next level</span>
              <span className="text-sm text-gray-500">{totalHours} / {level.next} hrs</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.min((totalHours / level.next) * 100, 100)}%` }} />
            </div>
          </motion.div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts + badges */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Hours This Year</h3>
            <HoursChart data={monthly} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Badges Earned</h3>
            <BadgeGrid badges={badges} />
          </motion.div>
        </div>

        {/* Recent logs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Hour Logs</h3>
          {logs.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Clock className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No hours logged yet. Start contributing!</p>
              <button onClick={() => setShowLog(true)} className="btn-primary mt-4 text-sm">Log Your First Hours</button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {logs.map((log: any) => (
                <div key={log._id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{log.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {log.campaign?.title && <span className="mr-2">📣 {log.campaign.title}</span>}
                      {formatDate(log.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-brand-600">{log.hours}h</span>
                    <span className={`badge ${
                      log.status === 'approved' ? 'bg-green-100 text-green-700' :
                      log.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {showLog && <LogHoursModal onClose={() => setShowLog(false)} onSuccess={fetchData} />}
      <ChatBot />
    </div>
  )
}
