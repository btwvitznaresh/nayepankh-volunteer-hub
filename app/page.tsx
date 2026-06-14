'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Users, Megaphone, Award, ArrowRight, Sparkles } from 'lucide-react'
import Navbar from '@/components/ui/Navbar'
import ChatBot from '@/components/chatbot/ChatBot'
import DonationStrip from '@/components/donations/DonationStrip'

const stats = [
  { label: 'Active Volunteers', value: '1,200+', icon: Users },
  { label: 'Campaigns Run', value: '48', icon: Megaphone },
  { label: 'Children Impacted', value: '10,000+', icon: Heart },
  { label: 'Certificates Issued', value: '850+', icon: Award },
]

const features = [
  {
    icon: '🤖',
    title: 'AI Assistant — Pankh',
    desc: 'Our smart AI answers your questions, tracks your hours, and guides you through every step of volunteering.',
  },
  {
    icon: '📊',
    title: 'Volunteer Dashboard',
    desc: 'Track hours, earn badges, join campaigns, and download your certificate — all in one place.',
  },
  {
    icon: '💰',
    title: 'Donation Tracker',
    desc: 'See exactly where your money goes. Live campaign goals, donor feeds, and impact reports.',
  },
  {
    icon: '📣',
    title: 'Awareness Campaigns',
    desc: 'Join campaigns for education, healthcare, and community upliftment. Make your voice count.',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 pt-24 pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="max-w-6xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" /> Now with AI-powered volunteer assistance
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Give Wings to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-amber-500">
                Every Child
              </span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
              NayePankh connects passionate volunteers with meaningful opportunities.
              Track your impact, grow your skills, and be the change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-primary text-base px-8 py-4 flex items-center gap-2 justify-center">
                Become a Volunteer <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/donate" className="btn-outline text-base px-8 py-4 flex items-center gap-2 justify-center">
                <Heart className="w-5 h-5 text-red-400" /> Donate Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live donation strip */}
      <DonationStrip />

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <stat.icon className="w-8 h-8 text-brand-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to make a difference</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              One platform. Real impact. Powered by AI.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-500 to-amber-500">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to spread your wings?</h2>
          <p className="text-orange-100 text-lg mb-8">
            Join 1,200+ volunteers who are already making a difference with NayePankh.
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-white text-brand-600 font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 active:scale-95">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-white text-lg">🪶 NayePankh</div>
          <p className="text-sm">© {new Date().getFullYear()} NayePankh NGO. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/campaigns" className="hover:text-white transition-colors">Campaigns</Link>
            <Link href="/donate" className="hover:text-white transition-colors">Donate</Link>
            <Link href="/login" className="hover:text-white transition-colors">Volunteer Login</Link>
          </div>
        </div>
      </footer>

      <ChatBot />
    </main>
  )
}
