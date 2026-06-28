import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, firebaseAuth } from "../../../../firebase/firebaseConfig";
import { getEmployerByEmployerCode as lookupEmployerByEmployerCode } from "./employerService";
import { submitDriverRegisterToJotform } from "./jotformRegister.service";

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

export type CompleteDriverRegisterResult = {
  jotformStatus: "submitted" | "queued" | "skipped";
  jotformSubmitted: boolean;
  jotformMessage: string;
};

const getCurrentUid = () => {
  const user = firebaseAuth.currentUser;
  if (!user) throw new Error("User not logged in");
  return user.uid;
};

const syncUserProfile = async (
  uid: string,
  data: Record<string, unknown>,
  includeCreatedAt = false
) => {
  await setDoc(
    doc(db, "users", uid),
    {
      ...data,
      updatedAt: serverTimestamp(),
      ...(includeCreatedAt ? { createdAt: serverTimestamp() } : {}),
    },
    { merge: true }
  );
};

export const createDriverRegisterStepOne = async (
  data: DriverRegisterStepOneData
) => {
  const uid = getCurrentUid();
  const normalizedEmployerCode = data.employerCode.trim();
  const normalizedLicense = data.license.trim();
  const normalizedStatus = data.status.trim();
  const normalizedPlan = data.plan.trim();

  await setDoc(
    doc(db, "driverregister", uid),
    {
      userId: uid,
      status: normalizedStatus,
      plan: normalizedPlan,
      employerCode: normalizedEmployerCode,
      license: normalizedLicense,
      stepOneCompleted: true,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );

  await syncUserProfile(
    uid,
    {
      status: normalizedStatus,
      plan: normalizedPlan,
      employerCode: normalizedEmployerCode,
      license: normalizedLicense,
      driverLicense: normalizedLicense,
      registerStepOneCompleted: true,
    },
    true
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
  const normalizedData = {
    code: data.code.trim(),
    companyName: data.companyName.trim(),
    driverPhone: data.driverPhone.trim(),
    companyCity: data.companyCity.trim(),
    companyAddress: data.companyAddress.trim(),
    companyEmail: data.companyEmail.trim(),
    companyState: data.companyState.trim(),
    companyZip: data.companyZip.trim(),
    usdot: data.usdot.trim(),
    mcNumber: data.mcNumber.trim(),
    derFirstName: data.derFirstName.trim(),
    derLastName: data.derLastName.trim(),
    dateOfEnrollment: data.dateOfEnrollment.trim(),
    dateOfExpiration: data.dateOfExpiration.trim(),
  };

  await setDoc(
    doc(db, "driverregister", uid),
    {
      ...normalizedData,
      stepTwoCompleted: true,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  await syncUserProfile(uid, {
    employerCode: normalizedData.code,
    companyName: normalizedData.companyName,
    company: normalizedData.companyName,
    phoneNumber: normalizedData.driverPhone,
    companyCity: normalizedData.companyCity,
    companyAddress: normalizedData.companyAddress,
    companyEmail: normalizedData.companyEmail,
    companyState: normalizedData.companyState,
    companyZip: normalizedData.companyZip,
    usdot: normalizedData.usdot,
    mcNumber: normalizedData.mcNumber,
    derFirstName: normalizedData.derFirstName,
    derLastName: normalizedData.derLastName,
    dateOfEnrollment: normalizedData.dateOfEnrollment,
    dateOfExpiration: normalizedData.dateOfExpiration,
    registerStepTwoCompleted: true,
  });
};

export const completeDriverRegister = async (
  data: DriverRegisterFinalData
) : Promise<CompleteDriverRegisterResult> => {
  const uid = getCurrentUid();
  const normalizedData = {
    witness: data.witness.trim(),
    signDate: data.signDate.trim(),
    clinicSignatureOptional: data.clinicSignatureOptional.trim(),
    completed: data.completed,
  };

  await setDoc(
    doc(db, "driverregister", uid),
    {
      ...normalizedData,
      stepFinalCompleted: true,
      completed: true,
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  await syncUserProfile(uid, {
    witness: normalizedData.witness,
    signDate: normalizedData.signDate,
    clinicSignatureOptional: normalizedData.clinicSignatureOptional,
    registerCompleted: true,
    registerSubmittedAt: serverTimestamp(),
  });

  const jotformResult = await submitDriverRegisterToJotform(uid);

  return {
    jotformStatus: jotformResult.submitted
      ? "submitted"
      : jotformResult.skipped
        ? "skipped"
        : "queued",
    jotformSubmitted: jotformResult.submitted,
    jotformMessage: jotformResult.message,
  };
};

export const resendDriverRegisterToJotform = async (): Promise<CompleteDriverRegisterResult> => {
  const uid = getCurrentUid();
  const jotformResult = await submitDriverRegisterToJotform(uid);

  return {
    jotformStatus: jotformResult.submitted
      ? "submitted"
      : jotformResult.skipped
        ? "skipped"
        : "queued",
    jotformSubmitted: jotformResult.submitted,
    jotformMessage: jotformResult.message,
  };
};

export const getEmployerByEmployerCode = async (employerCode: string) => {
  return lookupEmployerByEmployerCode(employerCode);
};
