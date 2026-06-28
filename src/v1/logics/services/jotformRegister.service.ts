import { httpsCallable } from "firebase/functions";

import { firebaseFunctions } from "../../../../firebase/firebaseConfig";

type JotformRegisterSubmissionResult = {
  submitted: boolean;
  skipped: boolean;
  message: string;
};

export const submitDriverRegisterToJotform = async (
  uid: string
): Promise<JotformRegisterSubmissionResult> => {
  const submitCallable = httpsCallable<{ uid?: string }, { submitted?: boolean; message?: string }>(
    firebaseFunctions,
    "submitRegisterToJotform"
  );

  try {
    const result = await submitCallable({ uid });
    return {
      submitted: !!result.data?.submitted,
      skipped: false,
      message:
        result.data?.message ||
        "Register saved to Firebase and submitted to Jotform successfully.",
    };
  } catch (error: any) {
    const errorMessage =
      typeof error?.message === "string" && error.message
        ? error.message
        : "Register saved to Firebase, but the Jotform backend is not available yet.";

    return {
      submitted: false,
      skipped: false,
      message: errorMessage,
    };
  }
};
