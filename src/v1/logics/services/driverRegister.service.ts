import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, firebaseAuth } from "../../../../firebase/firebaseConfig";
import { getEmployerByEmployerCode as lookupEmployerByEmployerCode } from "./employerService";

export type DriverRegisterStepOneData = {
  status: string;
  plan: string;
  employerCode: string;
  license: string;
};

export type DriverRegisterStepTwoData = {
  code: string;
  companyName: string;
  driverPhone: string;
  companyCity: string;
  companyAddress: string;
  companyEmail: string;
  companyState: string;
  companyZip: string;
  usdot: string;
  mcNumber: string;
  derFirstName: string;
  derLastName: string;
  dateOfEnrollment: string;
  dateOfExpiration: string;
};

export type DriverRegisterFinalData = {
  witness: string;
  signDate: string;
  clinicSignatureOptional: string;
  completed: boolean;
};

const getCurrentUid = () => {
  const user = firebaseAuth.currentUser;
  if (!user) throw new Error("User not logged in");
  return user.uid;
};

export const createDriverRegisterStepOne = async (
  data: DriverRegisterStepOneData
) => {
  const uid = getCurrentUid();
  const normalizedEmployerCode = data.employerCode.trim();

  await setDoc(
    doc(db, "driverregister", uid),
    {
      userId: uid,
      status: data.status.trim(),
      plan: data.plan.trim(),
      employerCode: normalizedEmployerCode,
      license: data.license.trim(),
      stepOneCompleted: true,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const getDriverRegister = async () => {
  const uid = getCurrentUid();
  const snapshot = await getDoc(doc(db, "driverregister", uid));

  if (!snapshot.exists()) return null;
  return snapshot.data();
};

export const updateDriverRegisterStepTwo = async (
  data: DriverRegisterStepTwoData
) => {
  const uid = getCurrentUid();

  await setDoc(
    doc(db, "driverregister", uid),
    {
      ...data,
      stepTwoCompleted: true,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const completeDriverRegister = async (
  data: DriverRegisterFinalData
) => {
  const uid = getCurrentUid();

  await setDoc(
    doc(db, "driverregister", uid),
    {
      ...data,
      stepFinalCompleted: true,
      completed: true,
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const getEmployerByEmployerCode = async (employerCode: string) => {
  return lookupEmployerByEmployerCode(employerCode);
};
