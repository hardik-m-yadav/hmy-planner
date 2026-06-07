import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { FaBars, FaXmark, FaBrain } from "react-icons/fa6";
import {
  FaPlaneDeparture,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";

const links = [
  { name: "Home", path: "/" },
  { name: "Planner", path: "/planner" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-[#070b16]/75 backdrop-blur-2xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 text-white">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.08 }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-sky-400 flex items-center justify-center text-xl shadow-lg shadow-purple-500/30"
          >
            <FaBrain />
          </motion.div>

          <h1 className="text-xl md:text-2xl font-black">
            Hmy <span className="text-sky-400">Planner</span>
          </h1>
        </NavLink>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative transition ${
                  isActive ? "text-sky-400" : "text-gray-300 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeLink"
                      className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 to-sky-400 rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      
      <Link to="/dashboard">
        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="hidden lg:block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-sky-500 text-white font-semibold shadow-xl shadow-purple-500/30"
          
        >
          Get Started
        </motion.button>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white text-2xl"
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#070b16]/95 border-t border-white/10 px-6 py-6"
          >
            <div className="flex flex-col gap-5">
              {links.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-sky-400 font-semibold"
                        : "text-gray-300 hover:text-white"
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}


              <Link to="/dashboard">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-sky-500 text-white font-semibold"
              >
                Get Started
              </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;