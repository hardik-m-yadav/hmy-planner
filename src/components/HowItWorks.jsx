import React from "react";
import { motion } from "motion/react";
import {
  FaBookOpen,
  FaBullseye,
  FaRobot,
  FaChartLine,
} from "react-icons/fa6";

const steps = [
  {
    icon: <FaBookOpen />,
    number: "01",
    title: "Add Your Subjects",
    desc: "Enter your subjects, chapters, weak topics and upcoming exam details.",
  },
  {
    icon: <FaBullseye />,
    number: "02",
    title: "Set Study Goals",
    desc: "Choose your daily study hours, deadlines and target completion date.",
  },
  {
    icon: <FaRobot />,
    number: "03",
    title: "AI Creates Plan",
    desc: "AI generates a smart timetable based on your time and priorities.",
  },
  {
    icon: <FaChartLine />,
    number: "04",
    title: "Track Progress",
    desc: "Complete tasks, monitor focus score and improve your study routine.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative bg-[#070b16] text-white py-24 px-4 overflow-hidden">
      {/* Moving Glow */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[-150px] w-[450px] h-[450px] bg-purple-500/20 blur-[150px] rounded-full"
      />

      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-[-150px] w-[500px] h-[500px] bg-sky-500/20 blur-[160px] rounded-full"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="uppercase tracking-[5px] text-sky-300 text-sm font-semibold mb-4">
            How It Works
          </p>

          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Create Your Study Plan
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
              In 4 Simple Steps
            </span>
          </h2>

          <p className="text-gray-300 mt-6 text-base md:text-lg leading-8">
            From adding subjects to tracking progress, Hmy Planner makes your
            study routine smarter, easier and more productive.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:scale-[1.015] hover:border-sky-400/30 shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_80px_rgba(56,189,248,0.15)] transform-gpu will-change-transform">
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-500/10 transition-opacity duration-700" />

                {/* Orb */}
                <div className="absolute -right-24 -bottom-24 w-56 h-56 rounded-full bg-purple-500/10 blur-[90px] transition-all duration-1000 group-hover:bg-sky-500/20" />

                {/* Number */}
                <h1 className="absolute top-4 right-6 text-7xl font-black text-white/[0.04] transition-all duration-500 group-hover:text-white/[0.08]">
                  {step.number}
                </h1>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30 mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 transition-colors duration-500 group-hover:text-sky-200">
                    {step.title}
                  </h3>

                  <p className="text-gray-300 leading-7 transition-colors duration-500 group-hover:text-gray-200">
                    {step.desc}
                  </p>
                </div>

                {/* Line */}
                <div className="relative z-10 mt-8 h-[2px] bg-white/10 overflow-hidden rounded-full">
                  <div className="h-full w-0 bg-gradient-to-r from-purple-400 to-sky-400 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;