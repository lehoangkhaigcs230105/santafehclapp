import { firebaseAuth } from "firebase/firebaseConfig";
import { signOut } from "firebase/auth";

export const logoutFirebase = async (): Promise<void> => {
  await signOut(firebaseAuth);
};
