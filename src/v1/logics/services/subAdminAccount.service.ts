import { FormPermissionId, getAllowedForms } from "@/configs/formPermissions";
import { RoleEnum } from "@/configs/enums/roleEnum";
import { firestore } from "firebase/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

export type SubAdminAccount = {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  allowedForms: FormPermissionId[];
  status?: string;
};

export const subscribeToSubAdminAccounts = (
  parentAdminId: string,
  onAccounts: (accounts: SubAdminAccount[]) => void,
  onError?: (error: Error) => void
) => {
  const subAdminQuery = query(
    collection(firestore, "users"),
    where("parentAdminId", "==", parentAdminId),
    where("isSubAccount", "==", true)
  );

  return onSnapshot(
    subAdminQuery,
    (snapshot) => {
      const accounts = snapshot.docs.map((accountDoc) => {
        const data = accountDoc.data();

        return {
          id: accountDoc.id,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          allowedForms: getAllowedForms(data.allowedForms),
          status: data.status,
        };
      });

      onAccounts(accounts);
    },
    (error) => {
      onError?.(error);
    }
  );
};

export const updateSubAdminAllowedForms = async (
  subAdminId: string,
  allowedForms: FormPermissionId[]
) => {
  const normalizedAllowedForms = Array.from(new Set(allowedForms));

  await updateDoc(doc(firestore, "users", subAdminId), {
    allowedForms: normalizedAllowedForms,
    role: RoleEnum.subAdmin,
    userRole: RoleEnum.subAdmin,
    accountType: RoleEnum.subAdmin,
    updatedAt: serverTimestamp(),
  });
};
