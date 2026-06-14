# 🪶 NayePankh Smart Volunteer Hub

A full-stack web platform for NayePankh NGO — empowering volunteers, tracking donations, and running awareness campaigns, with an AI-powered assistant built in.

[![CI](https://github.com/btwvitznaresh/nayepankh-volunteer-hub/actions/workflows/ci.yml/badge.svg)](https://github.com/btwvitznaresh/nayepankh-volunteer-hub/actions)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **Pankh AI** | AI assistant (Claude-powered) with real-time NGO context — answers questions about campaigns, volunteer hours, and donations |
| 📊 **Volunteer Dashboard** | Track hours, earn badges, level up, download certificates |
| 💰 **Donation Tracker** | Live goals, donor feed, campaign-specific donations |
| 📣 **Campaigns** | Join/leave campaigns, share, filter by category |
| 🛡️ **Admin Panel** | Approve volunteers, manage campaigns, approve hours, view donation history |
| 🏆 **Certificates** | Auto-generated PDF certificates downloadable from the dashboard |

---

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** MongoDB + Mongoose
- **Auth:** NextAuth.js (JWT, credentials)
- **AI:** Anthropic Claude API (`claude-sonnet-4-6`)
- **Styling:** Tailwind CSS + Framer Motion
- **Charts:** Recharts
- **PDF:** jsPDF

---

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- Anthropic API key

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/btwvitznaresh/nayepankh-volunteer-hub.git
cd nayepankh-volunteer-hub

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Seed the database (creates admin + sample data)
npx ts-node scripts/seed.ts

# 5. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Default Credentials (after seed)

| Role | Email | Password |
|---|---|---|
| Super Admin | `admin@nayepankh.org` | `Admin@1234` |
| Volunteer | `priya@example.com` | `Vol@1234` |

---

## 📁 Project Structure

```
app/
├── api/               # All API routes
│   ├── auth/          # NextAuth + register
│   ├── chat/          # Pankh AI endpoint
│   ├── campaigns/     # CRUD + join/leave
│   ├── donations/     # Create + list
│   ├── volunteers/    # Profile + hours
│   ├── certificates/  # Certificate data
│   └── admin/         # Admin-only endpoints
├── (public)/          # Guest pages (campaigns, donate)
├── (auth)/            # Login, register
├── dashboard/         # Volunteer dashboard
└── admin/             # Admin panel

components/
├── chatbot/           # Pankh AI chat widget
├── dashboard/         # Hours chart, badge grid, modals
├── campaigns/         # Campaign cards
├── donations/         # Donation strip
├── admin/             # Admin modals and panels
└── ui/                # Navbar

models/                # Mongoose schemas
lib/                   # DB, auth, Claude, utils
scripts/               # Seed script
```

---

## 🔐 User Roles

| Role | Access |
|---|---|
| **Guest** | View campaigns, donate, chat with Pankh |
| **Volunteer** (pending) | Waiting for admin approval |
| **Volunteer** (active) | Full dashboard, log hours, join campaigns, download certificate |
| **Admin** | All volunteer features + manage volunteers, campaigns, hours |
| **Super Admin** | Everything + manage admins |

---

## 🤖 Pankh AI

Pankh is NayePankh's AI assistant powered by Claude. It's not a generic chatbot — it fetches real data from the database and gives personalized answers:

- Logged-in volunteers get their actual hours, badges, and campaigns in the AI context
- Guests get public campaign and donation data
- Rate limited to 20 requests/minute per IP

---

## 🚢 Deploying to Vercel

```bash
npm install -g vercel
vercel

# Set env vars in Vercel dashboard:
# MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL, ANTHROPIC_API_KEY
```

---

## 📜 License

MIT © NayePankh NGO
