import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import noteReducer from "./noteSlice";
import notificationReducer from "./notificationSlice";

const loadTasks = () => {
  try {
    const savedTasks = localStorage.getItem("hmyTasks");
    return savedTasks ? JSON.parse(savedTasks) : undefined;
  } catch {
    return undefined;
  }
};



export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    notes: noteReducer,
    notifications: notificationReducer,
  },
  preloadedState: {
    tasks: loadTasks(),
  },
});

store.subscribe(() => {
  localStorage.setItem("hmyTasks", JSON.stringify(store.getState().tasks));
});


