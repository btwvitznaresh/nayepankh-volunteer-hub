import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import HourLog from '@/models/HourLog'
import User from '@/models/User'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !['admin', 'superadmin'].includes((session.user as any).role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const logs = await HourLog.find({})
    .populate('volunteer', 'name email')
    .populate('campaign', 'title')
    .sort({ createdAt: -1 })
    .limit(50)

  return NextResponse.json({ logs })
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !['admin', 'superadmin'].includes((session.user as any).role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { logId, status } = await req.json()
  if (!logId || !['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  await connectDB()

  const log = await HourLog.findByIdAndUpdate(
    logId,
    { status, approvedBy: (session.user as any).id },
    { new: true }
  )

  if (!log) return NextResponse.json({ error: 'Log not found' }, { status: 404 })

  // If approved, increment volunteer's total hours
  if (status === 'approved') {
    await User.findByIdAndUpdate(log.volunteer, { $inc: { totalHours: log.hours } })
  }

  return NextResponse.json({ log })
}
