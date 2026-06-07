import { doc, getDoc } from "firebase/firestore";
import { db, firebaseAuth } from "../../../../firebase/firebaseConfig";
import { normalizeEmployerCode } from "./employerService";

type LooseRecord = Record<string, any>;

export type DriverPrefillData = {
  driverFirstName: string;
  driverLastName: string;
  dateOfBirth: string;
  driverPhone: string;
  driverEmail: string;
  driverStateLicenseIssue: string;
  driverCity: string;
  driverState: string;
  driverZip: string;
  driverAddress: string;
  driverLicenseNumber: string;
  license: string;
  employerCode: string;
  companyName: string;
};

const pickValue = (...values: Array<unknown>) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
};

const splitFullName = (fullName: string) => {
  const normalized = fullName.trim().replace(/\s+/g, " ");
  if (!normalized) {
    return { firstName: "", lastName: "" };
  }

  const parts = normalized.split(" ");
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }

  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1],
  };
};

export const getDriverPrefillData = async (): Promise<DriverPrefillData | null> => {
  const user = firebaseAuth.currentUser;

  if (!user) {
    return null;
  }

  const [userSnap, registerSnap] = await Promise.all([
    getDoc(doc(db, "users", user.uid)),
    getDoc(doc(db, "driverregister", user.uid)),
  ]);

  const userData: LooseRecord = userSnap.exists() ? userSnap.data() : {};
  const registerData: LooseRecord = registerSnap.exists() ? registerSnap.data() : {};

  const fallbackName = pickValue(
    userData.fullName,
    registerData.fullName,
    [userData.firstName, userData.lastName].filter(Boolean).join(" "),
    [registerData.driverFirstName, registerData.driverLastName].filter(Boolean).join(" ")
  );

  const { firstName, lastName } = splitFullName(fallbackName);
  const employerCode = pickValue(registerData.employerCode, userData.employerCode);

  return {
    driverFirstName: pickValue(
      userData.driverFirstName,
      userData.firstName,
      registerData.driverFirstName,
      firstName
    ),
    driverLastName: pickValue(
      userData.driverLastName,
      userData.lastName,
      registerData.driverLastName,
      lastName
    ),
    dateOfBirth: pickValue(
      userData.birthDate,
      userData.dateOfBirth,
      registerData.dateOfBirth
    ),
    driverPhone: pickValue(
      userData.phone,
      userData.phoneNumber,
      registerData.driverPhone
    ),
    driverEmail: pickValue(userData.email, user.email, registerData.driverEmail),
    driverStateLicenseIssue: pickValue(
      userData.driverStateLicenseIssue,
      userData.issuingState,
      userData.state,
      registerData.driverStateLicenseIssue
    ),
    driverCity: pickValue(userData.city, registerData.driverCity),
    driverState: pickValue(userData.state, userData.driverState, registerData.driverState),
    driverZip: pickValue(
      userData.zipCode,
      userData.zip,
      userData.driverZip,
      registerData.driverZip
    ),
    driverAddress: pickValue(
      userData.address,
      userData.driverAddress,
      registerData.driverAddress
    ),
    driverLicenseNumber: pickValue(
      userData.driverLicense,
      userData.license,
      registerData.driverLicenseNumber,
      registerData.license
    ),
    license: pickValue(
      userData.license,
      userData.driverLicense,
      registerData.license,
      registerData.driverLicenseNumber
    ),
    employerCode: employerCode ? normalizeEmployerCode(employerCode) : "",
    companyName: pickValue(registerData.companyName, userData.companyName, userData.company),
  };
};
