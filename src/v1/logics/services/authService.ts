import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../../firebase/firebaseConfig";

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );

  return userCredential.user; // có uid
};