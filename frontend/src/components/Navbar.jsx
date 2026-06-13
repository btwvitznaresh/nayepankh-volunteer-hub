import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-dark-card border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-2xl"
            >
              🦋
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NayePankh
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-text-secondary hover:text-primary transition"
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="text-text-secondary hover:text-primary transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/events"
                  className="text-text-secondary hover:text-primary transition"
                >
                  Events
                </Link>
                <Link
                  to="/chat"
                  className="text-text-secondary hover:text-primary transition"
                >
                  Chat
                </Link>
                <Link
                  to="/impact"
                  className="text-text-secondary hover:text-primary transition"
                >
                  Impact
                </Link>
              </>
            )}
            <Link
              to="/donate"
              className="text-text-secondary hover:text-primary transition"
            >
              Donate
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-text-secondary">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="btn-gradient px-6 py-2 rounded-lg text-white font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-primary hover:text-secondary transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-gradient px-6 py-2 rounded-lg text-white font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            <Link
              to="/"
              className="block px-4 py-2 text-text-secondary hover:text-primary"
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-text-secondary hover:text-primary"
                >
                  Dashboard
                </Link>
                <Link
                  to="/events"
                  className="block px-4 py-2 text-text-secondary hover:text-primary"
                >
                  Events
                </Link>
                <Link
                  to="/chat"
                  className="block px-4 py-2 text-text-secondary hover:text-primary"
                >
                  Chat
                </Link>
              </>
            )}
            <Link
              to="/donate"
              className="block px-4 py-2 text-text-secondary hover:text-primary"
            >
              Donate
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-primary"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-primary"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
