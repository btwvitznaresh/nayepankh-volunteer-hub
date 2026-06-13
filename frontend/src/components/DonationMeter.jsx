import React from "react";
import { motion } from "framer-motion";

const DonationMeter = ({ current = 0, goal = 100000 }) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-white">Donation Goal</h3>
        <span className="text-text-secondary">
          ₹{current.toLocaleString()} / ₹{goal.toLocaleString()}
        </span>
      </div>

      <div className="w-full bg-dark-bg rounded-full h-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>

      <div className="mt-2 text-text-secondary text-sm">
        {Math.round(percentage)}% funded
      </div>
    </div>
  );
};

export default DonationMeter;
