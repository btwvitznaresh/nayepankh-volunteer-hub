import React, { useState } from "react";
import { motion } from "framer-motion";
import EventCard from "../components/EventCard";

const Events = () => {
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mock events data
  const events = [
    {
      _id: "1",
      title: "Teaching Workshop",
      description: "Help underprivileged students with basic education",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: "Mumbai",
      city: "Mumbai",
      category: "Education",
      volunteersNeeded: 10,
      registeredVolunteers: [],
      hoursPerVolunteer: 4,
    },
    {
      _id: "2",
      title: "Tech Bootcamp",
      description: "Teach coding and digital skills",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      location: "Bangalore",
      city: "Bangalore",
      category: "Technology",
      volunteersNeeded: 15,
      registeredVolunteers: [],
      hoursPerVolunteer: 8,
    },
    {
      _id: "3",
      title: "Community Cleanup",
      description: "Help clean and beautify local communities",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      location: "Delhi",
      city: "Delhi",
      category: "Environment",
      volunteersNeeded: 20,
      registeredVolunteers: [],
      hoursPerVolunteer: 3,
    },
  ];

  const cities = ["All", "Mumbai", "Bangalore", "Delhi", "Chennai", "Kolkata"];
  const categories = ["All", "Education", "Technology", "Environment", "Healthcare"];

  const filteredEvents = events.filter((event) => {
    const cityMatch = selectedCity === "All" || event.city === selectedCity;
    const categoryMatch = selectedCategory === "All" || event.category === selectedCategory;
    return cityMatch && categoryMatch;
  });

  const handleRegister = (eventId) => {
    console.log("Registered for event:", eventId);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Volunteering Events</h1>
          <p className="text-xl text-text-secondary">
            Find and join events that match your skills and interests
          </p>
        </motion.div>

        {/* Filters */}
        <div className="glass p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white mb-2 font-semibold">City</label>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 rounded-lg transition ${
                      selectedCity === city
                        ? "bg-primary text-white"
                        : "bg-dark-bg border border-primary/30 text-text-secondary hover:border-primary"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 font-semibold">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition ${
                      selectedCategory === category
                        ? "bg-secondary text-white"
                        : "bg-dark-bg border border-secondary/30 text-text-secondary hover:border-secondary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onRegister={() => handleRegister(event._id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-2xl text-text-secondary">No events found</p>
            <p className="text-text-secondary mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
