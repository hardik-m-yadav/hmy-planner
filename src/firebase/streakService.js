import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const getToday = () => new Date().toISOString().split("T")[0];

const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split("T")[0];
};

export const getUserStreak = async (userId) => {
  const streakRef = doc(db, "streaks", userId);
  const snap = await getDoc(streakRef);

  if (snap.exists()) {
    return snap.data();
  }

  const defaultStreak = {
    currentStreak: 0,
    bestStreak: 0,
    lastCompletedDate: "",
    completedToday: 0,
  };

  await setDoc(streakRef, defaultStreak);
  return defaultStreak;
};

export const updateUserStreak = async (userId) => {
  const streakRef = doc(db, "streaks", userId);
  const snap = await getDoc(streakRef);

  const today = getToday();
  const yesterday = getYesterday();

  let data = snap.exists()
    ? snap.data()
    : {
        currentStreak: 0,
        bestStreak: 0,
        lastCompletedDate: "",
        completedToday: 0,
      };

  let currentStreak = data.currentStreak || 0;
  let bestStreak = data.bestStreak || 0;
  let completedToday = data.completedToday || 0;

  if (data.lastCompletedDate === today) {
    completedToday += 1;
  } else if (data.lastCompletedDate === yesterday) {
    currentStreak += 1;
    completedToday = 1;
  } else {
    currentStreak = 1;
    completedToday = 1;
  }

  bestStreak = Math.max(bestStreak, currentStreak);

  const updatedStreak = {
    currentStreak,
    bestStreak,
    lastCompletedDate: today,
    completedToday,
  };

  await setDoc(streakRef, updatedStreak);
  return updatedStreak;
};