import { ImageSourcePropType } from "react-native";

import { IconURI } from "@/assets/icons/icon";

export type FormPermissionId =
  | "renew"
  | "register"
  | "hair"
  | "random"
  | "drug"
  | "postAccident"
  | "returnDuty"
  | "followUp"
  | "term"
  | "employer"
  | "medical"
  | "medicalDoctor";

export type ClinicFormPermission = {
  id: FormPermissionId;
  label: string;
  description: string;
  iconSource: ImageSourcePropType;
  routeName: string;
  params?: Record<string, string>;
};

export const CLINIC_FORM_PERMISSIONS: ClinicFormPermission[] = [
  {
    id: "renew",
    label: "Renew",
    description: "Renewal intake and review",
    iconSource: IconURI.renew,
    routeName: "questionScreen",
    params: { type: "renew" },
  },
  {
    id: "register",
    label: "Register",
    description: "New registration workflow",
    iconSource: IconURI.register,
    routeName: "questionScreen",
    params: { type: "register" },
  },
  {
    id: "hair",
    label: "Hair Test",
    description: "Hair test request form",
    iconSource: IconURI.hair,
    routeName: "hairTestStepOneScreen",
  },
  {
    id: "random",
    label: "Random Test",
    description: "Random testing form",
    iconSource: IconURI.random,
    routeName: "randomStepOneScreen",
  },
  {
    id: "drug",
    label: "Drug Test",
    description: "Drug test only form",
    iconSource: IconURI.drug,
    routeName: "drugTestStepOneScreen",
  },
  {
    id: "postAccident",
    label: "Post Accident",
    description: "Post accident testing form",
    iconSource: IconURI.postAccident,
    routeName: "postAccidentStepOneScreen",
  },
  {
    id: "returnDuty",
    label: "Return To Duty",
    description: "Return to duty clearance",
    iconSource: IconURI.returnDuty,
    routeName: "returnDutyStepOneScreen",
  },
  {
    id: "followUp",
    label: "Follow Up",
    description: "Follow-up testing workflow",
    iconSource: IconURI.followUp,
    routeName: "followUpStepOneScreen",
  },
  {
    id: "term",
    label: "Termination",
    description: "Termination form",
    iconSource: IconURI.term,
    routeName: "termScreen",
  },
  {
    id: "employer",
    label: "Employer",
    description: "Employer information form",
    iconSource: IconURI.employer,
    routeName: "employerScreen",
  },
  {
    id: "medical",
    label: "Medical",
    description: "Medical certificate form",
    iconSource: IconURI.medical,
    routeName: "medicalCertificateStepOneScreen",
  },
  {
    id: "medicalDoctor",
    label: "Medical Doctor",
    description: "Doctor certificate workflow",
    iconSource: IconURI.medical,
    routeName: "medicalCertificateDrStepOneScreen",
  },
];

export const getAllowedForms = (allowedForms?: unknown): FormPermissionId[] => {
  if (!Array.isArray(allowedForms)) return [];

  const validIds = new Set(CLINIC_FORM_PERMISSIONS.map((form) => form.id));

  return allowedForms.filter((form): form is FormPermissionId =>
    validIds.has(form as FormPermissionId)
  );
};
