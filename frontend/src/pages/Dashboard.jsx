import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import BadgeCard from "../components/BadgeCard";
import api from "../utils/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/volunteer/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-dark-bg flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-dark-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-lg mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}! 👋</h1>
          <p className="text-text-secondary">Keep up the great work making a difference!</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Points", value: user?.points || 0, icon: "⭐" },
            { label: "Hours", value: user?.volunteeringHours || 0, icon: "⏱️" },
            { label: "Tasks", value: user?.tasksCompleted || 0, icon: "✓" },
            { label: "Badges", value: user?.badges?.length || 0, icon: "🎖️" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-lg text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <p className="text-text-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["First Step", "Helper", "Champion", "Legend", "Ambassador"].map((badge) => (
              <BadgeCard
                key={badge}
                badge={badge}
                earned={user?.badges?.includes(badge)}
              />
            ))}
          </div>
        </div>

        {/* Tasks and Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assigned Tasks */}
          <div className="glass p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Assigned Tasks</h2>
            {dashboard?.tasks?.length > 0 ? (
              <div className="space-y-3">
                {dashboard.tasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-dark-bg/50 p-4 rounded-lg border-l-4 border-primary"
                  >
                    <h3 className="font-bold text-white">{task.title}</h3>
                    <p className="text-text-secondary text-sm">{task.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-accent text-sm">+{task.pointsReward} points</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.status === "completed" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary">No tasks assigned yet</p>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="glass p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            {dashboard?.upcomingEvents?.length > 0 ? (
              <div className="space-y-3">
                {dashboard.upcomingEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-dark-bg/50 p-4 rounded-lg border-l-4 border-secondary"
                  >
                    <h3 className="font-bold text-white">{event.title}</h3>
                    <p className="text-text-secondary text-sm">{event.location}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-text-secondary text-sm">📅 {new Date(event.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary">No upcoming events</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
