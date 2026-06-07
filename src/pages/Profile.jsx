import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserStreak } from "../firebase/streakService";
import AchievementBadges from "../components/AchievementBadges";
import DashboardNavbar from "../components/DashboardNavbar";

import {
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiLogOut,
  FiMail,
  FiTarget,
  FiUser,
  FiZap,
} from "react-icons/fi";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const tasks = useSelector((state) => state.tasks);
  const notes = useSelector((state) => state.notes);

  const [streak, setStreak] = useState({
    currentStreak: 0,
    bestStreak: 0,
    completedToday: 0,
  });

  useEffect(() => {
    const fetchStreak = async () => {
      if (!currentUser) return;

      const userStreak = await getUserStreak(currentUser.uid);
      setStreak(userStreak);
    };

    fetchStreak();
  }, [currentUser]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const avgProgress =
    tasks.length === 0
      ? 0
      : Math.round(
          tasks.reduce((sum, task) => sum + Number(task.progress || 0), 0) /
            tasks.length
        );

  const joinedDate = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
    : "N/A";

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <section className="min-h-screen bg-[#050914] text-white relative overflow-x-hidden p-4 sm:p-6 lg:p-8">
      <DashboardNavbar/>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px]" />
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-purple-600/25 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-cyan-300 font-semibold text-sm flex items-center gap-2">
            <FiZap />
            Hmy Planner Profile
          </p>

          <h1 className="text-3xl sm:text-4xl font-black mt-2">
            My Profile
          </h1>
        </div>

       <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <div className="rounded-[30px] bg-white/[0.07] border border-white/10 backdrop-blur-2xl p-5 sm:p-6 text-center overflow-hidden">
            <div className="mx-auto w-28 h-28 rounded-[32px] bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.35)] mb-5">
              <FiUser className="text-5xl" />
            </div>

            <h2 className="text-2xl font-black">
              {currentUser?.displayName || "Hmy User"}
            </h2>

            <p className="text-gray-400 mt-2 flex flex-wrap items-center justify-center gap-2 break-all text-sm">
              <FiMail />
              {currentUser?.email}
            </p>

            <div className="mt-6 rounded-2xl bg-[#07111f] border border-white/10 p-4">
              <p className="text-gray-400 text-sm">Joined Date</p>
              <h3 className="text-xl font-black mt-1">{joinedDate}</h3>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-black flex items-center justify-center gap-2 hover:bg-red-500/20 hover:-translate-y-1 transition-all"
            >
              <FiLogOut />
              Logout
            </button>
          </div>

          <div className="space-y-6">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
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

              <StatCard
                icon={<FiClock />}
                title="Pending"
                value={pendingTasks}
              />

              <StatCard
                icon={<FiFileText />}
                title="Notes"
                value={notes.length}
              />

              <StatCard
                icon={<FiZap />}
                title="Current Streak"
                value={`${streak.currentStreak} Days`}
              />

              <StatCard
                icon={<FiTarget />}
                title="Best Streak"
                value={`${streak.bestStreak} Days`}
              />

              <StatCard
                icon={<FiCheckCircle />}
                title="Completed Today"
                value={streak.completedToday}
              />
            </div>

            <div className="rounded-[30px] bg-white/[0.07] border border-white/10 backdrop-blur-2xl p-6">
             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <div>
                  <p className="text-gray-400 text-sm">Overall Productivity</p>
                  <h3 className="text-3xl font-black">{avgProgress}%</h3>
                </div>

                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                  <FiZap className="text-2xl" />
                </div>
              </div>

              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  style={{ width: `${avgProgress}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                />
              </div>

              <p className="text-gray-400 mt-4">
                {avgProgress < 40
                  ? "You are just getting started. Complete small tasks daily."
                  : avgProgress < 75
                  ? "Good progress. Keep your study consistency strong."
                  : "Excellent productivity. You are performing really well."}
              </p>
            </div>

                       <div className="rounded-[30px] bg-white/[0.07] border border-white/10 backdrop-blur-2xl p-6">
              <h3 className="text-2xl font-black mb-4">Account Details</h3>

              <div className="space-y-4">
                <InfoRow label="User ID" value={currentUser?.uid || "N/A"} />

                <InfoRow
                  label="Email Verified"
                  value={currentUser?.emailVerified ? "Yes" : "No"}
                />

                <InfoRow
                  label="Provider"
                  value={
                    currentUser?.providerData?.[0]?.providerId || "password"
                  }
                />
              </div>
            </div>

           <div className="w-full min-w-0 overflow-hidden">
  <AchievementBadges
    tasks={tasks}
    notes={notes}
    streak={streak}
  />
</div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="group min-w-0 rounded-[26px] bg-white/[0.07] border border-white/10 backdrop-blur-xl p-4 sm:p-5 hover:-translate-y-1 hover:border-cyan-400/30 transition-all duration-300">
    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition">
      {icon}
    </div>

    <p className="text-gray-400 text-xs sm:text-sm font-semibold">
      {title}
    </p>

    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mt-1 break-words">
      {value}
    </h3>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="rounded-2xl bg-[#07111f] border border-white/10 p-4 overflow-hidden">
    <p className="text-gray-400 text-sm">{label}</p>

    <h4 className="font-bold mt-1 text-sm break-all">
      {value}
    </h4>
  </div>
);



export default Profile;