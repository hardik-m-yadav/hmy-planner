import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAY_9Btvfp4WFuHAQ6Ivt-SOc6dXZMcUsE",
  authDomain: "hmy-planner.firebaseapp.com",
  projectId: "hmy-planner",
  storageBucket: "hmy-planner.firebasestorage.app",
  messagingSenderId: "997241059943",
  appId: "1:997241059943:web:c70188b90a29792060f2c2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default app;