import React from "react";
import { motion } from "motion/react";
import {
  FaRobot,
  FaChartLine,
  FaClock,
  FaBookOpen,
  FaBell,
  FaCalendarDays,
  FaBolt,
  FaCheck,
  FaMagnifyingGlass,
  FaBrain,
  FaFire,
} from "react-icons/fa6";

const tasks = [
  { title: "Algebra Practice", subject: "Mathematics", time: "09:00 AM", value: 82 },
  { title: "Physics Numericals", subject: "Physics", time: "11:30 AM", value: 64 },
  { title: "Organic Notes", subject: "Chemistry", time: "02:00 PM", value: 48 },
];

const subjects = [
  { name: "Math", value: 82 },
  { name: "Physics", value: 64 },
  { name: "Chemistry", value: 48 },
  { name: "English", value: 91 },
];

const bars = [48, 72, 55, 88, 66, 92, 78];

const DashboardPreview = () => {
  return (
    <section className="relative bg-[#070b16] text-white py-24 px-4 overflow-hidden">
      {/* Animated Grid */}
      <motion.div
        animate={{ backgroundPosition: ["0px 0px", "90px 90px"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:90px_90px]"
      />

      {/* Glow */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[-160px] w-[500px] h-[500px] bg-purple-600/25 blur-[170px] rounded-full"
      />

      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-[-170px] w-[520px] h-[520px] bg-sky-500/20 blur-[180px] rounded-full"
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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="uppercase tracking-[5px] text-sky-300 text-sm font-semibold mb-4">
            Hmy Dashboard
          </p>

          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            A Smarter Way To
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
              Control Your Studies
            </span>
          </h2>

          <p className="text-gray-300 mt-6 text-base md:text-lg leading-8">
            Manage your timetable, AI suggestions, focus score, subjects,
            reminders and progress from one beautiful study dashboard.
          </p>
        </motion.div>

        {/* App Frame */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.045] backdrop-blur-2xl p-3 md:p-5 shadow-[0_35px_120px_rgba(0,0,0,0.45)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-500/10"></div>
          <div className="absolute -top-32 right-20 w-80 h-80 bg-sky-500/20 blur-[120px] rounded-full"></div>

          {/* Mac Dots */}
          <div className="relative z-10 flex items-center gap-2 px-3 py-3">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
          </div>

          <div className="relative z-10 grid lg:grid-cols-[240px_1fr] gap-4">
            {/* Sidebar */}
            <aside className="hidden lg:block rounded-[2rem] bg-[#070b16]/80 border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center">
                  <FaBrain />
                </div>
                <div>
                  <h3 className="font-black">Hmy Planner</h3>
                  <p className="text-xs text-gray-400">AI Workspace</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  ["Overview", <FaChartLine />],
                  ["Planner", <FaCalendarDays />],
                  ["Subjects", <FaBookOpen />],
                  ["Focus Timer", <FaClock />],
                  ["Reminders", <FaBell />],
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-500 ${
                      index === 0
                        ? "bg-gradient-to-r from-purple-500 to-sky-500 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item[1]}
                    <span>{item[0]}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl bg-white/[0.05] border border-white/10 p-5">
                <FaRobot className="text-sky-300 text-2xl mb-4" />
                <h4 className="font-bold mb-2">AI Coach</h4>
                <p className="text-gray-400 text-sm leading-6">
                  Your plan is optimized for better revision today.
                </p>
              </div>
            </aside>

            {/* Main */}
            <main className="rounded-[2rem] bg-[#070b16]/70 border border-white/10 p-4 md:p-6 overflow-hidden">
              {/* Topbar */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Welcome back, Hardik 👋</p>
                  <h3 className="text-2xl md:text-3xl font-black">
                    Today’s Study Overview
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3 text-gray-400">
                    <FaMagnifyingGlass />
                    <span className="text-sm">Search tasks...</span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-sky-300">
                    <FaBell />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
                {[
                  ["Focus Score", "92%", <FaBolt />, "text-sky-300"],
                  ["Tasks Done", "14/18", <FaCheck />, "text-green-300"],
                  ["Study Time", "6.5h", <FaClock />, "text-purple-300"],
                  ["Streak", "12 Days", <FaFire />, "text-orange-300"],
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="group relative rounded-[1.7rem] bg-white/[0.045] hover:bg-white/[0.07] border border-white/10 hover:border-sky-400/30 p-5 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-[1.01] transform-gpu"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-purple-500/10 to-sky-500/10 transition-opacity duration-700"></div>

                    <div className="relative z-10 flex items-center justify-between mb-4">
                      <p className="text-gray-400 text-sm">{stat[0]}</p>
                      <div className={`text-xl ${stat[3]}`}>{stat[2]}</div>
                    </div>

                    <h4 className="relative z-10 text-3xl font-black">
                      {stat[1]}
                    </h4>
                  </div>
                ))}
              </div>

              <div className="grid xl:grid-cols-12 gap-5">
                {/* Schedule */}
                <div className="xl:col-span-5 rounded-[2rem] bg-white/[0.045] border border-white/10 p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-gray-400 text-sm">Schedule</p>
                      <h4 className="text-xl font-bold">AI Timetable</h4>
                    </div>
                    <FaCalendarDays className="text-sky-300" />
                  </div>

                  <div className="space-y-4">
                    {tasks.map((task, index) => (
                      <div
                        key={index}
                        className="group rounded-2xl bg-[#070b16]/70 border border-white/10 p-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.06] hover:-translate-y-1 hover:border-sky-400/25 transform-gpu"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h5 className="font-bold">{task.title}</h5>
                            <p className="text-sm text-gray-400">
                              {task.subject} • {task.time}
                            </p>
                          </div>
                          <span className="text-sky-300 text-sm">
                            {task.value}%
                          </span>
                        </div>

                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${task.value}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: index * 0.12,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-full bg-gradient-to-r from-purple-500 to-sky-400 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="xl:col-span-4 rounded-[2rem] bg-white/[0.045] border border-white/10 p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-gray-400 text-sm">Analytics</p>
                      <h4 className="text-xl font-bold">Weekly Progress</h4>
                    </div>
                    <FaChartLine className="text-green-300" />
                  </div>

                  <div className="grid grid-cols-7 gap-3 h-56 items-end">
                    {bars.map((bar, index) => (
                      <div
                        key={index}
                        className="h-full flex items-end rounded-2xl bg-white/[0.045] overflow-hidden"
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${bar}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            delay: index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="w-full rounded-2xl bg-gradient-to-t from-purple-500 to-sky-400"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className="xl:col-span-3 space-y-5">
                  <div className="rounded-[2rem] bg-gradient-to-br from-purple-500/20 to-sky-500/10 border border-white/10 p-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-sky-300 mb-5">
                      <FaRobot />
                    </div>

                    <p className="text-sky-300 text-sm mb-2">AI Suggestion</p>
                    <h4 className="text-xl font-bold mb-3">
                      Revise Physics numericals today.
                    </h4>
                    <p className="text-gray-300 text-sm leading-6">
                      AI found lower progress in problem-solving compared to theory.
                    </p>
                  </div>

                  <div className="rounded-[2rem] bg-white/[0.045] border border-white/10 p-5">
                    <p className="text-gray-400 text-sm mb-4">Subjects</p>

                    <div className="space-y-4">
                      {subjects.map((subject, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-2">
                            <span>{subject.name}</span>
                            <span className="text-sky-300">
                              {subject.value}%
                            </span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${subject.value}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                delay: index * 0.1,
                              }}
                              className="h-full bg-gradient-to-r from-purple-500 to-sky-400 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;