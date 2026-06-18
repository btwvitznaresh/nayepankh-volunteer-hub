import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { nvidia, PANKH_SYSTEM_PROMPT } from '@/lib/nvidia'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import Campaign from '@/models/Campaign'
import Donation from '@/models/Donation'
import HourLog from '@/models/HourLog'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 20) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 })
    }

    const session = await getServerSession(authOptions)
    const { messages } = await req.json()

    if (!messages?.length) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 })
    }

    // Check if NVIDIA API key is configured
    if (!process.env.NVIDIA_API_KEY) {
      console.error('[CHAT] NVIDIA_API_KEY not configured')
      return NextResponse.json({ error: 'AI service not configured. Please contact admin.' }, { status: 500 })
    }

    await connectDB()

    let contextData = ''

    if (session?.user) {
      const userId = (session.user as any).id
      const [user, campaigns, donations, logs] = await Promise.all([
        User.findById(userId).populate('campaignsJoined', 'title status'),
        Campaign.find({ status: 'active' }).select('title category raisedAmount goalAmount endDate').limit(5),
        Donation.aggregate([{ $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }]),
        HourLog.find({ volunteer: userId, status: 'approved' }).sort({ date: -1 }).limit(5),
      ])

      contextData = `
[Volunteer Context]
Name: ${user?.name}
Total approved hours: ${user?.totalHours ?? 0}
Status: ${user?.status}
Campaigns joined: ${(user?.campaignsJoined as any[])?.map((c: any) => c.title).join(', ') || 'None yet'}

[Active Campaigns]
${campaigns.map((c) => `- ${c.title} (${c.category}): ₹${c.raisedAmount}/${c.goalAmount} raised, ends ${c.endDate?.toDateString()}`).join('\n')}

[Platform Stats]
Total donations: ₹${donations[0]?.total ?? 0} from ${donations[0]?.count ?? 0} donors
`
    } else {
      const [campaigns, donationStats] = await Promise.all([
        Campaign.find({ status: 'active' }).select('title category goalAmount raisedAmount').limit(5),
        Donation.aggregate([{ $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }]),
      ])

      contextData = `
[Public Context]
Active campaigns: ${campaigns.map((c) => c.title).join(', ')}
Total donations raised: ₹${donationStats[0]?.total ?? 0}
`
    }

    const systemWithContext = `${PANKH_SYSTEM_PROMPT}\n\n${contextData}`

    // Use exact parameters from user's request
    const response = await nvidia.chat.completions.create({
      model: 'meta/llama-3.1-70b-instruct',
      messages: [
        { role: 'system', content: systemWithContext },
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        }))
      ],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: false
    })

    const reply = response.choices[0].message.content || ''

    return NextResponse.json({ reply })
  } catch (err) {
    console.error('[CHAT]', err)
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `Pankh encountered an error: ${errorMessage}` }, { status: 500 })
  }
}
