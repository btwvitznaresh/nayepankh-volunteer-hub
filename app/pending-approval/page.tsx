'use client'
import { signOut } from 'next-auth/react'
import { Clock, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="card max-w-md w-full text-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-10 h-10 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Approval Pending</h2>
        <p className="text-gray-500 mb-2">
          Thank you for registering with NayePankh! Your account is currently under review.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          An admin will review your application and activate your account shortly.
          You'll be able to access your dashboard once approved.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/" className="btn-primary">Explore Campaigns</Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="btn-outline flex items-center justify-center gap-2 text-gray-500"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
