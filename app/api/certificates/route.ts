import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import HourLog from '@/models/HourLog'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Login required' }, { status: 401 })

    await connectDB()
    const userId = (session.user as any).id

    const user = await User.findById(userId).populate('campaignsJoined', 'title')
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    if (user.totalHours < 5) {
      return NextResponse.json(
        { error: 'You need at least 5 approved hours to generate a certificate.' },
        { status: 403 }
      )
    }

    const data = {
      name: user.name,
      totalHours: user.totalHours,
      campaigns: (user.campaignsJoined as any[]).map((c: any) => c.title),
      issueDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric',
      }),
      certificateId: `NP-${userId.toString().slice(-6).toUpperCase()}-${Date.now().toString().slice(-4)}`,
    }

    return NextResponse.json({ data })
  } catch (err) {
    console.error('[CERTIFICATE]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
