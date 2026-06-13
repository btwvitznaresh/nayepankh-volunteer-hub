import React from "react";
import { motion } from "framer-motion";

const BadgeCard = ({ badge, earned = false }) => {
  const badgeEmojis = {
    "First Step": "🚀",
    Helper: "🤝",
    Champion: "🏆",
    Legend: "👑",
    Ambassador: "⭐",
  };

  const badgeDescriptions = {
    "First Step": "Register as a volunteer",
    Helper: "Complete 5 tasks",
    Champion: "Contribute 50 hours",
    Legend: "Contribute 100 hours",
    Ambassador: "Refer 10 people",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-lg glass text-center cursor-pointer transition ${
        earned ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="text-4xl mb-2">{badgeEmojis[badge] || "🎖️"}</div>
      <h3 className="font-bold text-white mb-1">{badge}</h3>
      <p className="text-text-secondary text-sm">
        {badgeDescriptions[badge]}
      </p>
      {earned && (
        <div className="mt-2 text-accent">✓ Earned</div>
      )}
    </motion.div>
  );
};

export default BadgeCard;
