// import React from "react";
// import { motion } from "motion/react";
// import { FaCheck, FaCrown, FaRocket } from "react-icons/fa6";

// const plans = [
//   {
//     name: "Free",
//     price: "$0",
//     desc: "Start planning your studies.",
//     popular: false,
//     features: ["Basic planner", "Daily tasks", "Progress tracking", "Basic reminders"],
//   },
//   {
//     name: "Pro",
//     price: "$9",
//     desc: "Smart AI planning for serious students.",
//     popular: true,
//     features: ["Unlimited AI plans", "Weak topic detection", "Revision scheduler", "Focus analytics"],
//   },
//   {
//     name: "Premium",
//     price: "$19",
//     desc: "Advanced AI coaching for exams.",
//     popular: false,
//     features: ["Everything in Pro", "AI study coach", "Exam readiness", "Performance reports"],
//   },
// ];

// const Pricing = () => {
//   return (
//     <section className="relative bg-[#070b16] text-white py-24 px-4 overflow-hidden">
//       <motion.div
//         animate={{ x: [0, 45, 0], y: [0, -30, 0] }}
//         transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute top-20 left-[-150px] w-[420px] h-[420px] bg-purple-600/25 blur-[150px] rounded-full"
//       />

//       <motion.div
//         animate={{ x: [0, -45, 0], y: [0, 30, 0] }}
//         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute bottom-0 right-[-150px] w-[460px] h-[460px] bg-sky-500/20 blur-[160px] rounded-full"
//       />

//       {[...Array(18)].map((_, i) => (
//   <motion.span
//     key={i}
//     animate={{
//       y: [0, -20, 0],
//       x: [0, i % 2 === 0 ? 8 : -8, 0],
//       opacity: [0.12, 0.55, 0.12],
//       scale: [1, 1.25, 1],
//     }}
//     transition={{
//       duration: 5 + i * 0.2,
//       repeat: Infinity,
//       ease: "easeInOut",
//       delay: i * 0.15,
//     }}
//     className="absolute w-1 h-1 rounded-full bg-sky-300/70 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
//     style={{
//       left: `${6 + i * 5}%`,
//       top: `${16 + (i % 6) * 12}%`,
//     }}
//   />
// ))}

//       <div className="max-w-6xl mx-auto relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 35 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//           className="text-center max-w-2xl mx-auto mb-14"
//         >
//           <p className="uppercase tracking-[5px] text-sky-300 text-sm font-semibold mb-4">
//             Pricing Plans
//           </p>

//           <h2 className="text-4xl md:text-5xl font-black leading-tight">
//             Simple Plans For
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
//               Smarter Study
//             </span>
//           </h2>

//           <p className="text-gray-300 mt-5 leading-7">
//             Start free and upgrade when you need advanced AI planning.
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-6 items-stretch">
//           {plans.map((plan, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 35 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{
//                 duration: 0.75,
//                 delay: index * 0.1,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               className={`group relative rounded-[2rem] p-[1px] ${
//                 plan.popular
//                   ? "bg-gradient-to-br from-purple-500/70 to-sky-400/70"
//                   : "bg-white/10"
//               }`}
//             >
//               <div
//                 className={`relative h-full overflow-hidden rounded-[2rem] border backdrop-blur-xl p-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-sky-400/30 hover:bg-white/[0.07] ${
//                   plan.popular
//                     ? "bg-[#0b1020]/95 border-sky-400/30 shadow-[0_25px_80px_rgba(56,189,248,0.16)]"
//                     : "bg-white/[0.045] border-white/10"
//                 }`}
//               >
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-500/10" />

//                 {plan.popular && (
//                   <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-sky-400/30 text-sky-200 text-xs font-semibold mb-5">
//                     <FaCrown className="text-yellow-300" />
//                     Recommended
//                   </div>
//                 )}

//                 <div className="relative z-10 flex items-center justify-between mb-5">
//                   <h3 className="text-2xl font-black">{plan.name}</h3>

//                   <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-sky-300">
//                     {plan.popular ? <FaCrown /> : <FaRocket />}
//                   </div>
//                 </div>

//                 <p className="relative z-10 text-gray-300 text-sm leading-6 min-h-[48px]">
//                   {plan.desc}
//                 </p>

//                 <div className="relative z-10 my-6">
//                   <span className="text-4xl font-black">{plan.price}</span>
//                   <span className="text-gray-400 text-sm ml-1">/ month</span>
//                 </div>

//                 <button
//                   className={`relative z-10 w-full py-3 rounded-2xl font-bold text-sm transition-all duration-500 ${
//                     plan.popular
//                       ? "bg-gradient-to-r from-purple-500 to-sky-500 text-white shadow-lg shadow-purple-500/25"
//                       : "bg-white/10 hover:bg-white text-white hover:text-[#070b16] border border-white/10"
//                   }`}
//                 >
//                   {plan.popular ? "Start Pro" : "Get Started"}
//                 </button>

//                 <div className="relative z-10 mt-6 space-y-3">
//                   {plan.features.map((feature, i) => (
//                     <div key={i} className="flex items-center gap-3">
//                       <div className="min-w-5 h-5 rounded-full bg-sky-500/15 text-sky-300 flex items-center justify-center text-[10px]">
//                         <FaCheck />
//                       </div>

//                       <p className="text-gray-300 text-sm">{feature}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="relative z-10 mt-6 h-[1px] bg-white/10 overflow-hidden">
//                   <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-purple-400 to-sky-400 transition-[width] duration-700 ease-out" />
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Pricing;

import React from "react";
import { motion } from "motion/react";
import { FaCheck, FaCrown, FaRocket } from "react-icons/fa6";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Start planning your studies.",
    popular: false,
    features: [
      "Basic planner",
      "Daily tasks",
      "Progress tracking",
      "Basic reminders",
    ],
  },
  {
    name: "Pro",
    price: "$9",
    desc: "Smart AI planning for serious students.",
    popular: true,
    features: [
      "Unlimited AI plans",
      "Weak topic detection",
      "Revision scheduler",
      "Focus analytics",
    ],
  },
  {
    name: "Premium",
    price: "$19",
    desc: "Advanced AI coaching for exams.",
    popular: false,
    features: [
      "Everything in Pro",
      "AI study coach",
      "Exam readiness",
      "Performance reports",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="relative isolate bg-[#070b16] text-white py-24 px-4 overflow-hidden">
      {/* Clean Premium Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(168,85,247,0.18),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(56,189,248,0.14),transparent_35%)]" />
      </div>

      {/* Floating Particles */}
      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -20, 0],
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
            top: `${16 + (i % 6) * 12}%`,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="uppercase tracking-[5px] text-sky-300 text-sm font-semibold mb-4">
            Pricing Plans
          </p>

          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Simple Plans For
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
              Smarter Study
            </span>
          </h2>

          <p className="text-gray-300 mt-5 leading-7">
            Start free and upgrade when you need advanced AI planning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.75,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative rounded-[2rem] p-[1px] transition-all duration-700 ${
                plan.popular
                  ? "bg-gradient-to-br from-purple-500 via-sky-400 to-purple-500 shadow-[0_0_50px_rgba(56,189,248,0.18)]"
                  : "bg-white/10"
              }`}
            >
              <div
                className={`relative h-full overflow-hidden rounded-[2rem] border backdrop-blur-xl p-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-sky-400/30 hover:bg-white/[0.07] ${
                  plan.popular
                    ? "bg-[#0b1020]/95 border-sky-400/30 shadow-[0_25px_80px_rgba(56,189,248,0.16)]"
                    : "bg-white/[0.045] border-white/10"
                }`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-500/10" />

                {plan.popular && (
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                )}

                {plan.popular && (
                  <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-sky-400/30 text-sky-200 text-xs font-semibold mb-5">
                    <FaCrown className="text-yellow-300" />
                    Recommended
                  </div>
                )}

                <div className="relative z-10 flex items-center justify-between mb-5">
                  <h3 className="text-2xl font-black">{plan.name}</h3>

                  <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-sky-300">
                    {plan.popular ? <FaCrown /> : <FaRocket />}
                  </div>
                </div>

                <p className="relative z-10 text-gray-300 text-sm leading-6 min-h-[48px]">
                  {plan.desc}
                </p>

                <div className="relative z-10 my-6">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-gray-400 text-sm ml-1">/ month</span>
                </div>

                <button
                  className={`relative z-10 w-full py-3 rounded-2xl font-bold text-sm transition-all duration-500 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-sky-500 text-white shadow-lg shadow-purple-500/25"
                      : "bg-white/10 hover:bg-white text-white hover:text-[#070b16] border border-white/10"
                  }`}
                >
                  {plan.popular ? "Start Pro" : "Get Started"}
                </button>

                <div className="relative z-10 mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="min-w-5 h-5 rounded-full bg-sky-500/15 text-sky-300 flex items-center justify-center text-[10px]">
                        <FaCheck />
                      </div>

                      <p className="text-gray-300 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 mt-6 h-[1px] bg-white/10 overflow-hidden">
                  <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-purple-400 to-sky-400 transition-[width] duration-700 ease-out" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;