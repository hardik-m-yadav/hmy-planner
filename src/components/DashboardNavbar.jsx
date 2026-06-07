import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiFileText,
  FiCalendar,
  FiBarChart2,
  FiUser,
  FiMenu,
  FiX,
  FiZap,
} from "react-icons/fi";

const DashboardNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/", icon: <FiHome /> },
    { name: "Dashboard", path: "/dashboard", icon: <FiCheckSquare /> },
    { name: "Notes", path: "/notes", icon: <FiFileText /> },
    { name: "Calendar", path: "/calendar", icon: <FiCalendar /> },
    { name: "Analytics", path: "/analytics", icon: <FiBarChart2 /> },
    { name: "AI Planner", path: "/ai-planner", icon: <FiBarChart2 /> },
    { name: "Profile", path: "/profile", icon: <FiUser /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <header className="sticky bg-transparent top-0 z-50 border-b border-white/10 backdrop-blur-xl mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-3 group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.25)]">
                <FiZap className="text-lg text-white" />
              </div>

              <div>
                <h2 className="font-black text-xl bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                  HMY Planner
                </h2>
              </div>
            </NavLink>

            {/* Desktop Links */}
            <nav className="hidden lg:flex items-center gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-5 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-400/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#050914]">
            <div className="px-4 py-4 flex flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300"
                        : "text-gray-400 bg-white/5"
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 backdrop-blur-xl bg-[#050914]/90">
        <div className="grid grid-cols-6">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-3 text-[11px] transition-all ${
                  isActive ? "text-cyan-300" : "text-gray-500"
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;