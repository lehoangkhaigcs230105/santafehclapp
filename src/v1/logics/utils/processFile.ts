import * as SecureStore from "expo-secure-store";

const AUTH_STORAGE_KEY = "authObject";

type AuthFileData = {
  accessToken?: string;
  [key: string]: unknown;
};

export const readFromFile = async (): Promise<AuthFileData> => {
  const value = await SecureStore.getItemAsync(AUTH_STORAGE_KEY);

  if (!value) return {};

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

export const writeToFile = async (data: AuthFileData): Promise<void> => {
  await SecureStore.setItemAsync(AUTH_STORAGE_KEY, JSON.stringify(data));
};

export const deleteFile = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(AUTH_STORAGE_KEY);
};
