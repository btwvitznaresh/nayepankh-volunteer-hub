import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function calculateLevel(hours: number) {
  if (hours >= 200) return { level: 'Champion', color: 'text-yellow-500', next: null }
  if (hours >= 100) return { level: 'Hero', color: 'text-purple-500', next: 200 }
  if (hours >= 50)  return { level: 'Warrior', color: 'text-blue-500', next: 100 }
  if (hours >= 20)  return { level: 'Starter', color: 'text-green-500', next: 50 }
  return { level: 'Newcomer', color: 'text-gray-500', next: 20 }
}

export function getBadges(hours: number, campaigns: number) {
  const badges = []
  if (hours >= 1)   badges.push({ name: 'First Step', icon: '🌱', desc: 'Logged first hour' })
  if (hours >= 10)  badges.push({ name: '10 Hours', icon: '⭐', desc: 'Dedicated volunteer' })
  if (hours >= 50)  badges.push({ name: '50 Hours', icon: '🏆', desc: 'Committed hero' })
  if (hours >= 100) badges.push({ name: 'Century', icon: '💯', desc: '100 hours milestone' })
  if (campaigns >= 1) badges.push({ name: 'Campaigner', icon: '📣', desc: 'Joined a campaign' })
  if (campaigns >= 3) badges.push({ name: 'Multi-Mission', icon: '🎯', desc: '3 campaigns joined' })
  return badges
}
