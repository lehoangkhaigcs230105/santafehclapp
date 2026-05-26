import { deleteApp, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

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
  const secondaryApp = initializeApp(
    firebaseConfig,
    `sub-account-${Date.now()}`
  );
  const secondaryAuth = getAuth(secondaryApp);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      secondaryAuth,
      email.trim(),
      password
    );
    const uid = userCredential.user.uid;

    await setDoc(doc(firestore, "users", uid), {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName: `${firstName.trim()} ${lastName.trim()}`.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber?.trim() ?? "",
      driverLicense: "",
      role: RoleEnum.subAdmin,
      allowedForms,
      parentAdminId,
      status: "active",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await signOut(secondaryAuth);

    return uid;
  } finally {
    await deleteApp(secondaryApp);
  }
};
