import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db, firebaseAuth } from "../../../../firebase/firebaseConfig";

export const createEmployer = async (data: {
  companyName: string;
  employerCode: string;
}) => {
  const user = firebaseAuth.currentUser;

  if (!user) throw new Error("User not logged in");

  return await addDoc(collection(db, "employers"), {
    userId: user.uid,
    companyName: data.companyName,
    employerCode: data.employerCode,
    createdAt: serverTimestamp(),
  });
};

export const getEmployerByEmployerCode = async (employerCode: string) => {
  const normalizedEmployerCode = employerCode.trim();

  if (!normalizedEmployerCode) {
    return null;
  }

  const employerQuery = query(
    collection(db, "employers"),
    where("employerCode", "==", normalizedEmployerCode)
  );

  const snapshot = await getDocs(employerQuery);

  if (!snapshot.empty) {
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  }

  const fallbackQuery = query(
    collection(db, "employers"),
    where("code", "==", normalizedEmployerCode)
  );

  const fallbackSnapshot = await getDocs(fallbackQuery);

  if (!fallbackSnapshot.empty) {
    return { id: fallbackSnapshot.docs[0].id, ...fallbackSnapshot.docs[0].data() };
  }

  return null;
};
