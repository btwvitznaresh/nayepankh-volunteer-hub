import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import User from '@/models/User'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const user = await User.findById((session.user as any).id)
    .select('-password')
    .populate('campaignsJoined', 'title category status')

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  return NextResponse.json({ user })
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, city, phone, bio, skills } = await req.json()
  await connectDB()

  const user = await User.findByIdAndUpdate(
    (session.user as any).id,
    { name, city, phone, bio, skills },
    { new: true }
  ).select('-password')

  return NextResponse.json({ user })
}
