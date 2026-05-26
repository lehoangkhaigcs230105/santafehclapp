import type { AlertButton } from "@/v1/logics/contexts/AlertContext";

let showAlertFunc: (title: string, message: string, buttons?: AlertButton[]) => void = () => {};

export const setShowAlert = (fn: typeof showAlertFunc) => {
  showAlertFunc = fn;
};

export const showAlert = (
  title: string,
  message: string,
  buttons?: AlertButton[]
) => {
  showAlertFunc(title, message, buttons);
};