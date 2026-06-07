import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.unshift({
        id: Date.now(),
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type || "info",
        read: false,
        createdAt: new Date().toISOString(),
      });
    },

    markAsRead: (state, action) => {
      const notification = state.find((item) => item.id === action.payload);
      if (notification) notification.read = true;
    },

    clearNotifications: () => {
      return [];
    },
  },
});

export const { addNotification, markAsRead, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;