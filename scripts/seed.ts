/**
 * Seed script — run once to populate the database
 * Usage: npx ts-node scripts/seed.ts
 * Or:    node -r ts-node/register scripts/seed.ts
 */

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI!

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected to MongoDB')

  // Dynamic imports after connection
  const User = (await import('../models/User')).default
  const Campaign = (await import('../models/Campaign')).default
  const Donation = (await import('../models/Donation')).default

  // Clear existing data
  await Promise.all([User.deleteMany({}), Campaign.deleteMany({}), Donation.deleteMany({})])
  console.log('🗑️  Cleared existing data')

  // Create superadmin
  const adminPassword = await bcrypt.hash('Admin@1234', 12)
  const admin = await User.create({
    name: 'NayePankh Admin',
    email: 'admin@nayepankh.org',
    password: adminPassword,
    role: 'superadmin',
    status: 'active',
    city: 'Delhi',
  })
  console.log('👤 Admin created: admin@nayepankh.org / Admin@1234')

  // Create sample volunteers
  const volPassword = await bcrypt.hash('Vol@1234', 12)
  const volunteers = await User.insertMany([
    { name: 'Priya Sharma', email: 'priya@example.com', password: volPassword, role: 'volunteer', status: 'active', city: 'Mumbai', totalHours: 32 },
    { name: 'Arjun Patel', email: 'arjun@example.com', password: volPassword, role: 'volunteer', status: 'active', city: 'Ahmedabad', totalHours: 18 },
    { name: 'Sneha Rao', email: 'sneha@example.com', password: volPassword, role: 'volunteer', status: 'pending', city: 'Bangalore', totalHours: 0 },
    { name: 'Rohan Mehta', email: 'rohan@example.com', password: volPassword, role: 'volunteer', status: 'active', city: 'Pune', totalHours: 67 },
  ])
  console.log(`👥 ${volunteers.length} volunteers created`)

  // Create campaigns
  const campaigns = await Campaign.insertMany([
    {
      title: 'Shiksha Ki Udaan — Education Drive',
      description: 'Providing books, stationery, and digital tools to 500 underprivileged children across Delhi NCR. Join us to make quality education accessible to every child.',
      category: 'education',
      goalAmount: 150000,
      raisedAmount: 87500,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      status: 'active',
      location: 'Delhi NCR',
      tags: ['education', 'books', 'children', 'literacy'],
      createdBy: admin._id,
      volunteers: [volunteers[0]._id, volunteers[1]._id],
    },
    {
      title: 'Swasthya Setu — Mobile Health Camps',
      description: 'Running free medical check-up camps in rural areas of Rajasthan. We provide basic health screenings, medicines, and hygiene education to communities with no access to healthcare.',
      category: 'healthcare',
      goalAmount: 200000,
      raisedAmount: 124000,
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-11-30'),
      status: 'active',
      location: 'Rajasthan',
      tags: ['health', 'medical', 'rural', 'camps'],
      createdBy: admin._id,
      volunteers: [volunteers[3]._id],
    },
    {
      title: 'Harit Bhavishya — Tree Plantation Drive',
      description: 'Planting 10,000 trees across urban and rural India with the help of volunteers, school children, and local communities to combat climate change.',
      category: 'environment',
      goalAmount: 80000,
      raisedAmount: 56000,
      startDate: new Date('2025-03-01'),
      endDate: new Date('2025-09-30'),
      status: 'active',
      location: 'Pan India',
      tags: ['environment', 'trees', 'climate', 'green'],
      createdBy: admin._id,
      volunteers: [volunteers[0]._id, volunteers[3]._id],
    },
    {
      title: 'Aangan Utsav — Community Festival',
      description: 'Celebrating children\'s talent through art, music, and storytelling events across 10 cities. Bringing communities together and giving children a platform to shine.',
      category: 'community',
      goalAmount: 60000,
      raisedAmount: 60000,
      startDate: new Date('2024-10-01'),
      endDate: new Date('2025-01-31'),
      status: 'completed',
      location: 'Multiple Cities',
      tags: ['community', 'festival', 'art', 'children'],
      createdBy: admin._id,
      volunteers: [volunteers[0]._id, volunteers[1]._id, volunteers[3]._id],
    },
  ])
  console.log(`📣 ${campaigns.length} campaigns created`)

  // Update volunteers with campaigns
  await User.findByIdAndUpdate(volunteers[0]._id, {
    campaignsJoined: [campaigns[0]._id, campaigns[2]._id, campaigns[3]._id],
  })
  await User.findByIdAndUpdate(volunteers[1]._id, {
    campaignsJoined: [campaigns[0]._id, campaigns[3]._id],
  })
  await User.findByIdAndUpdate(volunteers[3]._id, {
    campaignsJoined: [campaigns[1]._id, campaigns[2]._id, campaigns[3]._id],
  })

  // Create sample donations
  const donorNames = ['Sunita Agarwal','Rajesh Kumar','Deepa Nair','Vikram Singh','Anita Bose','Mohammed Ali','Kavita Joshi','Suresh Reddy']
  const donationDocs = donorNames.map((name, i) => ({
    donorName: i % 5 === 0 ? 'Anonymous' : name,
    donorEmail: i % 5 === 0 ? undefined : `${name.toLowerCase().replace(/\s/g,'.')}@example.com`,
    amount: [500, 1000, 250, 2000, 750, 1500, 100, 5000][i],
    campaign: campaigns[i % campaigns.length]._id,
    message: ['Keep up the great work!', 'For the children', '', 'Proud to support NayePankh', '', 'Every child deserves education', '', 'God bless you all'][i] || undefined,
    anonymous: i % 5 === 0,
    status: 'completed',
    transactionId: `TXN-SEED-${i + 1}`,
  }))
  await Donation.insertMany(donationDocs)

  // Update campaign raised amounts
  await Campaign.findByIdAndUpdate(campaigns[0]._id, { raisedAmount: 87500 })
  await Campaign.findByIdAndUpdate(campaigns[1]._id, { raisedAmount: 124000 })
  await Campaign.findByIdAndUpdate(campaigns[2]._id, { raisedAmount: 56000 })

  console.log(`💰 ${donationDocs.length} donations created`)
  console.log('\n🎉 Seed complete!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Admin login:     admin@nayepankh.org / Admin@1234')
  console.log('Volunteer login: priya@example.com / Vol@1234')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
