import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyD0fA_kb2Z3FHKk1ujl-XfaI3JyUIFVFgo",
  authDomain: "santafe-mobile.firebaseapp.com",
  projectId: "santafe-mobile",
  storageBucket: "santafe-mobile.appspot.com",
  messagingSenderId: "988547065498",
  appId: "1:988547065498:web:561bdf9e9ecfc7d592e123",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const firebaseAuth = getAuth(app);
export const firestore = getFirestore(app);
export const db = getFirestore(app);
export const firebaseFunctions = getFunctions(app);
export const firebaseStorage = getStorage(app);

export default app;
