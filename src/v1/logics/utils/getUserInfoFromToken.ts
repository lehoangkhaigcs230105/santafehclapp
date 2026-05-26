import * as SecureStore from "expo-secure-store";
import { decodeJWT } from "./decodeJWTToken";

export async function getUserInfoFromToken() {
  const authObject = await SecureStore.getItemAsync("authObject");
  if (!authObject) return null;
  try {
    const { accessToken } = JSON.parse(authObject);
    const decoded = decodeJWT(accessToken);
    return {
      userId: decoded?.userId || decoded?.id,
      role: decoded?.role ?? decoded?.userRole ?? decoded?.roles,
      // Có thể lấy thêm các trường khác nếu cần
    };
  } catch (error) {
    return null;
  }
}