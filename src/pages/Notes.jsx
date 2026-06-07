import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote, deleteNote, setNotes } from "../redux/noteSlice";
import { useAuth } from "../context/AuthContext";
import DashboardNavbar from "../components/DashboardNavbar";


import {
  addNoteToFirestore,
  getNotesFromFirestore,
  updateNoteInFirestore,
  deleteNoteFromFirestore,
} from "../firebase/noteService";

import {
  FiEdit3,
  FiFileText,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiX,
  FiZap,
} from "react-icons/fi";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const { currentUser } = useAuth();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    category: "Study",
  });

  const categories = ["All", "Study", "Revision", "Ideas", "Important"];

  useEffect(() => {
    const fetchNotes = async () => {
      if (!currentUser) return;

      const firebaseNotes = await getNotesFromFirestore(currentUser.uid);
      dispatch(setNotes(firebaseNotes));
    };

    fetchNotes();
  }, [currentUser, dispatch]);

  const filteredNotes = notes.filter((note) => {
    const matchSearch =
      note.title?.toLowerCase().includes(search.toLowerCase()) ||
      note.content?.toLowerCase().includes(search.toLowerCase());

    const matchCategory = filter === "All" || note.category === filter;

    return matchSearch && matchCategory;
  });

  const openAddModal = () => {
    setEditingNote(null);
    setNoteData({
      title: "",
      content: "",
      category: "Study",
    });
    setModalOpen(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setNoteData({
      title: note.title,
      content: note.content,
      category: note.category || "Study",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!noteData.title || !noteData.content) return;
    if (!currentUser) return;

    if (editingNote) {
      const updatedNote = {
        title: noteData.title,
        content: noteData.content,
        category: noteData.category,
      };

      await updateNoteInFirestore(editingNote.id, updatedNote);

      dispatch(
        updateNote({
          id: editingNote.id,
          ...updatedNote,
        })
      );
    } else {
      const newNote = {
        title: noteData.title,
        content: noteData.content,
        category: noteData.category,
      };

      const docRef = await addNoteToFirestore(newNote, currentUser.uid);

      dispatch(
        addNote({
          id: docRef.id,
          ...newNote,
          createdAt: new Date().toISOString(),
        })
      );
    }

    setNoteData({
      title: "",
      content: "",
      category: "Study",
    });

    setEditingNote(null);
    setModalOpen(false);
  };

  const handleDeleteNote = async (id) => {
    await deleteNoteFromFirestore(id);
    dispatch(deleteNote(id));
  };

  return (
    <section className="min-h-screen bg-[#050914] text-white relative overflow-hidden p-4 sm:p-6 lg:p-8">
      <DashboardNavbar/>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px]" />
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-purple-600/25 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-cyan-300 font-semibold text-sm flex items-center gap-2">
              <FiZap />
              Hmy Planner Notes
            </p>

            <h1 className="text-3xl sm:text-4xl font-black mt-2">
              Study Notes
            </h1>
          </div>

          <button
  onClick={openAddModal}
  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 font-bold flex items-center justify-center gap-2"
>
            <FiPlus />
            New Note
          </button>
        </div>

       <div className="flex flex-col lg:grid lg:grid-cols-[280px_minmax(0,1fr)] gap-6">
     <aside className="w-full lg:w-auto lg:sticky lg:top-6 h-fit">
  <div className="rounded-[28px] bg-white/[0.07] border border-white/10 backdrop-blur-2xl p-4 sm:p-5">
    <h3 className="font-black text-lg sm:text-xl mb-4">
      Categories
    </h3>

    <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible scrollbar-hide">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={`flex-shrink-0 lg:w-full px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
            filter === item
              ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white"
              : "bg-white/10 text-gray-400 hover:bg-white/15 hover:text-white"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
</aside>

          <main>
            <div className="relative mb-6">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl bg-white/[0.07] border border-white/10 py-4 pl-12 pr-4 outline-none placeholder:text-gray-500 focus:border-cyan-400/60 transition"
              />
            </div>

            {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    openEditModal={openEditModal}
                    deleteNote={handleDeleteNote}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] bg-white/[0.07] border border-white/10 p-10 text-center">
                <FiFileText className="mx-auto text-5xl text-cyan-300 mb-4" />
                <h3 className="text-2xl font-black mb-2">No Notes Found</h3>
                <p className="text-gray-400">
                  Create your first note to start organizing your study ideas.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {modalOpen && (
        <NoteModal
          noteData={noteData}
          setNoteData={setNoteData}
          handleSubmit={handleSubmit}
          setModalOpen={setModalOpen}
          editingNote={editingNote}
        />
      )}
    </section>
  );
};

const NoteCard = ({ note, openEditModal, deleteNote }) => {
  return (
   <div className="group h-full rounded-[26px] bg-white/[0.07] border border-white/10 backdrop-blur-xl p-4 sm:p-5 hover:-translate-y-1 hover:border-cyan-400/30 transition-all duration-300 flex flex-col overflow-hidden">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition">
          <FiFileText />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => openEditModal(note)}
            className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-300 transition"
          >
            <FiEdit3 />
          </button>

          <button
            onClick={() => deleteNote(note.id)}
            className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-300">
        {note.category}
      </span>

      <h3 className="text-lg font-black mb-2 break-words line-clamp-2">
  {note.title}
</h3>

     <p className="text-gray-400 text-sm leading-relaxed flex-1 break-words overflow-hidden line-clamp-5">
  {note.content}
</p>
    </div>
  );
};

const NoteModal = ({
  noteData,
  setNoteData,
  handleSubmit,
  setModalOpen,
  editingNote,
}) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
    <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-[30px] bg-[#07111f] border border-white/10 p-4 sm:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black">
            {editingNote ? "Edit Note" : "Create Note"}
          </h3>

          <button
            onClick={() => setModalOpen(false)}
            className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition"
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Note title"
            value={noteData.title}
            onChange={(e) =>
              setNoteData({ ...noteData, title: e.target.value })
            }
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <textarea
            rows="6"
            placeholder="Write your note..."
            value={noteData.content}
            onChange={(e) =>
              setNoteData({ ...noteData, content: e.target.value })
            }
            className="w-full resize-none rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <select
            value={noteData.category}
            onChange={(e) =>
              setNoteData({ ...noteData, category: e.target.value })
            }
            className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option className="bg-[#07111f]">Study</option>
            <option className="bg-[#07111f]">Revision</option>
            <option className="bg-[#07111f]">Ideas</option>
            <option className="bg-[#07111f]">Important</option>
          </select>

          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 font-black hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(56,189,248,0.35)] transition-all">
            {editingNote ? "Update Note" : "Save Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Notes;