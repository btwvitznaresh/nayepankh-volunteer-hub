import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Campaign from '@/models/Campaign'
import User from '@/models/User'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') ?? 'active'

    const campaigns = await Campaign.find(status === 'all' ? {} : { status })
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })

    return NextResponse.json({ campaigns })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !['admin', 'superadmin'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    await connectDB()

    const campaign = await Campaign.create({
      ...data,
      createdBy: (session.user as any).id,
    })

    return NextResponse.json({ campaign }, { status: 201 })
  } catch (err) {
    console.error('[CAMPAIGN POST]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
