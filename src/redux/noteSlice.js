import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.unshift({
        id: Date.now(),
        title: action.payload.title,
        content: action.payload.content,
        category: action.payload.category,
        createdAt: new Date().toISOString(),
      });
    },


     setNotes: (state, action) => {
  return action.payload;
},

    updateNote: (state, action) => {
      const note = state.find(
        (note) => note.id === action.payload.id
      );

      if (note) {
        note.title = action.payload.title;
        note.content = action.payload.content;
        note.category = action.payload.category;
      }
    },

    deleteNote: (state, action) => {
      return state.filter(
        (note) => note.id !== action.payload
      );
    },
  },
});


export const {
  setNotes,
  addNote,
  updateNote,
  deleteNote,
} = noteSlice.actions;

export default noteSlice.reducer;