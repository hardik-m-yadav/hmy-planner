// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   FiCheckCircle,
//   FiChevronLeft,
//   FiChevronRight,
//   FiClock,
//   FiZap,
// } from "react-icons/fi";

// const Calendar = () => {
//   const tasks = useSelector((state) => state.tasks);
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();

//   const firstDay = new Date(year, month, 1).getDay();
//   const totalDays = new Date(year, month + 1, 0).getDate();

//   const monthName = currentDate.toLocaleString("default", {
//     month: "long",
//     year: "numeric",
//   });

//   const days = [];

//   for (let i = 0; i < firstDay; i++) {
//     days.push(null);
//   }

//   for (let day = 1; day <= totalDays; day++) {
//     days.push(day);
//   }

//   const formatDate = (day) => {
//     const m = String(month + 1).padStart(2, "0");
//     const d = String(day).padStart(2, "0");
//     return `${year}-${m}-${d}`;
//   };

//   const getTasksByDate = (day) => {
//     return tasks.filter((task) => task.date === formatDate(day));
//   };

//   return (
//     <section className="min-h-screen bg-[#050914] text-white relative overflow-hidden p-4 sm:p-6 lg:p-8">
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px]" />
//       <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-purple-600/25 rounded-full blur-[140px]" />
//       <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-[160px]" />

//       <div className="relative z-10 max-w-7xl mx-auto">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
//           <div>
//             <p className="text-cyan-300 font-semibold text-sm flex items-center gap-2">
//               <FiZap />
//               Hmy Planner Calendar
//             </p>
//             <h1 className="text-3xl sm:text-4xl font-black mt-2">
//               Study Calendar
//             </h1>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
//               className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:-translate-y-1 transition-all"
//             >
//               <FiChevronLeft />
//             </button>

//             <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 font-bold min-w-[190px] text-center">
//               {monthName}
//             </div>

//             <button
//               onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
//               className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:-translate-y-1 transition-all"
//             >
//               <FiChevronRight />
//             </button>
//           </div>
//         </div>

//         <div className="rounded-[30px] bg-white/[0.07] border border-white/10 backdrop-blur-2xl p-4 sm:p-6">
//           <div className="grid grid-cols-7 gap-3 mb-4">
//             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//               <div
//                 key={day}
//                 className="text-center text-sm font-bold text-gray-400 py-2"
//               >
//                 {day}
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-7 gap-3">
//             {days.map((day, index) => {
//               const dayTasks = day ? getTasksByDate(day) : [];
//               const today = new Date().toISOString().split("T")[0];
//               const isToday = day && formatDate(day) === today;

//               return (
//                 <div
//                   key={index}
//                   className={`min-h-[130px] rounded-2xl border p-3 transition-all duration-300 ${
//                     day
//                       ? "bg-[#07111f]/90 border-white/10 hover:border-cyan-400/30 hover:-translate-y-1"
//                       : "bg-transparent border-transparent"
//                   } ${isToday ? "ring-2 ring-cyan-400/60" : ""}`}
//                 >
//                   {day && (
//                     <>
//                       <div className="flex items-center justify-between mb-3">
//                         <span
//                           className={`w-8 h-8 rounded-xl flex items-center justify-center font-black ${
//                             isToday
//                               ? "bg-gradient-to-r from-purple-500 to-cyan-400"
//                               : "bg-white/10"
//                           }`}
//                         >
//                           {day}
//                         </span>

//                         {dayTasks.length > 0 && (
//                           <span className="text-xs text-cyan-300 font-bold">
//                             {dayTasks.length} task
//                           </span>
//                         )}
//                       </div>

//                       <div className="space-y-2">
//                         {dayTasks.slice(0, 2).map((task) => (
//                           <div
//                             key={task.id}
//                             className={`rounded-xl px-3 py-2 border text-xs ${
//                               task.completed
//                                 ? "bg-green-500/10 border-green-400/30 text-green-300"
//                                 : task.priority === "High"
//                                 ? "bg-red-500/10 border-red-400/30 text-red-300"
//                                 : task.priority === "Medium"
//                                 ? "bg-yellow-500/10 border-yellow-400/30 text-yellow-300"
//                                 : "bg-cyan-500/10 border-cyan-400/30 text-cyan-300"
//                             }`}
//                           >
//                             <p className="font-bold truncate">
//                               {task.completed && (
//                                 <FiCheckCircle className="inline mr-1" />
//                               )}
//                               {task.subject}
//                             </p>

//                             <p className="flex items-center gap-1 opacity-80 mt-1">
//                               <FiClock />
//                               {task.time}
//                             </p>
//                           </div>
//                         ))}

//                         {dayTasks.length > 2 && (
//                           <p className="text-xs text-gray-400 font-semibold">
//                             +{dayTasks.length - 2} more
//                           </p>
//                         )}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Calendar;



import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiZap,
} from "react-icons/fi";

const Calendar = () => {
  const tasks = useSelector((state) => state.tasks);
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // format date safely (LOCAL, not UTC)
  const formatDate = (day) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  // today (FIXED timezone issue)
  const getToday = () => {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${m}-${day}`;
  };

  const today = getToday();

  // 🔥 OPTIMIZED: group tasks once
  const tasksByDate = useMemo(() => {
    const map = {};
    tasks.forEach((task) => {
      if (!map[task.date]) map[task.date] = [];
      map[task.date] = [...map[task.date], task];
    });
    return map;
  }, [tasks]);

  const getTasksByDate = (day) => {
    return tasksByDate[formatDate(day)] || [];
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let day = 1; day <= totalDays; day++) days.push(day);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <section className="min-h-screen bg-[#050914] text-white relative overflow-hidden p-3 sm:p-6 lg:p-8">
      {/* background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px]" />
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-purple-600/25 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-7xl mx-auto ">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-cyan-300 font-semibold text-xs sm:text-sm flex items-center gap-2">
              <FiZap />
              Hmy Planner Calendar
            </p>
            <h1 className="text-2xl sm:text-4xl font-black mt-1 sm:mt-2">
              Study Calendar
            </h1>
          </div>

          {/* NAV */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 transition"
            >
              <FiChevronLeft />
            </button>

            <div className="px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-white/10 border border-white/10 font-bold text-xs sm:text-base min-w-[120px] sm:min-w-[190px] text-center">
              {monthName}
            </div>

            <button
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 transition"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* CALENDAR */}
        <div className="rounded-2xl sm:rounded-[30px] bg-white/[0.07] border border-white/10 backdrop-blur-2xl p-2 sm:p-6">
          
          {/* WEEK DAYS */}
          <div className="grid grid-cols-7 gap-1 sm:gap-3 mb-2 sm:mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="text-center text-[10px] sm:text-sm font-bold text-gray-400 py-1 sm:py-2"
              >
                {d}
              </div>
            ))}
          </div>

          {/* DAYS GRID */}
          <div className="grid grid-cols-7 gap-1 sm:gap-3">
            {days.map((day, index) => {
              const dayTasks = day ? getTasksByDate(day) : [];
              const isToday = day && formatDate(day) === today;

              return (
                <div
                  key={day ? formatDate(day) : `empty-${index}`}
                  className={`min-h-[70px] sm:min-h-[130px] rounded-xl sm:rounded-2xl border p-1 sm:p-3 transition-all duration-300 ${
                    day
                      ? "bg-[#07111f]/90 border-white/10 hover:border-cyan-400/30 hover:-translate-y-1"
                      : "bg-white/5 border-white/5"
                  } ${isToday ? "ring-2 ring-cyan-400/60" : ""}`}
                >
                  {day && (
                    <>
                      {/* TOP ROW */}
                      <div className="flex items-center justify-between mb-1 sm:mb-3">
                        <span
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-[10px] sm:text-sm ${
                            isToday
                              ? "bg-gradient-to-r from-purple-500 to-cyan-400"
                              : "bg-white/10"
                          }`}
                        >
                          {day}
                        </span>

                        {dayTasks.length > 0 && (
                          <span className="text-[10px] sm:text-xs text-cyan-300 font-bold">
                            {dayTasks.length}
                          </span>
                        )}
                      </div>

                      {/* TASKS */}
                      <div className="space-y-1 sm:space-y-2">
                        {dayTasks
                          .slice(0, isMobile ? 1 : 2)
                          .map((task) => (
                            <div
                              key={task.id}
                              className={`rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-2 border text-[9px] sm:text-xs ${
                                task.completed
                                  ? "bg-green-500/10 border-green-400/30 text-green-300"
                                  : task.priority === "High"
                                  ? "bg-red-500/10 border-red-400/30 text-red-300"
                                  : task.priority === "Medium"
                                  ? "bg-yellow-500/10 border-yellow-400/30 text-yellow-300"
                                  : "bg-cyan-500/10 border-cyan-400/30 text-cyan-300"
                              }`}
                            >
                              <p className="font-bold truncate flex items-center gap-1">
                                {task.completed && (
                                  <FiCheckCircle className="text-[10px]" />
                                )}
                                {task.subject}
                              </p>

                              <p className="flex items-center gap-1 opacity-80 mt-1 text-[8px] sm:text-xs">
                                <FiClock />
                                {task.time}
                              </p>
                            </div>
                          ))}

                        {dayTasks.length > (isMobile ? 1 : 2) && (
                          <p className="text-[9px] sm:text-xs text-gray-400 font-semibold">
                            +{dayTasks.length - (isMobile ? 1 : 2)} more
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;