import React from "react";
import { motion } from "motion/react";
import {
  FaBrain,
  FaRocket,
  FaPlay,
  FaChartLine,
  FaClock,
  FaCheck,
} from "react-icons/fa6";

const CTA = () => {
  return (
    <section className="relative isolate bg-[#070b16] text-white py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.2),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.16),transparent_35%)]" />

      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -22, 0],
            x: [0, i % 2 === 0 ? 8 : -8, 0],
            opacity: [0.12, 0.55, 0.12],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 5 + i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
          className="absolute w-1 h-1 rounded-full bg-sky-300/70 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          style={{
            left: `${6 + i * 5}%`,
            top: `${18 + (i % 6) * 12}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.7rem] border border-white/10 bg-white/[0.045] backdrop-blur-2xl p-6 md:p-10 shadow-[0_35px_120px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-500/10" />

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-sky-400/20 text-sky-200 text-sm font-semibold mb-6">
                <FaRocket />
                Your AI Study Partner
              </div>

              <h2 className="text-4xl md:text-6xl font-black leading-tight">
                Ready To Transform
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
                  Your Study Routine?
                </span>
              </h2>

              <p className="text-gray-300 mt-6 leading-8 text-base md:text-lg max-w-xl">
                Let AI organize your subjects, create smart schedules, track
                progress, and guide you toward better results every day.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-9">
                <button className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-sky-500 text-white font-bold shadow-xl shadow-purple-500/25 transition-all duration-500 hover:shadow-sky-500/25">
                  <span className="flex items-center justify-center gap-2">
                    <FaRocket className="transition-transform duration-500 group-hover:-translate-y-1" />
                    Start Free Today
                  </span>
                </button>

                <button className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-[#070b16] border border-white/10 font-bold transition-all duration-500">
                  <span className="flex items-center justify-center gap-2">
                    <FaPlay />
                    Watch Demo
                  </span>
                </button>
              </div>

              <p className="text-gray-400 text-sm mt-7">
                Built for JEE • NEET • School • College • Competitive Exams
              </p>
            </div>

            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-[2.2rem] border border-white/10 bg-[#070b16]/80 p-6 overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-sky-500/10" />

                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">AI Plan Ready</p>
                    <h3 className="text-2xl font-black">Today’s Focus</h3>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center text-2xl">
                    <FaBrain />
                  </div>
                </div>

                <div className="relative z-10 space-y-4">
                  {[
                    ["Physics Revision", "85%", <FaChartLine />],
                    ["Math Practice", "72%", <FaClock />],
                    ["Chemistry Notes", "100%", <FaCheck />],
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-white/[0.055] border border-white/10 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center gap-2">
                          <span className="text-sky-300">{item[2]}</span>
                          {item[0]}
                        </span>
                        <span className="text-sky-300">{item[1]}</span>
                      </div>

                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: item[1] }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.15 }}
                          className="h-full bg-gradient-to-r from-purple-500 to-sky-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="absolute -top-5 -right-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-gray-300 text-xs">AI Accuracy</p>
                <h4 className="font-black text-sky-300">94%</h4>
              </div>

              <div className="absolute -bottom-5 -left-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-gray-300 text-xs">Focus Boost</p>
                <h4 className="font-black text-purple-300">2.4x</h4>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;