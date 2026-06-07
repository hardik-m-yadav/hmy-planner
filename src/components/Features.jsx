// import React from "react";
// import { motion } from "motion/react";
// import {
//   FaRobot,
//   FaCalendarCheck,
//   FaChartLine,
//   FaClock,
//   FaBookOpen,
//   FaBell,
// } from "react-icons/fa6";

// const features = [
//   {
//     icon: <FaRobot />,
//     title: "AI Study Plan",
//     desc: "Generate smart study schedules based on your subjects, exams, goals, and available time.",
//   },
//   {
//     icon: <FaCalendarCheck />,
//     title: "Daily Timetable",
//     desc: "Organize your day with clean task blocks, study sessions, breaks, and revision time.",
//   },
//   {
//     icon: <FaChartLine />,
//     title: "Progress Tracking",
//     desc: "Track completed tasks, weekly performance, focus score, and subject-wise improvement.",
//   },
//   {
//     icon: <FaClock />,
//     title: "Focus Timer",
//     desc: "Use Pomodoro-style focus sessions to study deeply without losing productivity.",
//   },
//   {
//     icon: <FaBookOpen />,
//     title: "Subject Management",
//     desc: "Manage subjects, chapters, notes, weak topics, and revision priorities in one place.",
//   },
//   {
//     icon: <FaBell />,
//     title: "Smart Reminders",
//     desc: "Get reminders for pending tasks, exams, revision, and important study goals.",
//   },
// ];

// const Features = () => {
//   return (
//     <section
//       id="features"
//       className="relative bg-[#070b16] text-white py-24 px-4 overflow-hidden"
//     >
//       {/* Moving Glow Objects */}
//       <motion.div
//         animate={{ x: [0, 45, 0], y: [0, -35, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute top-10 right-[-120px] w-[380px] h-[380px] bg-purple-600/25 blur-[140px] rounded-full"
//       />

//       <motion.div
//         animate={{ x: [0, -45, 0], y: [0, 35, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute bottom-0 left-[-130px] w-[420px] h-[420px] bg-sky-500/20 blur-[150px] rounded-full"
//       />

//       {/* Floating Small Objects */}
//       {[...Array(100)].map((_, i) => (
//         <motion.span
//           key={i}
//           animate={{
//             y: [0, -25, 0],
//             opacity: [0.2, 0.8, 0.2],
//             scale: [1, 1.4, 1],
//           }}
//           transition={{
//             duration: 4 + i * 0.3,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: i * 0.2,
//           }}
//           className="absolute w-2 h-2 rounded-full bg-sky-300/60"
//           style={{
//             left: `${8 + i * 8}%`,
//             top: `${20 + (i % 5) * 13}%`,
//           }}
//         />
//       ))}

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 45 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           className="text-center max-w-3xl mx-auto mb-16"
//         >
//           <p className="uppercase tracking-[5px] text-sky-300 text-sm font-semibold mb-4">
//             Smart Features
//           </p>

//           <h2 className="text-4xl md:text-6xl font-black leading-tight">
//             Everything You Need To
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
//               Study With AI
//             </span>
//           </h2>

//           <p className="text-gray-300 mt-6 text-base md:text-lg leading-8">
//             Hmy Planner combines AI planning, smart reminders, progress
//             tracking, and focus tools to make your study routine simple and
//             powerful.
//           </p>
//         </motion.div>

//         {/* Cards */}
//         <motion.div
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.2 }}
//           variants={{
//             hidden: {},
//             show: {
//               transition: {
//                 staggerChildren: 0.12,
//               },
//             },
//           }}
//           className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
//         >
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               variants={{
//                 hidden: { opacity: 0, y: 45, scale: 0.96 },
//                 show: {
//                   opacity: 1,
//                   y: 0,
//                   scale: 1,
//                   transition: {
//                     duration: 0.75,
//                     ease: [0.16, 1, 0.3, 1],
//                   },
//                 },
//               }}
//               whileHover={{
//                 y: -10,
//                 scale: 1.025,
//                 transition: { type: "spring", stiffness: 220, damping: 18 },
//               }}
//               className="group relative bg-white/10 border border-white/10 backdrop-blur-xl rounded-[2rem] p-7 overflow-hidden shadow-2xl"
//             >
//               {/* Hover Glow */}
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-purple-500/10 to-sky-500/10"></div>

//               <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-purple-500/20 blur-[70px] rounded-full group-hover:bg-sky-500/25 transition duration-500"></div>

//               {/* Icon */}
//               <motion.div
//                 whileHover={{ rotate: 8, scale: 1.1 }}
//                 className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center text-2xl text-white shadow-xl shadow-purple-500/30 mb-6"
//               >
//                 {feature.icon}
//               </motion.div>

//               {/* Content */}
//               <div className="relative z-10">
//                 <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>

//                 <p className="text-gray-300 leading-7">{feature.desc}</p>
//               </div>

//               {/* Bottom Line */}
//               <div className="relative z-10 mt-6 h-[1px] w-full bg-white/10">
//                 <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-purple-400 to-sky-400 transition-all duration-500"></div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Features;




import React from "react";
import { motion } from "motion/react";
import {
  FaRobot,
  FaCalendarCheck,
  FaChartLine,
  FaClock,
  FaBookOpen,
  FaBell,
} from "react-icons/fa6";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Study Plan",
    desc: "Generate smart study schedules based on your subjects, exams, goals, and available time.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Daily Timetable",
    desc: "Organize your day with clean task blocks, study sessions, breaks, and revision time.",
  },
  {
    icon: <FaChartLine />,
    title: "Progress Tracking",
    desc: "Track completed tasks, weekly performance, focus score, and subject-wise improvement.",
  },
  {
    icon: <FaClock />,
    title: "Focus Timer",
    desc: "Use Pomodoro-style focus sessions to study deeply without losing productivity.",
  },
  {
    icon: <FaBookOpen />,
    title: "Subject Management",
    desc: "Manage subjects, chapters, notes, weak topics, and revision priorities in one place.",
  },
  {
    icon: <FaBell />,
    title: "Smart Reminders",
    desc: "Get reminders for pending tasks, exams, revision, and important study goals.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative bg-[#070b16] text-white py-24 px-4 overflow-hidden"
    >
      {/* Moving Glow Objects */}
      <motion.div
        animate={{ x: [0, 45, 0], y: [0, -35, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-[-120px] w-[380px] h-[380px] bg-purple-600/25 blur-[140px] rounded-full"
      />

      <motion.div
        animate={{ x: [0, -45, 0], y: [0, 35, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-[-130px] w-[420px] h-[420px] bg-sky-500/20 blur-[150px] rounded-full"
      />

      {/* Floating Dots */}
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -22, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 5 + i * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
          className="absolute w-2 h-2 rounded-full bg-sky-300/50"
          style={{
            left: `${8 + i * 8}%`,
            top: `${20 + (i % 5) * 13}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="uppercase tracking-[5px] text-sky-300 text-sm font-semibold mb-4">
            Smart Features
          </p>

          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Everything You Need To
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
              Study With AI
            </span>
          </h2>

          <p className="text-gray-300 mt-6 text-base md:text-lg leading-8">
            Hmy Planner combines AI planning, smart reminders, progress
            tracking, and focus tools to make your study routine simple and
            powerful.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.13,
              },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 45,
                  scale: 0.97,
                },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                y: {
                  duration: 4 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{
                scale: 1.018,
                y: -6,
              }}
              className="group relative bg-white/[0.045] hover:bg-white/[0.07] border border-white/10 hover:border-sky-400/30 backdrop-blur-xl rounded-[2rem] p-7 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_60px_rgba(56,189,248,0.12)] transition-all duration-700 ease-out transform-gpu will-change-transform"
            >
              {/* Soft Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-gradient-to-br from-purple-500/10 via-transparent to-sky-500/10"></div>

              {/* Bottom Blur Glow */}
              <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-purple-500/15 blur-[80px] rounded-full group-hover:bg-sky-500/20 transition-all duration-700 ease-out"></div>

              {/* Animated Border Shine */}
              <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(120deg,transparent,rgba(56,189,248,0.25),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform"></div>

              {/* Icon */}
              <motion.div
                whileHover={{
                  scale: 1.07,
                  rotate: 3,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center text-2xl text-white shadow-xl shadow-purple-500/30 mb-6"
              >
                {feature.icon}
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-sky-100 transition-colors duration-500">
                  {feature.title}
                </h3>

                <p className="text-gray-300 leading-7 group-hover:text-gray-200 transition-colors duration-500">
                  {feature.desc}
                </p>
              </div>

              {/* Bottom Line */}
              <div className="relative z-10 mt-6 h-[1px] w-full bg-white/10 overflow-hidden">
                <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-purple-400 to-sky-400 transition-[width] duration-700 ease-out"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;