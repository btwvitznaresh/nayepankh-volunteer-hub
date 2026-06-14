import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Campaign from '@/models/Campaign'
import User from '@/models/User'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Login required' }, { status: 401 })

    const { campaignId } = await req.json()
    const userId = (session.user as any).id

    await connectDB()

    const campaign = await Campaign.findById(campaignId)
    if (!campaign) return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    if (campaign.status !== 'active') return NextResponse.json({ error: 'Campaign is not active' }, { status: 400 })

    const alreadyJoined = campaign.volunteers.includes(userId)
    if (alreadyJoined) {
      await Campaign.findByIdAndUpdate(campaignId, { $pull: { volunteers: userId } })
      await User.findByIdAndUpdate(userId, { $pull: { campaignsJoined: campaignId } })
      return NextResponse.json({ message: 'Left campaign', joined: false })
    }

    await Campaign.findByIdAndUpdate(campaignId, { $addToSet: { volunteers: userId } })
    await User.findByIdAndUpdate(userId, { $addToSet: { campaignsJoined: campaignId } })

    return NextResponse.json({ message: 'Joined campaign!', joined: true })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
