import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImpactCounter from "../components/ImpactCounter";
import DonationMeter from "../components/DonationMeter";

const Landing = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl" />

        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Empower Change
              </span>
              <br />
              <span className="text-white">Through Volunteering</span>
            </h1>

            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Join NayePankh Foundation and make a real difference in the lives of underprivileged students and communities across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-gradient px-8 py-3 rounded-lg text-white font-bold text-lg"
              >
                Start Volunteering
              </Link>
              <Link
                to="/donate"
                className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold text-lg hover:bg-primary/10 transition"
              >
                Make a Donation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 bg-dark-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Impact</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ImpactCounter end={5000} label="Volunteers" />
            <ImpactCounter end={50000} label="Lives Touched" />
            <ImpactCounter end={100000} label="Hours Contributed" suffix="+" />
            <ImpactCounter end={50} label="Cities Reached" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Register",
                description: "Create your volunteer profile and tell us about your skills",
              },
              {
                step: "2",
                title: "Choose Events",
                description: "Browse and register for volunteering opportunities",
              },
              {
                step: "3",
                title: "Make Impact",
                description: "Contribute your time and earn badges and certificates",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="glass p-8 rounded-lg text-center"
              >
                <div className="text-5xl font-bold text-primary mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 px-4 bg-dark-card/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Support Our Mission</h2>
          <DonationMeter current={45000} goal={100000} />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { amount: "₹100", impact: "Provides 1 meal" },
              { amount: "₹500", impact: "1 child educated for 1 month" },
              { amount: "₹1000+", impact: "Full scholarship for 1 student" },
            ].map((tier, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="glass p-6 rounded-lg text-center"
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {tier.amount}
                </div>
                <p className="text-text-secondary">{tier.impact}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/donate"
              className="btn-gradient px-8 py-3 rounded-lg text-white font-bold inline-block"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
