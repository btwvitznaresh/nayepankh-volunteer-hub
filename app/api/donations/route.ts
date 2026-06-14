import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Donation from '@/models/Donation'
import Campaign from '@/models/Campaign'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    await connectDB()

    const { searchParams } = new URL(req.url)
    const campaignId = searchParams.get('campaign')
    const limit = parseInt(searchParams.get('limit') ?? '10')

    const query: any = { status: 'completed' }
    if (campaignId) query.campaign = campaignId

    const donations = await Donation.find(query)
      .populate('campaign', 'title')
      .sort({ createdAt: -1 })
      .limit(limit)

    const stats = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ])

    const sanitized = donations.map((d) => ({
      _id: d._id,
      donorName: d.anonymous ? 'Anonymous' : d.donorName,
      amount: d.amount,
      campaign: d.campaign,
      message: d.message,
      createdAt: d.createdAt,
    }))

    return NextResponse.json({
      donations: sanitized,
      stats: stats[0] ?? { total: 0, count: 0 },
    })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { donorName, donorEmail, amount, campaignId, message, anonymous } = await req.json()

    if (!donorName || !amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid donation details' }, { status: 400 })
    }

    await connectDB()

    const donation = await Donation.create({
      donorName,
      donorEmail,
      amount,
      campaign: campaignId || undefined,
      message,
      anonymous: anonymous ?? false,
      status: 'completed',
      transactionId: `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    })

    if (campaignId) {
      await Campaign.findByIdAndUpdate(campaignId, { $inc: { raisedAmount: amount } })
    }

    return NextResponse.json({ donation, message: 'Thank you for your donation! 🙏' }, { status: 201 })
  } catch (err) {
    console.error('[DONATION POST]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
