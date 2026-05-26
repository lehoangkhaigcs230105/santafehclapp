import { signInWithEmailAndPassword, User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

import { normalizeRole, RoleEnum } from "@/configs/enums/roleEnum";
import { firebaseAuth, firestore } from "firebase/firebaseConfig";

export type FirebaseLoginResponse = {
  uid: string;
  email: string | null;
  role: RoleEnum;
  authUser: User;
  profile: Record<string, unknown>;
};

const getEmailByDriverLicense = async (driverLicense: string) => {
  const userQuery = query(
    collection(firestore, "users"),
    where("driverLicense", "==", driverLicense.trim()),
    limit(1)
  );
  const snapshot = await getDocs(userQuery);

  if (snapshot.empty) {
    throw new Error("Không tìm thấy tài khoản với Driver License này");
  }

  const email = snapshot.docs[0].data().email;

  if (!email || typeof email !== "string") {
    throw new Error("Tài khoản chưa có email hợp lệ");
  }

  return email;
};

const getRoleFromProfile = (profile: Record<string, unknown>): RoleEnum => {
  return (
    normalizeRole(profile.role) ??
    normalizeRole(profile.userRole) ??
    normalizeRole(profile.roles) ??
    normalizeRole(profile.accountType) ??
    RoleEnum.user
  );
};

export const loginWithFirebase = async (
  loginName: string,
  password: string
): Promise<FirebaseLoginResponse> => {
  const email = loginName.includes("@")
    ? loginName.trim()
    : await getEmailByDriverLicense(loginName);

  const userCredential = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );

  const user = userCredential.user;
  const userDoc = await getDoc(doc(firestore, "users", user.uid));

  if (!userDoc.exists()) {
    throw new Error("Không tìm thấy thông tin người dùng");
  }

  const profile = userDoc.data();
  const role = getRoleFromProfile(profile);

  return {
    uid: user.uid,
    email: user.email,
    role,
    authUser: user,
    profile,
  };
};
