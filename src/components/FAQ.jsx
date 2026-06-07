import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaPlus, FaBrain, FaCircleQuestion } from "react-icons/fa6";

const faqs = [
  {
    question: "How does AI generate study plans?",
    answer:
      "Hmy Planner analyzes your subjects, goals, available study time and deadlines to generate personalized study schedules.",
  },
  {
    question: "Can I customize my timetable?",
    answer:
      "Absolutely. You can modify study sessions, subjects, priorities, deadlines and AI recommendations anytime.",
  },
  {
    question: "Is Hmy Planner free to use?",
    answer:
      "Yes. You can start with the free version and upgrade later for advanced AI features and analytics.",
  },
  {
    question: "Does it work for JEE, NEET and college students?",
    answer:
      "Yes. Hmy Planner is designed for school students, competitive exam aspirants and university students.",
  },
  {
    question: "Can I track my study progress?",
    answer:
      "Yes. You can monitor task completion, focus score, revision progress and overall performance analytics.",
  },
  {
    question: "Will AI automatically adjust my schedule?",
    answer:
      "In future versions, AI will adjust your study plan based on missed tasks, exams and performance trends.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative bg-[#070b16] text-white py-24 px-4 overflow-hidden">
      {/* Clean Background Glow - No Box Issue */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(168,85,247,0.22),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(56,189,248,0.16),transparent_35%)]" />

      {/* Floating Particles */}
      {[...Array(16)].map((_, i) => (
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
            top: `${16 + (i % 6) * 12}%`,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="uppercase tracking-[5px] text-sky-300 text-sm font-semibold mb-4">
            FAQ
          </p>

          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Questions About
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
              Hmy Planner
            </span>
          </h2>

          <p className="text-gray-300 mt-5 leading-7">
            Everything you need to know about AI-powered study planning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8">
          {/* Left Card */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] backdrop-blur-xl p-7 hover:border-sky-400/30 transition-all duration-700"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-500/10" />

            <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center text-2xl mb-6 shadow-lg shadow-purple-500/30">
              <FaBrain />
            </div>

            <h3 className="relative z-10 text-2xl font-black mb-4">
              AI Study Assistant
            </h3>

            <p className="relative z-10 text-gray-300 leading-7 mb-6">
              Hmy Planner uses AI to create better study schedules, track your
              progress, and help you stay focused on your goals.
            </p>

            <div className="relative z-10 rounded-2xl bg-white/[0.05] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <FaCircleQuestion className="text-sky-300" />
                <h4 className="font-bold">Need More Help?</h4>
              </div>

              <p className="text-gray-400 text-sm leading-6">
                Start with the free plan and experience AI-powered study
                planning yourself.
              </p>
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.045] hover:bg-white/[0.06] hover:border-sky-400/30 hover:shadow-[0_15px_50px_rgba(56,189,248,0.08)] backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-5 text-left p-6"
                  >
                    <span className="font-bold text-lg">{faq.question}</span>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="min-w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-sky-300"
                    >
                      <FaPlus />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-gray-300 leading-7">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;