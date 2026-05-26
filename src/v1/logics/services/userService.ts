import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";

export const createUserProfile = async (
  uid: string,
  data: {
    status: string;
    plan: string;
    employerCode: string;
    license: string;
  }
) => {
  await setDoc(doc(db, "users", uid), {
    ...data,
    createdAt: serverTimestamp(),
  });
};