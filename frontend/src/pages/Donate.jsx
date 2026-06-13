import React, { useState } from "react";
import { motion } from "framer-motion";
import DonationMeter from "../components/DonationMeter";
import { formatCurrency } from "../utils/helpers";

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({ name: "", email: "", message: "" });

  const donationTiers = [
    { amount: 100, impact: "Provides 1 meal" },
    { amount: 500, impact: "1 child educated for 1 month" },
    { amount: 1000, impact: "Full scholarship for 1 student" },
    { amount: 5000, impact: "Support 10 students for a month" },
  ];

  const recentDonors = [
    { name: "Rajesh Kumar", amount: 1000, date: "2 days ago" },
    { name: "Priya Singh", amount: 500, date: "1 week ago" },
    { name: "Amit Patel", amount: 2000, date: "2 weeks ago" },
    { name: "Neha Sharma", amount: 750, date: "3 weeks ago" },
  ];

  const handleDonate = () => {
    const amount = customAmount || selectedAmount;
    console.log("Donation:", { ...donorInfo, amount });
    // Payment integration would go here
  };

  return (
    <div className="min-h-screen bg-dark-bg py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">Make a Difference</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Your donation directly impacts the lives of underprivileged students and communities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 glass p-8 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Choose Donation Amount</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {donationTiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => {
                    setSelectedAmount(tier.amount);
                    setCustomAmount("");
                  }}
                  className={`p-4 rounded-lg transition ${
                    selectedAmount === tier.amount && !customAmount
                      ? "bg-primary text-white"
                      : "bg-dark-bg border border-primary/30 text-text-secondary hover:border-primary"
                  }`}
                >
                  <div className="font-bold">₹{tier.amount}</div>
                  <div className="text-xs mt-1">{tier.impact}</div>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-white mb-2">Custom Amount</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  if (e.target.value) setSelectedAmount(0);
                }}
                placeholder="Enter custom amount"
                className="w-full bg-dark-bg border border-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white mb-2">Full Name</label>
                <input
                  type="text"
                  value={donorInfo.name}
                  onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                  className="w-full bg-dark-bg border border-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                  className="w-full bg-dark-bg border border-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Message (Optional)</label>
                <textarea
                  value={donorInfo.message}
                  onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                  className="w-full bg-dark-bg border border-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                  rows="3"
                />
              </div>
            </div>

            <button
              onClick={handleDonate}
              className="w-full btn-gradient py-3 rounded-lg text-white font-bold text-lg"
            >
              Donate {formatCurrency(customAmount || selectedAmount)}
            </button>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Progress */}
            <div className="glass p-6 rounded-lg">
              <DonationMeter current={45000} goal={100000} />
            </div>

            {/* Impact Info */}
            <div className="glass p-6 rounded-lg">
              <h3 className="font-bold text-white mb-4">Your Impact</h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <div>✓ Tax benefits eligible</div>
                <div>✓ Donation receipt provided</div>
                <div>✓ Monthly impact report</div>
                <div>✓ Donor recognition</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Donors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Recent Donors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentDonors.map((donor, idx) => (
              <div key={idx} className="bg-dark-bg/50 p-4 rounded-lg">
                <p className="font-bold text-white">{donor.name}</p>
                <p className="text-primary font-bold">₹{donor.amount}</p>
                <p className="text-text-secondary text-sm">{donor.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Donate;
