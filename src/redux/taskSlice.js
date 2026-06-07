import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    subject: "Mathematics",
    date: "2026-06-03",
    time: "09:00 AM - 11:00 AM",
    progress: 82,
    priority: "High",
    category: "Study",
    completed: false,
  },
  {
    id: 2,
    subject: "Physics Revision",
    date: "2026-06-01",
    time: "12:00 PM - 01:30 PM",
    progress: 65,
    priority: "Medium",
    category: "Revision",
    completed: false,
  },
  {
    id: 3,
    subject: "Chemistry Notes",
    date: "2026-06-04",
    time: "04:00 PM - 05:00 PM",
    progress: 48,
    priority: "Low",
    category: "Notes",
    completed: false,
  },
];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
    },

    addTask: (state, action) => {
      state.unshift({
        id: action.payload.id || Date.now(),
        subject: action.payload.subject,
        date: action.payload.date,
        time: action.payload.time,
        progress: Number(action.payload.progress),
        priority: action.payload.priority,
        category: action.payload.category,
        completed: false,
      });
    },

    updateTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload.id);

      if (task) {
        task.subject = action.payload.subject;
        task.date = action.payload.date;
        task.time = action.payload.time;
        task.progress = Number(action.payload.progress);
        task.priority = action.payload.priority;
        task.category = action.payload.category;
      }
    },

    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },

    toggleComplete: (state, action) => {
      const task = state.find((task) => task.id === action.payload);

      if (task) {
        task.completed = !task.completed;
        task.progress = task.completed ? 100 : task.progress;
      }
    },

    clearTasks: () => {
      return [];
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleComplete,
  clearTasks,
} = taskSlice.actions;

export default taskSlice.reducer;