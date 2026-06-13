# NayePankh Smart Volunteer Hub

A modern, full-stack web platform for NayePankh Foundation - an NGO empowering underprivileged students and communities through volunteer efforts.

## 🎯 Project Overview

NayePankh Smart Volunteer Hub is a comprehensive platform featuring:

![Landing Page](./landing-page.png)

### Key Features:
- **AI-Powered Chatbot (Pankh)**: Intelligent assistant powered by Anthropic Claude API
- **Volunteer Management System**: Register, track, and manage volunteers
- **Admin Dashboard**: Comprehensive admin controls and analytics
- **Gamification**: Points, badges, leaderboards, and certificates
- **Donation Tracking**: Real-time donation progress and impact metrics
- **Community Features**: Forums, discussions, and knowledge sharing
- **Awareness Campaigns**: Social media content generation
- **Event Management**: Create and manage volunteering events
- **Impact Analytics**: Charts and statistics showing real-world impact

## 📸 Screenshots

### Volunteer Dashboard
![Dashboard](./dashboard-page.png)

### AI Chatbot (Pankh)
![Chatbot](./chat-page.png)

### Impact Analytics
![Impact](./impact-page.png)

### Events Listing
![Events](./events-page.png)


- **AI-Powered Chatbot (Pankh)**: Intelligent assistant powered by Anthropic Claude API
- **Volunteer Management System**: Register, track, and manage volunteers
- **Admin Dashboard**: Comprehensive admin controls and analytics
- **Gamification**: Points, badges, leaderboards, and certificates
- **Donation Tracking**: Real-time donation progress and impact metrics
- **Community Features**: Forums, discussions, and knowledge sharing
- **Awareness Campaigns**: Social media content generation
- **Event Management**: Create and manage volunteering events
- **Impact Analytics**: Charts and statistics showing real-world impact

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite) - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Data visualization
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js + Express.js** - Server framework
- **MongoDB + Mongoose** - Database and ODM
- **JWT** - Authentication
- **Anthropic Claude API** - AI chatbot
- **Nodemailer** - Email notifications
- **Multer** - File uploads
- **pdf-lib** - Certificate generation

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 📁 Project Structure

```
nayepankh-volunteer-hub/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ImpactCounter.jsx
│   │   │   ├── BadgeCard.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── DonationMeter.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Impact.jsx
│   │   │   ├── Donate.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useChat.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   ├── Task.js
│   │   ├── Donation.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── volunteer.js
│   │   ├── chat.js
│   │   └── ...
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── volunteerController.js
│   │   ├── chatController.js
│   │   └── ...
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Anthropic API key
- Gmail account (for email notifications)

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd nayepankh-volunteer-hub
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your credentials
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# ANTHROPIC_API_KEY=your_anthropic_key
# GMAIL_USER=your_gmail
# GMAIL_PASS=your_app_password

# Start the server
npm run dev
```

#### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
pnpm install

# Create .env file
cp .env.example .env

# Start development server
pnpm dev
```

The frontend will be available at `http://localhost:5173`
The backend will be available at `http://localhost:5000`

## 📚 Features

### 1. Landing Page
- Animated hero section with tagline
- Live impact counter with animations
- Mission and vision section
- How it works (3-step process)
- Success stories carousel
- Testimonials section
- Donation progress bar
- Partners/sponsors section

### 2. Authentication
- User registration with skills and interests
- JWT-based login
- Password reset via email
- Persistent login with localStorage
- Auto logout on token expiry

### 3. Volunteer Dashboard
- Welcome message with personalized greeting
- Points and badge display
- Volunteering hours tracker
- Assigned tasks list
- Upcoming events
- Certificate download
- Activity timeline
- Leaderboard preview

### 4. AI Chatbot (Pankh)
- Powered by Anthropic Claude API
- Answer NayePankh FAQs
- Guide volunteer registration
- Suggest volunteering roles based on skills
- Generate social media captions
- Provide impact statistics
- Chat history with memory
- Typing animations

### 5. Events Management
- Browse upcoming volunteering events
- Filter by city, category, and date
- Event details with volunteer slots
- Registration system
- Past events gallery

### 6. Impact Dashboard
- Animated statistics cards
- Monthly volunteer growth chart
- Donation trends visualization
- Category breakdown pie chart
- Real-time donation meter
- Success stories section
- Photo gallery

### 7. Gamification
- Points system
- Badge achievements:
  - First Step (registered)
  - Helper (5 tasks done)
  - Champion (50 hours)
  - Legend (100 hours)
  - Ambassador (referred 10 people)
- Leaderboard with top volunteers
- Monthly winner spotlight

### 8. Donation System
- Multiple donation tiers
- Impact visualization (₹500 = 1 child educated for 1 month)
- Donor leaderboard
- Recent donors live feed
- Payment integration ready

### 9. Admin Dashboard
- Volunteer management table
- Task assignment system
- Event creation form
- Certificate generator (auto PDF)
- Email blast tool
- AI content generator for social media
- Analytics and charts

## 🔐 Authentication & Security

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes for authenticated users
- Admin-only routes
- Automatic token refresh
- CORS enabled

## 🎨 Design System

### Color Palette
- **Primary**: #6C63FF (Purple)
- **Secondary**: #FF6584 (Pink/Coral)
- **Accent**: #43E97B (Green)
- **Dark BG**: #0F0F1A
- **Card BG**: #1A1A2E
- **Text**: #FFFFFF and #A0AEC0

### Typography
- **Headings**: Poppins Bold
- **Body**: Inter Regular
- **Accent**: Space Grotesk

### Components
- Glassmorphism cards
- Gradient buttons
- Smooth animations
- Loading skeletons
- Toast notifications
- Confetti animations

## 📧 Email Features

Auto-send emails for:
- Welcome email on registration
- Task assignment notifications
- Event reminders (1 day before)
- Certificate ready notifications
- Monthly impact summary
- Password reset links

## 📱 Responsive Design

- Fully mobile responsive
- PWA manifest file
- Service worker for offline use
- App installable on mobile
- Mobile bottom navigation

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new volunteer
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Volunteer
- `GET /api/volunteer/leaderboard` - Get leaderboard
- `GET /api/volunteer/dashboard` - Get dashboard data
- `PUT /api/volunteer/task/:taskId/complete` - Complete task
- `POST /api/volunteer/event/:eventId/register` - Register for event

### Chat
- `POST /api/chat` - Send message to Pankh
- `POST /api/chat/generate-caption` - Generate social media caption

## 🚀 Deployment Guide

### 1. Frontend Deployment (Vercel)
1. Go to [Vercel](https://vercel.com/) and click "Add New" -> "Project".
2. Import your GitHub repository.
3. In the "Environment Variables" section, add:
   - `VITE_API_URL`: Your backend URL (e.g., `https://nayepankh-api.onrender.com/api`)
4. Click **Deploy**.

### 2. Backend Deployment (Render)
1. Go to [Render](https://render.com/) and click "New" -> "Web Service".
2. Connect your GitHub repository.
3. Set the following:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. In the "Environment Variables" section, add:
   - `PORT`: `5000`
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key
   - `ANTHROPIC_API_KEY`: Your Anthropic API key
   - `GMAIL_USER`: Your Gmail address
   - `GMAIL_PASS`: Your Gmail App Password
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: Your Vercel deployment URL
5. Click **Create Web Service**.

### 3. Database Setup (MongoDB Atlas)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and allow access from anywhere (IP `0.0.0.0/0`).
3. Copy the connection string and use it for `MONGODB_URI` in Render.


### Database (MongoDB Atlas)
```bash
# Create MongoDB Atlas cluster
# Get connection string
# Update MONGODB_URI in backend .env
```

## 📊 Analytics

Track:
- Total volunteers
- Active volunteers this month
- Total donations
- Hours contributed
- Events completed
- Lives impacted
- Geographic reach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- NayePankh Foundation for the mission and inspiration
- Anthropic for Claude API
- All volunteers and contributors

## 📞 Support

For support, email support@nayepankh.org or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Video tutorials for volunteers
- [ ] Advanced analytics dashboard
- [ ] Integration with payment gateways
- [ ] Multi-language support
- [ ] AI-powered volunteer matching
- [ ] Virtual volunteering options
- [ ] Blockchain-based certificates

---

**Made with ❤️ for NayePankh Foundation**
