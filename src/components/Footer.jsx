import React from "react";
import { motion } from "motion/react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative isolate bg-[#070b16] text-white overflow-hidden">
      {/* Top Border */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(168,85,247,0.12),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(56,189,248,0.08),transparent_35%)]" />
      </div>

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
          className="absolute w-1 h-1 rounded-full bg-sky-300/70"
          style={{
            left: `${10 + i * 7}%`,
            top: `${20 + (i % 4) * 15}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
              Hmy Planner
            </h2>

            <p className="text-gray-400 mt-4 leading-7 max-w-md">
              AI-powered study planning platform helping students stay
              productive, organized, and focused on achieving their goals.
            </p>

            <div className="flex gap-4 mt-6">
              {[
                <FaGithub />,
                <FaLinkedin />,
                <FaInstagram />,
                <FaXTwitter />,
              ].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-sky-400/30 hover:bg-sky-500/10 transition-all duration-500"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-lg mb-5">Product</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-sky-300 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-300 transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-300 transition">
                  AI Planner
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-300 transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-5">Resources</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-sky-300 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-300 transition">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-300 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-300 transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-5">Legal</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-sky-300 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-300 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-300 transition">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Hmy Planner. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Built with ❤️ for students worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;