import React from "react";
import { motion } from "motion/react";
import {
  FaRobot,
  FaCalendarCheck,
  FaChartLine,
  FaClock,
  FaBolt,
  FaBookOpen,
} from "react-icons/fa6";

const Hero = () => {
  const bars = [45, 70, 55, 90, 65, 80, 95];

  const smooth = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <section className="relative min-h-screen bg-[#070b16] text-white overflow-hidden px-4 pt-32 pb-20">
      {/* Smooth Background Glow */}
      <motion.div
        animate={{ x: [0, 35, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[-120px] w-[380px] h-[380px] bg-purple-600/30 blur-[140px] rounded-full"
      />

      <motion.div
        animate={{ x: [0, -35, 0], y: [0, -25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-[-140px] w-[450px] h-[450px] bg-sky-500/25 blur-[150px] rounded-full"
      />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px] opacity-20"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center relative z-10">
        {/* Left */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.13,
              },
            },
          }}
          className="text-center lg:text-left"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 25 },
              show: { opacity: 1, y: 0, transition: smooth },
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-sky-300 text-sm mb-6"
          >
            <FaRobot />
            AI Powered Study Planner
          </motion.span>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 45 },
              show: { opacity: 1, y: 0, transition: smooth },
            }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight"
          >
            Plan Smarter.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-sky-400 to-purple-400">
              Study Better.
            </span>
            Achieve Faster.
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 35 },
              show: { opacity: 1, y: 0, transition: smooth },
            }}
            className="text-gray-300 mt-6 text-base sm:text-lg leading-8 max-w-xl mx-auto lg:mx-0"
          >
            Hmy Planner creates smart study schedules, tracks your progress,
            manages subjects, and gives AI suggestions to improve your daily
            learning routine.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 35 },
              show: { opacity: 1, y: 0, transition: smooth },
            }}
            className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-sky-500 text-white font-bold shadow-2xl shadow-purple-500/30"
            >
              Create AI Plan
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="px-8 py-4 rounded-full border border-white/15 text-white hover:bg-white hover:text-black transition"
            >
              View Features
            </motion.button>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 35 },
              show: { opacity: 1, y: 0, transition: smooth },
            }}
            className="grid grid-cols-3 gap-3 mt-10 max-w-xl mx-auto lg:mx-0"
          >
            {[
              ["94%", "Goal Success"],
              ["85%", "Focus Improvement"],
              ["24/7", "AI Assistant"],
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-4"
              >
                <h3 className="text-xl md:text-2xl font-black text-sky-300">
                  {item[0]}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">{item[1]}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative"
        >
          <div className="relative bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[2rem] p-5 md:p-7 shadow-2xl overflow-hidden">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-500/30 blur-[80px] rounded-full"></div>

            <div className="flex items-center justify-between mb-6 relative z-10">
              <div>
                <p className="text-gray-400 text-sm">Today’s AI Plan</p>
                <h3 className="text-2xl font-bold">Study Dashboard</h3>
              </div>

              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center"
              >
                <FaRobot />
              </motion.div>
            </div>

            <div className="space-y-4 relative z-10">
              {[
                {
                  icon: <FaCalendarCheck className="text-sky-400" />,
                  title: "Mathematics",
                  time: "2 hrs",
                  width: "75%",
                },
                {
                  icon: <FaClock className="text-orange-300" />,
                  title: "Physics Revision",
                  time: "1.5 hrs",
                  width: "55%",
                },
              ].map((task, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.025, y: -5 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="bg-[#070b16]/70 rounded-2xl p-5 border border-white/10"
                >
                  <div className="flex justify-between mb-3">
                    <span className="flex items-center gap-2">
                      {task.icon}
                      {task.title}
                    </span>
                    <span className="text-purple-300">{task.time}</span>
                  </div>

                  <div className="w-full h-2 bg-white/10 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: task.width }}
                      transition={{
                        duration: 1.4,
                        delay: 0.5 + index * 0.2,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="h-2 bg-gradient-to-r from-purple-500 to-sky-400 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}

              <motion.div
                whileHover={{ scale: 1.025, y: -5 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="bg-[#070b16]/70 rounded-2xl p-5 border border-white/10"
              >
                <div className="flex justify-between mb-3">
                  <span className="flex items-center gap-2">
                    <FaChartLine className="text-green-400" />
                    Weekly Progress
                  </span>
                  <span className="text-green-400">82%</span>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className="h-24 bg-white/10 rounded-xl flex items-end overflow-hidden"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{
                          duration: 0.9,
                          delay: 0.7 + i * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full bg-gradient-to-t from-purple-500 to-sky-400 rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-5 -right-2 md:-right-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 shadow-xl"
          >
            <p className="text-sm text-gray-300">AI Suggestion</p>
            <h4 className="font-bold text-sky-300">Revise weak topics</h4>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-2 md:-left-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center">
                <FaBolt />
              </div>
              <div>
                <p className="text-sm text-gray-300">Focus Score</p>
                <h4 className="font-bold text-purple-300">92%</h4>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block absolute top-1/2 -left-16 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <FaBookOpen className="text-sky-300" />
              <div>
                <p className="text-sm text-gray-300">Next Task</p>
                <h4 className="font-bold">Chemistry Notes</h4>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;