import { deleteApp, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

import { FormPermissionId } from "@/configs/formPermissions";
import { RoleEnum } from "@/configs/enums/roleEnum";
import { firebaseConfig, firestore } from "firebase/firebaseConfig";

export type CreateSubAccountDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  allowedForms: FormPermissionId[];
  parentAdminId: string;
};

export const createSubAccountWithPermissions = async ({
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  allowedForms,
  parentAdminId,
}: CreateSubAccountDTO): Promise<string> => {
  const normalizedFirstName = firstName.trim();
  const normalizedLastName = lastName.trim();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPhoneNumber = phoneNumber?.trim() ?? "";
  const normalizedAllowedForms = Array.from(new Set(allowedForms));

  const secondaryApp = initializeApp(
    firebaseConfig,
    `sub-account-${Date.now()}`
  );
  const secondaryAuth = getAuth(secondaryApp);
  const secondaryFirestore = getFirestore(secondaryApp);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      secondaryAuth,
      normalizedEmail,
      password
    );
    const uid = userCredential.user.uid;

    const subAccountProfile = {
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
      fullName: `${normalizedFirstName} ${normalizedLastName}`.trim(),
      email: normalizedEmail,
      phoneNumber: normalizedPhoneNumber,
      driverLicense: "",
      role: RoleEnum.subAdmin,
      userRole: RoleEnum.subAdmin,
      roles: [RoleEnum.subAdmin],
      accountType: RoleEnum.subAdmin,
      allowedForms: normalizedAllowedForms,
      parentAdminId,
      status: "active",
      isSubAccount: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(firestore, "users", uid), subAccountProfile);
    } catch (error: any) {
      if (error?.code !== "permission-denied") {
        throw error;
      }

      await setDoc(doc(secondaryFirestore, "users", uid), subAccountProfile);
    }

    await signOut(secondaryAuth);

    return uid;
  } finally {
    await deleteApp(secondaryApp);
  }
};
