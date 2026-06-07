import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";

const noteCollection = collection(db, "notes");

export const addNoteToFirestore = async (note, userId) => {
  return await addDoc(noteCollection, {
    ...note,
    userId,
    createdAt: new Date(),
  });
};

export const getNotesFromFirestore = async (userId) => {
  const q = query(
    noteCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};

export const updateNoteInFirestore = async (noteId, updatedNote) => {
  const noteRef = doc(db, "notes", noteId);
  return await updateDoc(noteRef, updatedNote);
};

export const deleteNoteFromFirestore = async (noteId) => {
  const noteRef = doc(db, "notes", noteId);
  return await deleteDoc(noteRef);
};