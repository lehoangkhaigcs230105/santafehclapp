import * as admin from "firebase-admin";
import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";

admin.initializeApp();

const db = admin.firestore();

const JOTFORM_REGISTER_FORM_ID = "251982343900154";
const JOTFORM_REGISTER_SUBMIT_URL =
  "https://hipaa-submit.jotform.com/submit/251982343900154";

const JOTFORM_REGISTER_FIELD_MAP = {
  status: "q374_status",
  plan: "q9_name9[]",
  serviceEvent: "q416_serviceevent[]",
  employerCode: "q378_code",
  driverLicensePrimary: "q421_driverLicense",
  driverLicenseSecondary: "q16_driverLicense16",
  companyName: "q3_companyName3",
  driverPhone: "q333_driverPhone[full]",
  companyCity: "q316_companyCity",
  companyAddress: "q315_companyAddress",
  companyEmail: "q8_companyEmail",
  companyState: "q317_companyState",
  companyZip: "q318_companyZip",
  usdot: "q15_usdot",
  mcNumber: "q7_mc",
  derFirstName: "q363_derFirst",
  derLastName: "q314_derLast314",
  driverFirstNamePrimary: "q352_driverFirst352",
  driverFirstNameSecondary: "q10_driverFirst",
  driverLastName: "q320_driverLast",
  driverEmail: "q339_driverEmail",
  driverAddress: "q334_driverStreet",
  driverCity: "q335_driverCity",
  driverState: "q336_driverState",
  driverZip: "q337_driverZip",
  driverStateLicenseIssue: "q338_driverState338",
  dateOfBirth: "q369_dateOf369",
  dateOfEnrollmentMonth: "q12_dateOf[month]",
  dateOfEnrollmentDay: "q12_dateOf[day]",
  dateOfEnrollmentYear: "q12_dateOf[year]",
  dateOfExpirationMonth: "q17_dateOf17[month]",
  dateOfExpirationDay: "q17_dateOf17[day]",
  dateOfExpirationYear: "q17_dateOf17[year]",
  witness: "q328_witness",
  signDateMonth: "q21_signDate[month]",
  signDateDay: "q21_signDate[day]",
  signDateYear: "q21_signDate[year]",
} as const;

const getString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const appendMappedField = (
  params: URLSearchParams,
  fieldName: string,
  value: string
) => {
  const normalizedFieldName = fieldName.trim();
  const normalizedValue = value.trim();

  if (!normalizedFieldName || !normalizedValue) {
    return;
  }

  params.append(normalizedFieldName, normalizedValue);
};

const normalizeRegisterStatus = (status: string) => {
  const normalized = status.trim().toUpperCase();

  if (normalized === "RENEW") {
    return "RENEW";
  }

  if (normalized === "ENROLL" || normalized === "ENROLLMENT") {
    return "ENROLLMENT";
  }

  return normalized ? "OTHER" : "";
};

const normalizePlanValue = (plan: string) => {
  const normalized = plan.trim().toUpperCase();
  const supportedPlans = new Set([
    "PLAN A",
    "PLAN C",
    "SCHOOL",
    "DRUG TEST ONLY",
    "CPUC",
    "FOLLOW UP",
    "RETURN OF DUTY",
    "POST ACCIDENT",
    "DNA",
    "HAIR TEST",
    "RENEW",
    "OTHER",
  ]);

  return supportedPlans.has(normalized) ? normalized : normalized ? "OTHER" : "";
};

const normalizeWitnessValue = (witness: string) => {
  const normalized = witness.trim();
  const supportedWitnesses = new Set([
    "Hung Lai",
    "Vivian Tran",
    "Abigail Yudico",
    "Others",
  ]);

  return supportedWitnesses.has(normalized) ? normalized : normalized ? "Others" : "";
};

const splitDateParts = (value: string) => {
  const normalized = value.trim();
  if (!normalized) {
    return { month: "", day: "", year: "" };
  }

  const slashMatch = normalized.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    return {
      month: slashMatch[1].padStart(2, "0"),
      day: slashMatch[2].padStart(2, "0"),
      year: slashMatch[3],
    };
  }

  const dashMatch = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (dashMatch) {
    return {
      month: dashMatch[2].padStart(2, "0"),
      day: dashMatch[3].padStart(2, "0"),
      year: dashMatch[1],
    };
  }

  return { month: "", day: "", year: "" };
};

const buildRegisterParams = (
  registerData: Record<string, unknown>,
  userData: Record<string, unknown>
) => {
  const employerCode =
    getString(registerData.code) || getString(registerData.employerCode);
  const driverLicense =
    getString(registerData.license) ||
    getString(userData.driverLicense) ||
    getString(userData.license);

  const normalizedStatus = normalizeRegisterStatus(getString(registerData.status));
  const normalizedPlan = normalizePlanValue(getString(registerData.plan));
  const normalizedWitness = normalizeWitnessValue(getString(registerData.witness));
  const enrollmentDateParts = splitDateParts(getString(registerData.dateOfEnrollment));
  const expirationDateParts = splitDateParts(getString(registerData.dateOfExpiration));
  const signDateParts = splitDateParts(getString(registerData.signDate));

  const firstName =
    getString(userData.driverFirstName) ||
    getString(userData.firstName) ||
    getString(registerData.driverFirstName);
  const lastName =
    getString(userData.driverLastName) ||
    getString(userData.lastName) ||
    getString(registerData.driverLastName);

  const params = new URLSearchParams();
  params.append("formID", JOTFORM_REGISTER_FORM_ID);
  params.append("submitSource", "firebaseFunction");
  params.append("eventObserver", "1");

  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.status, normalizedStatus);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.plan, normalizedPlan);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.serviceEvent, "REGISTER");
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.employerCode, employerCode);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.driverLicensePrimary, driverLicense);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.driverLicenseSecondary, driverLicense);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.companyName, getString(registerData.companyName));
  appendMappedField(
    params,
    JOTFORM_REGISTER_FIELD_MAP.driverPhone,
    getString(registerData.driverPhone) || getString(userData.phoneNumber) || getString(userData.phone)
  );
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.companyCity, getString(registerData.companyCity));
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.companyAddress, getString(registerData.companyAddress));
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.companyEmail, getString(registerData.companyEmail));
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.companyState, getString(registerData.companyState));
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.companyZip, getString(registerData.companyZip));
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.usdot, getString(registerData.usdot));
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.mcNumber, getString(registerData.mcNumber));
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.derFirstName, getString(registerData.derFirstName));
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.derLastName, getString(registerData.derLastName));
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.driverFirstNamePrimary, firstName);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.driverFirstNameSecondary, firstName);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.driverLastName, lastName);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.driverEmail, getString(userData.email));
  appendMappedField(
    params,
    JOTFORM_REGISTER_FIELD_MAP.driverAddress,
    getString(userData.driverAddress) || getString(userData.address)
  );
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.driverCity, getString(userData.driverCity) || getString(userData.city));
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.driverState, getString(userData.driverState) || getString(userData.state));
  appendMappedField(
    params,
    JOTFORM_REGISTER_FIELD_MAP.driverZip,
    getString(userData.driverZip) || getString(userData.zipCode) || getString(userData.zip)
  );
  appendMappedField(
    params,
    JOTFORM_REGISTER_FIELD_MAP.driverStateLicenseIssue,
    getString(userData.driverStateLicenseIssue) || getString(userData.issuingState)
  );
  appendMappedField(
    params,
    JOTFORM_REGISTER_FIELD_MAP.dateOfBirth,
    getString(userData.dateOfBirth) || getString(userData.birthDate)
  );
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.dateOfEnrollmentMonth, enrollmentDateParts.month);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.dateOfEnrollmentDay, enrollmentDateParts.day);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.dateOfEnrollmentYear, enrollmentDateParts.year);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.dateOfExpirationMonth, expirationDateParts.month);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.dateOfExpirationDay, expirationDateParts.day);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.dateOfExpirationYear, expirationDateParts.year);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.witness, normalizedWitness);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.signDateMonth, signDateParts.month);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.signDateDay, signDateParts.day);
  appendMappedField(params, JOTFORM_REGISTER_FIELD_MAP.signDateYear, signDateParts.year);

  return params;
};

const syncRegisterToJotform = async (uid: string) => {
  const [registerSnap, userSnap] = await Promise.all([
    db.doc(`driverregister/${uid}`).get(),
    db.doc(`users/${uid}`).get(),
  ]);

  if (!registerSnap.exists) {
    throw new HttpsError("not-found", "Driver register document not found.");
  }

  const registerData = registerSnap.data() ?? {};
  const userData = userSnap.exists ? userSnap.data() ?? {} : {};
  const params = buildRegisterParams(registerData, userData);

  const apiKey = process.env.JOTFORM_API_KEY;

  if (!apiKey) {
    throw new HttpsError(
      "failed-precondition",
      "JOTFORM_API_KEY secret is not configured."
    );
  }

  const response = await fetch(`${JOTFORM_REGISTER_SUBMIT_URL}?apiKey=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const responseText = await response.text();

  if (!response.ok) {
    await db.doc(`driverregister/${uid}`).set(
      {
        jotformSyncStatus: "failed",
        jotformSyncError: `HTTP ${response.status}`,
        jotformLastTriedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    throw new HttpsError(
      "internal",
      `Jotform submission failed with status ${response.status}.`,
      { responseText }
    );
  }

  await db.doc(`driverregister/${uid}`).set(
    {
      jotformSyncStatus: "submitted",
      jotformSyncError: admin.firestore.FieldValue.delete(),
      jotformSyncedAt: admin.firestore.FieldValue.serverTimestamp(),
      jotformLastTriedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  await db.doc(`users/${uid}`).set(
    {
      jotformSyncStatus: "submitted",
      jotformSyncedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
};

export const submitRegisterToJotform = onCall(
  {
    region: "us-central1",
    secrets: ["JOTFORM_API_KEY"],
  },
  async (request) => {
    if (!request.auth?.uid) {
      throw new HttpsError("unauthenticated", "User not authenticated.");
    }

    const uid = request.auth.uid;
    await syncRegisterToJotform(uid);

    return {
      submitted: true,
      message: "Register saved to Firebase and submitted to Jotform successfully.",
    };
  }
);

export const syncCompletedRegisterToJotform = onDocumentWritten(
  {
    document: "driverregister/{uid}",
    region: "us-central1",
    secrets: ["JOTFORM_API_KEY"],
  },
  async (event) => {
    const afterData = event.data?.after?.data();
    const uid = event.params.uid;

    if (!afterData || afterData.completed !== true) {
      return;
    }

    if (afterData.jotformSyncStatus === "submitted") {
      return;
    }

    try {
      await db.doc(`driverregister/${uid}`).set(
        {
          jotformSyncStatus: "syncing",
          jotformLastTriedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      await syncRegisterToJotform(uid);
    } catch (error) {
      console.error("Background Jotform sync error:", error);
      await db.doc(`driverregister/${uid}`).set(
        {
          jotformSyncStatus: "failed",
          jotformLastTriedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }
  }
);

export const backfillCompletedRegistersToJotform = onCall(
  {
    region: "us-central1",
    secrets: ["JOTFORM_API_KEY"],
  },
  async (request) => {
    if (!request.auth?.uid) {
      throw new HttpsError("unauthenticated", "User not authenticated.");
    }

    const requesterSnap = await db.doc(`users/${request.auth.uid}`).get();
    const requesterRole = getString(requesterSnap.data()?.role);

    if (requesterRole !== "admin") {
      throw new HttpsError("permission-denied", "Only admin can run register backfill.");
    }

    const snapshot = await db
      .collection("driverregister")
      .where("completed", "==", true)
      .get();

    let processed = 0;
    let submitted = 0;
    let skipped = 0;
    const failures: Array<{ uid: string; message: string }> = [];

    for (const document of snapshot.docs) {
      const data = document.data();

      if (data.jotformSyncStatus === "submitted") {
        skipped += 1;
        continue;
      }

      processed += 1;

      try {
        await db.doc(`driverregister/${document.id}`).set(
          {
            jotformSyncStatus: "syncing",
            jotformLastTriedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

        await syncRegisterToJotform(document.id);
        submitted += 1;
      } catch (error: any) {
        failures.push({
          uid: document.id,
          message:
            typeof error?.message === "string"
              ? error.message
              : "Unknown Jotform sync error",
        });
      }
    }

    return {
      processed,
      submitted,
      skipped,
      failed: failures.length,
      failures,
      message: `Backfill complete. Submitted ${submitted}, skipped ${skipped}, failed ${failures.length}.`,
    };
  }
);
