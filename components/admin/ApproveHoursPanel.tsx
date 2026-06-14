'use client'
import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatDate } from '@/lib/utils'

export default function ApproveHoursPanel() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchLogs() }, [])

  async function fetchLogs() {
    setLoading(true)
    const res = await fetch('/api/admin/hours')
    const data = await res.json()
    setLogs(data.logs || [])
    setLoading(false)
  }

  async function updateLog(logId: string, status: 'approved' | 'rejected') {
    const res = await fetch('/api/admin/hours', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logId, status }),
    })
    if (res.ok) {
      toast.success(`Hours ${status}!`)
      fetchLogs()
    } else {
      toast.error('Action failed')
    }
  }

  const pending = logs.filter(l => l.status === 'pending')

  if (loading) return <div className="card text-center py-12 text-gray-400">Loading...</div>

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-yellow-500" />
        <h3 className="font-semibold text-gray-900">{pending.length} Pending Hour Submissions</h3>
      </div>
      {pending.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <CheckCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>All caught up! No pending submissions.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pending.map(log => (
            <div key={log._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{log.volunteer?.name}</span>
                  <span className="badge bg-orange-100 text-orange-700">{log.hours}h</span>
                  {log.campaign && <span className="badge bg-blue-100 text-blue-700 text-[10px]">{log.campaign.title}</span>}
                </div>
                <p className="text-sm text-gray-500 mt-1">{log.description}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(log.date)}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => updateLog(log._id, 'approved')}
                  className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-colors" title="Approve">
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button onClick={() => updateLog(log._id, 'rejected')}
                  className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors" title="Reject">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
