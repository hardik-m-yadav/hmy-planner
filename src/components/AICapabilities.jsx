import React from "react";
import { motion } from "motion/react";
import {
  FaBrain,
  FaRobot,
  FaChartLine,
  FaClock,
  FaBullseye,
  FaLightbulb,
  FaCalendarCheck,
} from "react-icons/fa6";

const capabilities = [
  {
    icon: <FaCalendarCheck />,
    title: "AI Plan Generator",
    desc: "Creates a smart study timetable based on your subjects, goals, exam date, and available time.",
  },
  {
    icon: <FaBullseye />,
    title: "Weak Topic Detection",
    desc: "Finds topics where you need more revision and gives focused study suggestions.",
  },
  {
    icon: <FaClock />,
    title: "Revision Scheduler",
    desc: "Automatically plans revision sessions so you remember better before exams.",
  },
  {
    icon: <FaChartLine />,
    title: "Performance Analysis",
    desc: "Tracks your progress and shows subject-wise improvement with clear insights.",
  },
  {
    icon: <FaLightbulb />,
    title: "Smart Suggestions",
    desc: "Recommends what to study next based on your progress and pending tasks.",
  },
  {
    icon: <FaRobot />,
    title: "Exam Readiness",
    desc: "Predicts how prepared you are and helps you complete your goals faster.",
  },
];

const AICapabilities = () => {
  return (
    <section className="relative bg-[#070b16] text-white py-24 px-4 overflow-hidden">
      {/* Moving Grid */}
      <motion.div
        animate={{ backgroundPosition: ["0px 0px", "90px 90px"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:90px_90px]"
      />

      {/* Glow Orbs */}
      <motion.div
        animate={{ x: [0, 55, 0], y: [0, -35, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[-150px] w-[440px] h-[440px] bg-purple-600/25 blur-[160px] rounded-full"
      />

      <motion.div
        animate={{ x: [0, -55, 0], y: [0, 35, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-[-160px] w-[500px] h-[500px] bg-sky-500/20 blur-[170px] rounded-full"
      />

      {/* Particles */}
      {[...Array(14)].map((_, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -24, 0],
            opacity: [0.15, 0.65, 0.15],
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: 5 + i * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.18,
          }}
          className="absolute w-1.5 h-1.5 rounded-full bg-sky-300/60"
          style={{
            left: `${8 + i * 6}%`,
            top: `${18 + (i % 6) * 12}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="uppercase tracking-[5px] text-sky-300 text-sm font-semibold mb-4">
            AI Capabilities
          </p>

          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            More Than A Planner.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
              Your AI Study Coach.
            </span>
          </h2>

          <p className="text-gray-300 mt-6 text-base md:text-lg leading-8">
            Hmy Planner uses AI to understand your study routine, detect weak
            areas, create better plans, and keep you exam-ready.
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-[1fr_340px_1fr] gap-8 items-center">
          {/* Left Cards */}
          <div className="space-y-6">
            {capabilities.slice(0, 3).map((item, index) => (
              <CapabilityCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Center AI Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center min-h-[360px]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 rounded-full border border-dashed border-sky-400/30"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute w-56 h-56 rounded-full border border-dashed border-purple-400/30"
            />

            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-44 h-44 bg-gradient-to-br from-purple-500/30 to-sky-500/30 blur-[50px] rounded-full"
            />

            <div className="relative z-10 w-44 h-44 rounded-[2.5rem] bg-white/[0.07] border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center shadow-[0_25px_90px_rgba(56,189,248,0.18)]">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center text-4xl shadow-xl shadow-purple-500/30 mb-4"
              >
                <FaBrain />
              </motion.div>

              <h3 className="font-black text-xl">AI Core</h3>
              <p className="text-gray-400 text-sm">Study Engine</p>
            </div>
          </motion.div>

          {/* Right Cards */}
          <div className="space-y-6">
            {capabilities.slice(3).map((item, index) => (
              <CapabilityCard key={index} item={item} index={index + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CapabilityCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] hover:bg-white/[0.07] backdrop-blur-xl p-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:scale-[1.015] hover:border-sky-400/30 shadow-[0_10px_40px_rgba(0,0,0,0.22)] hover:shadow-[0_25px_80px_rgba(56,189,248,0.12)] transform-gpu"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-500/10" />

      <div className="absolute -right-24 -bottom-24 w-52 h-52 bg-purple-500/15 blur-[90px] rounded-full group-hover:bg-sky-500/20 transition-all duration-1000" />

      <div className="relative z-10 flex items-start gap-5">
        <div className="min-w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
          {item.icon}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2 transition-colors duration-500 group-hover:text-sky-200">
            {item.title}
          </h3>

          <p className="text-gray-300 leading-7 text-sm transition-colors duration-500 group-hover:text-gray-200">
            {item.desc}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-6 h-[1px] bg-white/10 overflow-hidden">
        <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-purple-400 to-sky-400 transition-all duration-700 ease-out" />
      </div>
    </motion.div>
  );
};

export default AICapabilities;