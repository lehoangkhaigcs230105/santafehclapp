import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { RoleEnum } from "@/configs/enums/roleEnum";
import { firebaseAuth, firestore } from "firebase/firebaseConfig";
import { ProfileDTO } from "../data/DTO/authDTOs/ProfileDTO";

/**
 * Register user with Firebase Auth + Firestore
 */
export const registerWithFirebase = async (
  profile: ProfileDTO
): Promise<string> => {
  const normalizedFirstName = profile.firstName.trim();
  const normalizedLastName = profile.lastName.trim();
  const normalizedEmail = profile.email.trim().toLowerCase();
  const normalizedPhoneNumber = profile.phoneNumber.trim();
  const normalizedDriverLicense = profile.driverLicense.trim().toUpperCase();

  // 1️⃣ Create Firebase Auth account
  const userCredential = await createUserWithEmailAndPassword(
    firebaseAuth,
    normalizedEmail,
    profile.password ?? ""
  );

  const uid = userCredential.user.uid;

  // 2️⃣ Save user profile to Firestore
  await setDoc(doc(firestore, "users", uid), {
    firstName: normalizedFirstName,
    lastName: normalizedLastName,
    fullName: `${normalizedFirstName} ${normalizedLastName}`.trim(),
    email: normalizedEmail,
    phoneNumber: normalizedPhoneNumber,
    driverLicense: normalizedDriverLicense,
    companyName: profile.companyName?.trim() ?? "",
    state: profile.state?.trim() ?? "",
    dateOfBirth: profile.dateOfBirth?.trim() ?? "",
    expireOfDriverLicense: profile.expireOfDriverLicense?.trim() ?? "",
    address: profile.address?.trim() ?? "",
    city: profile.city?.trim() ?? "",
    note: profile.note?.trim() ?? "",
    role: RoleEnum.user,
    allowedForms: [],
    parentAdminId: null,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return uid;
};
