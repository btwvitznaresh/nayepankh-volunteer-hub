import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import Campaign from '@/models/Campaign'
import Donation from '@/models/Donation'
import HourLog from '@/models/HourLog'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !['admin', 'superadmin'].includes((session.user as any).role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()

  const [
    totalVolunteers,
    activeVolunteers,
    pendingVolunteers,
    activeCampaigns,
    donationStats,
    pendingHours,
    recentSignups,
  ] = await Promise.all([
    User.countDocuments({ role: 'volunteer' }),
    User.countDocuments({ role: 'volunteer', status: 'active' }),
    User.countDocuments({ role: 'volunteer', status: 'pending' }),
    Campaign.countDocuments({ status: 'active' }),
    Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]),
    HourLog.countDocuments({ status: 'pending' }),
    User.find({ role: 'volunteer' }).sort({ createdAt: -1 }).limit(5).select('name email city createdAt status'),
  ])

  return NextResponse.json({
    stats: {
      totalVolunteers,
      activeVolunteers,
      pendingVolunteers,
      activeCampaigns,
      totalDonations: donationStats[0]?.total ?? 0,
      donationCount: donationStats[0]?.count ?? 0,
      pendingHours,
    },
    recentSignups,
  })
}
