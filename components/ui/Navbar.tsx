'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const role = (session?.user as any)?.role

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <span className="text-2xl">🪶</span> NayePankh
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/campaigns" className="text-gray-600 hover:text-brand-600 text-sm font-medium transition-colors">Campaigns</Link>
          <Link href="/donate" className="text-gray-600 hover:text-brand-600 text-sm font-medium transition-colors">Donate</Link>

          {session ? (
            <div className="flex items-center gap-3">
              {(role === 'admin' || role === 'superadmin') && (
                <Link href="/admin" className="flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700">
                  <Shield className="w-4 h-4" /> Admin
                </Link>
              )}
              <Link href="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="btn-outline text-sm py-2">Login</Link>
              <Link href="/register" className="btn-primary text-sm py-2">Join Us</Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          <Link href="/campaigns" className="text-gray-700 font-medium" onClick={() => setOpen(false)}>Campaigns</Link>
          <Link href="/donate" className="text-gray-700 font-medium" onClick={() => setOpen(false)}>Donate</Link>
          {session ? (
            <>
              <Link href="/dashboard" className="text-brand-600 font-medium" onClick={() => setOpen(false)}>Dashboard</Link>
              {(role === 'admin' || role === 'superadmin') && (
                <Link href="/admin" className="text-purple-600 font-medium" onClick={() => setOpen(false)}>Admin</Link>
              )}
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-red-500 font-medium text-left">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-outline text-center" onClick={() => setOpen(false)}>Login</Link>
              <Link href="/register" className="btn-primary text-center" onClick={() => setOpen(false)}>Join Us</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
