import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db, firebaseAuth } from "../../../../firebase/firebaseConfig";

export const normalizeEmployerCode = (employerCode: string) =>
  employerCode.trim().toUpperCase();

export const createEmployer = async (data: {
  companyName: string;
  employerCode: string;
}) => {
  const user = firebaseAuth.currentUser;

  if (!user) throw new Error("User not logged in");

  return await addDoc(collection(db, "employers"), {
    userId: user.uid,
    companyName: data.companyName.trim(),
    employerCode: normalizeEmployerCode(data.employerCode),
    createdAt: serverTimestamp(),
  });
};

const findEmployerByField = async (field: string, value: string) => {
  const snapshot = await getDocs(
    query(collection(db, "employers"), where(field, "==", value))
  );

  if (!snapshot.empty) {
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  }

  return null;
};

export const getEmployerByEmployerCode = async (employerCode: string) => {
  const trimmedCode = employerCode.trim();

  if (!trimmedCode) {
    return null;
  }

  const normalizedCode = normalizeEmployerCode(trimmedCode);

  const candidates = [trimmedCode, normalizedCode].filter(
    (value, index, array) => array.indexOf(value) === index
  );

  for (const candidate of candidates) {
    const directMatch = await findEmployerByField("employerCode", candidate);
    if (directMatch) return directMatch;
  }

  for (const candidate of candidates) {
    const fallbackMatch = await findEmployerByField("code", candidate);
    if (fallbackMatch) return fallbackMatch;
  }

  return null;
};
