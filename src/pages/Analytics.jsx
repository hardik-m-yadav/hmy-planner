import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { getUserStreak } from "../firebase/streakService";
import AchievementBadges from "../components/AchievementBadges";
import AnalyticsChart from "../components/AnalyticsChart";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

const Analytics = () => {
  const tasks = useSelector((state) => state.tasks);
  const notes = useSelector((state) => state.notes);
  const { currentUser } = useAuth();

  const [streak, setStreak] = useState({
    currentStreak: 0,
    bestStreak: 0,
    completedToday: 0,
  });

  useEffect(() => {
    const fetchStreak = async () => {
      if (!currentUser) return;
      const data = await getUserStreak(currentUser.uid);
      setStreak(data);
    };

    fetchStreak();
  }, [currentUser]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High",
  ).length;

  const avgProgress =
    tasks.length === 0
      ? 0
      : Math.round(
          tasks.reduce((sum, task) => sum + Number(task.progress || 0), 0) /
            tasks.length,
        );

  const completionRate =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  const taskStatusData = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
  ];

  const priorityData = ["High", "Medium", "Low"].map((priority) => ({
    name: priority,
    value: tasks.filter((task) => task.priority === priority).length,
  }));

  const categoryData = ["Study", "Revision", "Test", "Notes"].map(
    (category) => ({
      name: category,
      value: tasks.filter((task) => task.category === category).length,
    }),
  );

  const weeklyData = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
    (day, index) => {
      const count = tasks.filter((task) => {
        if (!task.date) return false;
        return new Date(task.date).getDay() === index;
      }).length;

      return {
        day,
        tasks: count,
      };
    },
  );

  return (
    <section className="min-h-screen bg-[#050914] text-white relative overflow-hidden p-4 sm:p-6 lg:p-8">
      <DashboardNavbar/>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px]" />
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-purple-600/25 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-[160px]" />
      

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-cyan-300 font-semibold text-sm flex items-center gap-2">
            <FiZap />
            Hmy Planner Analytics
          </p>

          <h1 className="text-3xl sm:text-4xl font-black mt-2">
            Advanced Analytics
          </h1>

          <p className="text-gray-400 mt-3">
            Track your tasks, notes, productivity, streaks and study
            performance.
          </p>
        </div>

        <InsightCard
  title="Productivity Score"
  value={`${Math.round(
    (completionRate * 0.6) +
    (avgProgress * 0.3) +
    (Math.min(streak.currentStreak, 30) * 0.1)
  )}%`}
  text="Calculated using completion rate, progress and streak."
/>

        <div className="grid sm:grid-cols-2 xl:grid-cols-6 mt-4 gap-5 mb-8">
          <StatCard
            icon={<FiTarget />}
            title="Total Tasks"
            value={tasks.length}
          />
          <StatCard
            icon={<FiCheckCircle />}
            title="Completed"
            value={completedTasks}
          />
          <StatCard icon={<FiClock />} title="Pending" value={pendingTasks} />
          <StatCard icon={<FiFileText />} title="Notes" value={notes.length} />
          <StatCard
            icon={<FiTrendingUp />}
            title="Progress"
            value={`${avgProgress}%`}
          />
          <StatCard
            icon={<FiZap />}
            title="Streak"
            value={`${streak.currentStreak} Days`}
          />
        </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <InsightCard
            title="Completion Rate"
            value={`${completionRate}%`}
            text="Percentage of tasks completed successfully."
          />

          <InsightCard
            title="High Priority"
            value={highPriorityTasks}
            text="Important tasks that need more focus."
          />

          <InsightCard
            title="Best Streak"
            value={`${streak.bestStreak} Days`}
            text="Your highest study consistency streak."
          />
        </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-8 min-w-0">
          <ChartCard title="Weekly Task Activity">
            <div className="h-[250px] sm:h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12 }}
                    stroke="#94a3b8"
                  />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Task Status">
            <div className="h-[250px] sm:h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={window.innerWidth < 640 ? 70 : 110}
                  >
                    <Cell fill="#22c55e" />
                    <Cell fill="#ef4444" />
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="grid xl:grid-cols-2 gap-6 mb-8 min-w-0">
          <ChartCard title="Priority Breakdown">
            <div className="h-[320px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData}>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#a855f7" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Category Breakdown">
            <div className="h-[320px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#38bdf8" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="rounded-[30px] bg-white/[0.07] border border-white/10 backdrop-blur-2xl p-6">
          <h3 className="text-2xl font-black mb-5 flex items-center gap-2">
            <FiActivity className="text-cyan-300" />
            Smart Study Insights
          </h3>

          <div className="space-y-4 text-gray-300">
            <p>
              {completionRate < 40
                ? "Your completion rate is low. Try breaking large tasks into smaller study sessions."
                : completionRate < 75
                  ? "Good progress. Keep completing tasks daily to improve consistency."
                  : "Excellent work. Your task completion rate is strong."}
            </p>

            <p>
              {highPriorityTasks > 3
                ? "You have many high-priority tasks. Focus on urgent topics first."
                : "Your high-priority workload looks manageable."}
            </p>

            <p>
              {streak.currentStreak === 0
                ? "Complete one task today to start your study streak."
                : `You are on a ${streak.currentStreak}-day streak. Keep it going!`}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <AchievementBadges tasks={tasks} notes={notes} streak={streak} />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="group rounded-[22px] sm:rounded-[26px] bg-white/[0.07] border border-white/10 backdrop-blur-xl p-4 sm:p-5 hover:-translate-y-1 hover:border-cyan-400/30 transition-all duration-300">

    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition">
      {icon}
    </div>

    <p className="text-gray-400 text-xs sm:text-sm font-semibold">
      {title}
    </p>

    <h3 className="text-2xl sm:text-3xl font-black mt-1">
      {value}
    </h3>
  </div>
);

const InsightCard = ({ title, value, text }) => (
  <div className="rounded-[22px] sm:rounded-[26px] bg-white/[0.07] border border-white/10 backdrop-blur-xl p-5 sm:p-6 hover:-translate-y-1 hover:border-cyan-400/30 transition-all duration-300">

    <p className="text-gray-400 text-sm font-semibold">
      {title}
    </p>

    <h3 className="text-3xl sm:text-4xl font-black mt-2 bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
      {value}
    </h3>

    <p className="text-gray-400 mt-3 text-sm leading-relaxed">
      {text}
    </p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="rounded-[24px] sm:rounded-[30px] bg-white/[0.07] border border-white/10 backdrop-blur-2xl p-4 sm:p-6 min-w-0 overflow-hidden">
    <h3 className="text-lg sm:text-2xl font-black mb-4 sm:mb-6">{title}</h3>

    {children}
  </div>
);
<AnalyticsChart />;

export default Analytics;
