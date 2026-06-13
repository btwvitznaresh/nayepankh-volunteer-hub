# 🦋 NayePankh Smart Volunteer Hub - Submission Report

## 🚀 Project Overview
**NayePankh Smart Volunteer Hub** is a state-of-the-art full-stack platform designed to revolutionize how NayePankh Foundation manages its volunteer community. The application combines modern web technologies with AI capabilities to create an engaging, efficient, and impactful experience for both volunteers and administrators.

## 🔗 Submission Links
- **GitHub Repository**: [https://github.com/btwvitznaresh/nayepankh-volunteer-hub](https://github.com/btwvitznaresh/nayepankh-volunteer-hub)
- **Live Demo**: *[Your Vercel URL will go here after you complete Step 1]*

## 🛠️ Technical Implementation

### **Frontend Excellence**
- **React 19 + Vite**: Leveraging the latest React features for a blazing-fast user interface.
- **Tailwind CSS v4**: A modern, utility-first styling approach with a custom-designed dark theme.
- **Framer Motion**: Smooth, cinematic animations that enhance the user experience.
- **Recharts**: Professional-grade data visualizations for impact tracking.
- **Responsive Design**: A seamless experience across mobile, tablet, and desktop devices.

### **Robust Backend**
- **Node.js & Express**: A scalable and performant server architecture.
- **MongoDB Atlas**: A cloud-native database for secure and reliable data storage.
- **JWT Authentication**: Secure, token-based authentication with role-based access control.
- **Anthropic Claude API**: Powering "Pankh," the intelligent AI assistant.

## ✨ Key Features Delivered

### 1. **Pankh AI Assistant** 🦋
An intelligent chatbot that guides volunteers, answers FAQs, suggests roles based on skills, and even generates social media content for awareness campaigns.

### 2. **Gamified Volunteer Experience** 🎖️
A comprehensive points and badge system that rewards volunteer contributions, featuring a real-time leaderboard to foster community engagement.

### 3. **Impact Analytics Dashboard** 📊
Transparent and beautiful visualizations of the foundation's reach, including volunteer growth, donation trends, and lives touched.

### 4. **Event Management System** 🎯
A streamlined way for volunteers to discover and register for opportunities that match their skills and interests.

### 5. **Donation Hub** 💰
A dedicated space for supporters to contribute, with clear impact metrics showing exactly how their donations help.

## 📋 Deployment Instructions

### **Step 1: Deploy Frontend (Vercel)**
1. Connect your GitHub repo to Vercel.
2. Add Environment Variable: `VITE_API_URL` = `[Your Render Backend URL]/api`.
3. Deploy!

### **Step 2: Deploy Backend (Render)**
1. Create a "New Web Service" on Render.
2. Connect your GitHub repo.
3. Set **Root Directory** to `backend`.
4. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secure random string.
   - `ANTHROPIC_API_KEY`: Your Anthropic API key.
   - `GMAIL_USER`: Your email for notifications.
   - `GMAIL_PASS`: Your Gmail App Password.
   - `FRONTEND_URL`: Your Vercel URL.
5. Deploy!

## 📸 Project Visuals
The GitHub repository's README has been updated with high-quality mockup screenshots of the Landing Page, Dashboard, AI Chatbot, Impact Analytics, and Events listing.

---
**This project was built with a focus on impact, transparency, and modern user experience to help NayePankh Foundation reach its goals.**
