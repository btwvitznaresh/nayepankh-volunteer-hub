import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import HourLog from '@/models/HourLog'
import User from '@/models/User'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const userId = (session.user as any).id

  const logs = await HourLog.find({ volunteer: userId })
    .populate('campaign', 'title')
    .sort({ date: -1 })
    .limit(20)

  const monthly = await HourLog.aggregate([
    { $match: { volunteer: userId as any, status: 'approved' } },
    {
      $group: {
        _id: { month: { $month: '$date' }, year: { $year: '$date' } },
        hours: { $sum: '$hours' },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])

  return NextResponse.json({ logs, monthly })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { hours, description, campaignId, date } = await req.json()
  if (!hours || !description) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  await connectDB()
  const userId = (session.user as any).id

  const log = await HourLog.create({
    volunteer: userId,
    campaign: campaignId || undefined,
    hours,
    description,
    date: date || new Date(),
    status: 'pending',
  })

  return NextResponse.json({ log, message: 'Hours submitted for approval!' }, { status: 201 })
}
