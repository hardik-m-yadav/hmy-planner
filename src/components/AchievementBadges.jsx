import React from "react";
import {
  FiAward,
  FiCheckCircle,
  FiFileText,
  FiTarget,
  FiZap,
} from "react-icons/fi";

const AchievementBadges = ({ tasks = [], notes = [], streak = {} }) => {
  const completedTasks = tasks.filter((task) => task.completed).length;

  const badges = [
    {
      title: "First Win",
      desc: "Complete your first task",
      icon: <FiCheckCircle />,
      unlocked: completedTasks >= 1,
    },
    {
      title: "Task Warrior",
      desc: "Complete 10 tasks",
      icon: <FiTarget />,
      unlocked: completedTasks >= 10,
    },
    {
      title: "Note Keeper",
      desc: "Create 5 notes",
      icon: <FiFileText />,
      unlocked: notes.length >= 5,
    },
    {
      title: "3 Day Streak",
      desc: "Study for 3 days",
      icon: <FiZap />,
      unlocked: streak.currentStreak >= 3,
    },
    {
      title: "7 Day Streak",
      desc: "Study for 7 days",
      icon: <FiAward />,
      unlocked: streak.currentStreak >= 7,
    },
    {
      title: "Productivity Master",
      desc: "Complete 25 tasks",
      icon: <FiAward />,
      unlocked: completedTasks >= 25,
    },
  ];

  return (
  <div className="w-full min-w-0 overflow-hidden rounded-[24px] sm:rounded-[30px] bg-white/[0.07] border border-white/10 backdrop-blur-2xl p-4 sm:p-6">
    <div className="mb-6">
      <p className="text-sm text-cyan-300 font-semibold">Achievements</p>
      <h3 className="text-xl sm:text-2xl font-black">
        Badge Collection
      </h3>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {badges.map((badge, index) => (
        <div
          key={index}
          className={`min-w-0 rounded-2xl sm:rounded-3xl border p-4 sm:p-5 transition-all duration-300 ${
            badge.unlocked
              ? "bg-cyan-500/10 border-cyan-400/30 hover:-translate-y-1"
              : "bg-white/[0.04] border-white/10 opacity-50"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
              badge.unlocked
                ? "bg-gradient-to-br from-purple-500 to-cyan-400"
                : "bg-white/10"
            }`}
          >
            {badge.icon}
          </div>

          <h4 className="font-black text-base sm:text-lg break-words">
            {badge.title}
          </h4>

          <p className="text-sm text-gray-400 mt-1 break-words">
            {badge.desc}
          </p>

          <span
            className={`inline-flex mt-4 px-3 py-1 rounded-full text-xs font-bold ${
              badge.unlocked
                ? "bg-green-500/15 text-green-400"
                : "bg-gray-500/15 text-gray-400"
            }`}
          >
            {badge.unlocked ? "Unlocked" : "Locked"}
          </span>
        </div>
      ))}
    </div>
  </div>
);
};

export default AchievementBadges;