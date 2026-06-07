import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserStreak, updateUserStreak } from "../firebase/streakService";
import NotificationBell from "../components/NotificationBell";
import { addNotification } from "../redux/notificationSlice";
import { exportTasksPDF } from "../utils/pdfExport";
import { exportNotesPDF } from "../utils/pdfExport";

import {
  addTask,
  updateTask,
  setTasks,
  deleteTask as deleteTaskAction,
  toggleComplete as toggleCompleteAction,
} from "../redux/taskSlice";

import {
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEdit3,
  FiGrid,
  FiHome,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiPlus,
  FiSearch,
  FiSettings,
  FiTarget,
  FiTrash2,
  FiTrendingUp,
  FiUser,
  FiX,
  FiZap,
} from "react-icons/fi";

import {
  addTaskToFirestore,
  getTasksFromFirestore,
  updateTaskInFirestore,
  deleteTaskFromFirestore,
} from "../firebase/taskService";

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const notes = useSelector((state) => state.notes);

  const { currentUser } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newTask, setNewTask] = useState({
    subject: "",
    date: "",
    time: "",
    progress: "",
    priority: "Medium",
    category: "Study",
  });

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

  const { logout } = useAuth();
  const navigate = useNavigate();
  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning ☀️"
      : currentHour < 18
        ? "Good Afternoon 🌤️"
        : "Good Evening 🌙";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  const avgProgress =
    totalTasks === 0
      ? 0
      : Math.round(
          tasks.reduce((sum, task) => sum + Number(task.progress || 0), 0) /
            totalTasks,
        );
  const aiScore = Math.min(
    100,
    Math.round(
      avgProgress * 0.7 + (completedTasks / Math.max(totalTasks, 1)) * 30,
    ),
  );

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Pending"
          ? !task.completed
          : filter === "Completed"
            ? task.completed
            : filter === "High"
              ? task.priority === "High"
              : true;

    const matchesSearch =
      task.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.priority?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (
      !newTask.subject ||
      !newTask.date ||
      !newTask.time ||
      newTask.progress === ""
    )
      return;

    if (!currentUser) return;

    const taskData = {
      subject: newTask.subject,
      date: newTask.date,
      time: newTask.time,
      progress: Number(newTask.progress),
      priority: newTask.priority,
      category: newTask.category,
      completed: false,
    };

    const docRef = await addTaskToFirestore(taskData, currentUser.uid);

    dispatch(
      addTask({
        id: docRef.id,
        ...taskData,
      }),
    );

    dispatch(
      addNotification({
        title: "New Task Added",
        message: `${taskData.subject} has been added successfully.`,
        type: "success",
      }),
    );

    setNewTask({
      subject: "",
      date: "",
      time: "",
      progress: "",
      priority: "Medium",
      category: "Study",
    });

    setModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (task) => {
    setEditingTask({
      id: task.id,
      subject: task.subject,
      date: task.date || "",
      time: task.time,
      progress: task.progress,
      priority: task.priority || "Medium",
      category: task.category || "Study",
    });

    setEditModalOpen(true);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (
      !editingTask.subject ||
      !editingTask.date ||
      !editingTask.time ||
      editingTask.progress === ""
    )
      return;

    const updatedTask = {
      subject: editingTask.subject,
      date: editingTask.date,
      time: editingTask.time,
      progress: Number(editingTask.progress),
      priority: editingTask.priority,
      category: editingTask.category,
    };

    await updateTaskInFirestore(editingTask.id, updatedTask);

    dispatch(
      updateTask({
        id: editingTask.id,
        ...updatedTask,
      }),
    );

    setEditingTask(null);
    setEditModalOpen(false);
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task || !currentUser) return;

    const updatedCompleted = !task.completed;
    const updatedProgress = updatedCompleted ? 100 : task.progress;

    await updateTaskInFirestore(id, {
      completed: updatedCompleted,
      progress: updatedProgress,
    });

    dispatch(toggleCompleteAction(id));

    if (updatedCompleted) {
      dispatch(
        addNotification({
          title: "Task Completed",
          message: `${task.subject} completed successfully 🎉`,
          type: "success",
        }),
      );

      const updatedStreak = await updateUserStreak(currentUser.uid);
      setStreak(updatedStreak);
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteTaskFromFirestore(id);
    dispatch(deleteTaskAction(id));
  };

  const menuItems = [
    { name: "Overview", icon: <FiMenu />, path: "/dashboard", active: true },
     { name: "Home", icon: <FiHome />, path: "/" },
    { name: "Planner", icon: <FiCalendar />, path: "/calendar" },
    { name: "Notes", icon: <FiBookOpen />, path: "/notes" },
    { name: "Analytics", icon: <FiTrendingUp />, path: "/analytics" },
    { name: "AI Planner", icon: <FiZap />, path: "/ai-planner" },
    { name: "Profile", icon: <FiUser />, path: "/profile" },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      if (!currentUser) return;

      const firebaseTasks = await getTasksFromFirestore(currentUser.uid);
      dispatch(setTasks(firebaseTasks));
    };

    fetchTasks();
  }, [currentUser, dispatch]);

  return (
    <section className="min-h-screen bg-[#050914] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px]" />
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-purple-600/25 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-[160px]" />

      <div className="relative z-10 flex">
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}

        <aside
          className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#07111f]/95 border-r border-white/10 backdrop-blur-2xl p-5 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.35)]">
                <FiZap />
              </div>

              <h1 className="text-2xl font-black">
                Hmy{" "}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Planner
                </span>
              </h1>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* <nav className="space-y-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  item.active
                    ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white shadow-[0_0_25px_rgba(56,189,248,0.25)]"
                    : "text-gray-400 hover:text-white hover:bg-white/10 hover:translate-x-1"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav> */}

          <nav className="space-y-3">
            {menuItems.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  item.active
                    ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white shadow-[0_0_25px_rgba(56,189,248,0.25)]"
                    : "text-gray-400 hover:text-white hover:bg-white/10 hover:translate-x-1"
                }`}
              >
                <span className="text-xl min-w-[24px] flex justify-center">
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-5 left-5 right-5">
            <div className="rounded-3xl bg-white/10 border border-white/10 p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                  <FiUser />
                </div>
                <div>
                  <h4 className="font-bold">
                    {currentUser?.displayName || "Student"}
                  </h4>
                  <p className="text-xs text-gray-400">Student Plan</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 min-h-screen p-4 sm:p-6 lg:p-8">
          <header className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center"
                >
                  <FiMenu />
                </button>

                <button
                  onClick={() => setMobileActionsOpen(!mobileActionsOpen)}
                  className="md:hidden w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center"
                >
                  <FiSettings />
                </button>
              </div>

              <div>
                <p className="text-sm text-cyan-300 font-semibold">
                  {greeting}
                </p>

                <h2 className="text-2xl sm:text-4xl font-black">
                  Welcome Back,
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {" "}
                    {currentUser?.displayName || "Student"}
                  </span>
                </h2>

                <p className="text-gray-400 mt-1 text-sm">{today}</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 rounded-2xl bg-white/10 border border-white/10 py-3 pl-11 pr-4 outline-none placeholder:text-gray-500 focus:border-cyan-400/60 transition"
                />
              </div>

              <button className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:-translate-y-1 transition-all">
                <FiMoon />
              </button>

              <NotificationBell />

              <div className="flex items-center gap-3">
                <button
                  onClick={() => exportTasksPDF(tasks)}
                  className="px-4 py-3 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-400 font-bold hover:bg-green-500/30 transition"
                >
                  Export Tasks
                </button>

                <button
                  onClick={() => exportNotesPDF(notes)}
                  className="px-4 py-3 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-bold hover:bg-yellow-500/30 transition"
                >
                  Export Notes
                </button>

                <button
                  onClick={() => setModalOpen(true)}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 font-bold flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(56,189,248,0.35)] transition-all"
                >
                  <FiPlus />
                  New Task
                </button>
              </div>
            </div>
          </header>

          {mobileActionsOpen && (
            <div className="md:hidden mb-6">
              <GlassCard>
                <div className="flex flex-col gap-3">
                  <NotificationBell />

                  <button
                    onClick={() => exportTasksPDF(tasks)}
                    className="w-full py-3 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-400 font-bold"
                  >
                    Export Tasks
                  </button>

                  <button
                    onClick={() => exportNotesPDF(notes)}
                    className="w-full py-3 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-bold"
                  >
                    Export Notes
                  </button>

                  <button className="w-full py-3 rounded-2xl bg-white/10 border border-white/10 font-bold">
                    Dark Mode
                  </button>
                </div>
              </GlassCard>
            </div>
          )}

          <div className="md:hidden mb-6">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl bg-white/10 border border-white/10 py-3 pl-11 pr-4 outline-none placeholder:text-gray-500 focus:border-cyan-400/60 transition"
              />
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="md:hidden mb-6 w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 font-bold flex items-center justify-center gap-2"
          >
            <FiPlus />
            New Task
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
            <StatCard
              icon={<FiTarget />}
              title="Goal Progress"
              value={`${avgProgress}%`}
            />
            <StatCard
              icon={<FiCheckCircle />}
              title="Tasks Done"
              value={`${completedTasks}/${totalTasks}`}
            />
            <StatCard
              icon={<FiClock />}
              title="Total Tasks"
              value={totalTasks}
            />
            <StatCard
              icon={<FiZap />}
              title="Current Streak"
              value={`${streak.currentStreak} Days`}
            />
            <StatCard icon={<FiZap />} title="AI Score" value={`${aiScore}%`} />
          </div>

          <div className="grid xl:grid-cols-[1.4fr_0.8fr] gap-6">
            <div className="space-y-6">
              <GlassCard>
                <div className="mb-6">
                  <p className="text-sm text-gray-400">Today’s AI Plan</p>
                  <h3 className="text-2xl font-black">Your Study Schedule</h3>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  {["All", "Pending", "Completed", "High"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        filter === item
                          ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white"
                          : "bg-white/10 text-gray-400 hover:text-white hover:bg-white/15"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        toggleComplete={handleToggleComplete}
                        deleteTask={handleDeleteTask}
                        openEditModal={openEditModal}
                      />
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-10">
                      No tasks found.
                    </p>
                  )}
                </div>
              </GlassCard>
            </div>

            <div className="space-y-6">
              <GlassCard>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                    <FiZap />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">AI Suggestion</h3>
                    <p className="text-sm text-gray-400">Based on progress</p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {completedTasks === totalTasks && totalTasks > 0
                    ? "🎉 Amazing! All your tasks are completed today. Take some time to revise and prepare for tomorrow."
                    : streak.currentStreak >= 7
                      ? `🔥 You're on a ${streak.currentStreak}-day streak. Keep your momentum alive and avoid breaking the chain.`
                      : avgProgress < 30
                        ? "📚 You are falling behind schedule. Start with your highest priority task right now."
                        : avgProgress < 60
                          ? "⚡ Good start. Complete 2-3 pending tasks today to improve your productivity score."
                          : avgProgress < 85
                            ? "🚀 Great progress. Focus on revision and strengthen weaker topics."
                            : "🏆 Outstanding performance. Maintain consistency and aim for perfection."}
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-xl font-black mb-5">Upcoming Tasks</h3>

                <div className="space-y-4">
                  {tasks
                    .filter((task) => !task.completed)
                    .slice(0, 3)
                    .map((task) => (
                      <MiniTask
                        key={task.id}
                        title={task.subject}
                        time={task.time}
                      />
                    ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </main>
      </div>

      {modalOpen && (
        <AddTaskModal
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTask={handleAddTask}
          setModalOpen={setModalOpen}
        />
      )}

      {editModalOpen && editingTask && (
        <EditTaskModal
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          handleUpdateTask={handleUpdateTask}
          setEditModalOpen={setEditModalOpen}
        />
      )}
    </section>
  );
};

const AddTaskModal = ({ newTask, setNewTask, handleAddTask, setModalOpen }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-[30px] bg-[#07111f] border border-white/10 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black">Add New Task</h3>

          <button
            onClick={() => setModalOpen(false)}
            className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition"
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleAddTask} className="space-y-4">
          <input
            type="text"
            placeholder="Subject / Task name"
            value={newTask.subject}
            onChange={(e) =>
              setNewTask({ ...newTask, subject: e.target.value })
            }
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <input
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            placeholder="Time e.g. 09:00 AM - 11:00 AM"
            value={newTask.time}
            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <input
            type="number"
            min="0"
            max="100"
            placeholder="Progress %"
            value={newTask.progress}
            onChange={(e) =>
              setNewTask({ ...newTask, progress: e.target.value })
            }
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option className="bg-[#07111f]">High</option>
            <option className="bg-[#07111f]">Medium</option>
            <option className="bg-[#07111f]">Low</option>
          </select>

          <select
            value={newTask.category}
            onChange={(e) =>
              setNewTask({ ...newTask, category: e.target.value })
            }
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option className="bg-[#07111f]">Study</option>
            <option className="bg-[#07111f]">Revision</option>
            <option className="bg-[#07111f]">Test</option>
            <option className="bg-[#07111f]">Notes</option>
          </select>

          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 font-black hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(56,189,248,0.35)] transition-all">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

const EditTaskModal = ({
  editingTask,
  setEditingTask,
  handleUpdateTask,
  setEditModalOpen,
}) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-[30px] bg-[#07111f] border border-white/10 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black">Edit Task</h3>

          <button
            onClick={() => setEditModalOpen(false)}
            className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition"
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleUpdateTask} className="space-y-4">
          <input
            type="text"
            placeholder="Subject / Task name"
            value={editingTask.subject}
            onChange={(e) =>
              setEditingTask({ ...editingTask, subject: e.target.value })
            }
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <input
            type="date"
            value={editingTask.date}
            onChange={(e) =>
              setEditingTask({ ...editingTask, date: e.target.value })
            }
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            placeholder="Time e.g. 09:00 AM - 11:00 AM"
            value={editingTask.time}
            onChange={(e) =>
              setEditingTask({ ...editingTask, time: e.target.value })
            }
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <input
            type="number"
            min="0"
            max="100"
            placeholder="Progress %"
            value={editingTask.progress}
            onChange={(e) =>
              setEditingTask({ ...editingTask, progress: e.target.value })
            }
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <select
            value={editingTask.priority}
            onChange={(e) =>
              setEditingTask({ ...editingTask, priority: e.target.value })
            }
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option className="bg-[#07111f]">High</option>
            <option className="bg-[#07111f]">Medium</option>
            <option className="bg-[#07111f]">Low</option>
          </select>

          <select
            value={editingTask.category}
            onChange={(e) =>
              setEditingTask({ ...editingTask, category: e.target.value })
            }
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option className="bg-[#07111f]">Study</option>
            <option className="bg-[#07111f]">Revision</option>
            <option className="bg-[#07111f]">Test</option>
            <option className="bg-[#07111f]">Notes</option>
          </select>

          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 font-black hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(56,189,248,0.35)] transition-all">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

const GlassCard = ({ children }) => (
  <div className="rounded-[28px] bg-white/[0.07] border border-white/10 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)] hover:border-cyan-400/25 transition-all duration-300">
    {children}
  </div>
);

const StatCard = ({ icon, title, value }) => (
  <div className="group rounded-[26px] bg-white/[0.07] border border-white/10 backdrop-blur-xl p-5 hover:-translate-y-1 hover:border-cyan-400/30 transition-all duration-300">
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition">
      {icon}
    </div>
    <p className="text-gray-400 text-sm font-semibold">{title}</p>
    <h3 className="text-3xl font-black mt-1">{value}</h3>
  </div>
);

const TaskCard = ({ task, toggleComplete, deleteTask, openEditModal }) => (
  <div
    className={`rounded-2xl border p-4 hover:-translate-y-1 transition-all duration-300 ${
      task.completed
        ? "bg-green-500/10 border-green-400/30"
        : "bg-[#07111f] border-white/10 hover:border-cyan-400/25"
    }`}
  >
    <div className="flex items-center justify-between gap-4 mb-3">
      <div>
        <h4
          className={`font-black ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.subject}
        </h4>

        <p className="text-sm text-gray-500">{task.time}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              task.priority === "High"
                ? "bg-red-500/15 text-red-400"
                : task.priority === "Medium"
                  ? "bg-yellow-500/15 text-yellow-400"
                  : "bg-green-500/15 text-green-400"
            }`}
          >
            {task.priority || "Medium"}
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-300">
            {task.category || "Study"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => openEditModal(task)}
          className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition"
        >
          <FiEdit3 />
        </button>

        <button
          onClick={() => toggleComplete(task.id)}
          className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition"
        >
          <FiCheckCircle />
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>

    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        style={{ width: `${task.progress}%` }}
        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
      />
    </div>
  </div>
);

const MiniTask = ({ title, time }) => (
  <div className="flex items-center justify-between rounded-2xl bg-[#07111f] border border-white/10 p-4 hover:border-cyan-400/25 hover:-translate-y-1 transition-all">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        <FiGrid />
      </div>
      <h4 className="font-bold">{title}</h4>
    </div>
    <span className="text-sm text-gray-400">{time}</span>
  </div>
);

export default Dashboard;
