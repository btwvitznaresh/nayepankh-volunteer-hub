import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Impact = () => {
  const monthlyData = [
    { month: "Jan", volunteers: 100, donations: 50000 },
    { month: "Feb", volunteers: 150, donations: 65000 },
    { month: "Mar", volunteers: 200, donations: 75000 },
    { month: "Apr", volunteers: 280, donations: 85000 },
    { month: "May", volunteers: 350, donations: 95000 },
    { month: "Jun", volunteers: 450, donations: 110000 },
  ];

  const categoryData = [
    { name: "Education", value: 40 },
    { name: "Healthcare", value: 25 },
    { name: "Environment", value: 20 },
    { name: "Technology", value: 15 },
  ];

  const COLORS = ["#6C63FF", "#FF6584", "#43E97B", "#FFB347"];

  const stories = [
    {
      title: "Raj's Success Story",
      description: "From struggling student to tech professional with help from our volunteers",
      impact: "100+ hours invested",
    },
    {
      title: "Village Transformation",
      description: "A small village got access to quality education through our programs",
      impact: "500+ lives touched",
    },
    {
      title: "Healthcare Initiative",
      description: "Free health camps organized in underprivileged communities",
      impact: "1000+ people served",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Our Impact</h1>
          <p className="text-xl text-text-secondary">
            See the real difference we're making together
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Total Volunteers", value: "5,000+", icon: "👥" },
            { label: "Lives Touched", value: "50,000+", icon: "❤️" },
            { label: "Hours Contributed", value: "100,000+", icon: "⏱️" },
            { label: "Donations Raised", value: "₹50L+", icon: "💰" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-lg text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-text-secondary text-sm mb-1">{stat.label}</p>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Monthly Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" />
                <Tooltip contentStyle={{ backgroundColor: "#1A1A2E", border: "1px solid #6C63FF" }} />
                <Legend />
                <Line type="monotone" dataKey="volunteers" stroke="#6C63FF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Impact by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Stories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="glass p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-text-secondary mb-4">{story.description}</p>
                <div className="text-accent font-semibold">{story.impact}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Donation Meter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-lg text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Live Donation Meter</h2>
          <div className="text-5xl font-bold text-primary mb-2">₹45,00,000</div>
          <p className="text-text-secondary mb-6">Raised towards our mission</p>
          <div className="w-full bg-dark-bg rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              transition={{ duration: 2 }}
              className="h-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Impact;
