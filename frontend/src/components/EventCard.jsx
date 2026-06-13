import React from "react";
import { motion } from "framer-motion";
import { formatDate } from "../utils/helpers";

const EventCard = ({ event, onRegister }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-lg overflow-hidden"
    >
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
      <p className="text-text-secondary text-sm mb-4">{event.description}</p>

      <div className="space-y-2 text-sm text-text-secondary mb-4">
        <div>📅 {formatDate(event.date)}</div>
        <div>📍 {event.location}</div>
        <div>👥 {event.registeredVolunteers?.length || 0} / {event.volunteersNeeded} volunteers</div>
      </div>

      <button
        onClick={onRegister}
        className="w-full btn-gradient py-2 rounded-lg text-white font-semibold"
      >
        Register Now
      </button>
    </motion.div>
  );
};

export default EventCard;
