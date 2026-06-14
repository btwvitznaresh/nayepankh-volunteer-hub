'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function HoursChart({ data }: { data: any[] }) {
  const chartData = data.map((d) => ({
    month: MONTHS[d._id.month - 1],
    hours: d.hours,
  })).reverse()

  if (!chartData.length) {
    return <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={chartData} barSize={28}>
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '12px', color: '#f9fafb', fontSize: '13px' }}
          cursor={{ fill: '#f3f4f6' }}
        />
        <Bar dataKey="hours" name="Hours" radius={[8, 8, 0, 0]}>
          {chartData.map((_, i) => (
            <Cell key={i} fill={i === chartData.length - 1 ? '#f97316' : '#fed7aa'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
