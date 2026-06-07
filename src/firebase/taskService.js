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

const taskCollection = collection(db, "tasks");

export const addTaskToFirestore = async (task, userId) => {
  return await addDoc(taskCollection, {
    ...task,
    userId,
    createdAt: new Date(),
  });
};

export const getTasksFromFirestore = async (userId) => {
  const q = query(
    taskCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};

export const updateTaskInFirestore = async (taskId, updatedTask) => {
  const taskRef = doc(db, "tasks", taskId);
  return await updateDoc(taskRef, updatedTask);
};

export const deleteTaskFromFirestore = async (taskId) => {
  const taskRef = doc(db, "tasks", taskId);
  return await deleteDoc(taskRef);
};