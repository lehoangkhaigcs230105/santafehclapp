import { TextNote } from "@/configs/constants/statusCode";
import { ResponeStatusEnum } from "@/configs/enums/responseEnum";
import { checkNetwork } from "@/v1/logics/hooks/NetworkManager";
import { deleteFile, readFromFile } from "@/v1/logics/utils/processFile";
import { router } from "expo-router";
import { Alert } from "react-native";

const StatusCodeEnum = ResponeStatusEnum;

export const HttpGetData = async (url: string) => {
  const fileData = await readFromFile();
  const accessToken = fileData.accessToken;

  return new Promise((resolve, reject) => {
    if (!checkNetwork()) {
      reject({ code: StatusCodeEnum.noNetwork, message: TextNote.noNetWork });
      return;
    }

    if (!accessToken) {
      reject({ code: ResponeStatusEnum.unAuthenticated, message: TextNote.noToken });
      return;
    }

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        await processRequestResponse(response, resolve, reject);
      })
      .catch((error) => {
        console.log("HttpGetData Request Error:", error);
        reject({ code: StatusCodeEnum.timeOut, message: TextNote.timeOut });
      });
  });
};

interface PostParams {
  [key: string]: any;
}

export const HttpPostData = async (url: string, data: PostParams) => {
  const fileData = await readFromFile();
  const accessToken = fileData.accessToken;

  return new Promise((resolve, reject) => {
    if (!checkNetwork()) {
      reject({ code: StatusCodeEnum.noNetwork, message: TextNote.noNetWork });
      return;
    }

    if (!accessToken) {
      reject({ code: ResponeStatusEnum.unAuthenticated, message: TextNote.unauthenticated });
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const jsonData = JSON.stringify(data);

    fetch(url, {
      method: "POST",
      headers: myHeaders,
      body: jsonData,
    })
      .then(async (response) => {
        await processRequestResponse(response, resolve, reject);
      })
      .catch((error) => {
        console.log("Post Request Error:", error);
        reject(error);
      });
  });
};

const processRequestResponse = async (
  response: Response,
  resolve: (value: any) => void,
  reject: (reason: any) => void
): Promise<void> => {
  console.log("📥 ProcessResponse Begin");
  try {
    const responseText = await response.text();
    if (!responseText) {
      console.warn("⚠️ Empty response body");
      await handleUnauthorized();
      reject({ code: response.status, message: "Empty response body" });
      return;
    }

    if (response.ok) {
      const jsonResponse = JSON.parse(responseText);
      console.log("✅ ProcessResponse OK");
      resolve(jsonResponse);
      return;
    }

    switch (response.status) {
      case ResponeStatusEnum.badRequest:
        reject({ code: ResponeStatusEnum.badRequest, message: "BadRequest" });
        break;
      case ResponeStatusEnum.unAuthenticated:
        await handleUnauthorized();
        reject({ code: ResponeStatusEnum.unAuthenticated, message: "UnAuthenticated" });
        break;
      case ResponeStatusEnum.expired:
        await handleUnauthorized();
        reject({ code: ResponeStatusEnum.expired, message: "ExpiredAccount" });
        break;
      case ResponeStatusEnum.timeOut:
        reject({ code: ResponeStatusEnum.timeOut, message: "RequestTimeOut" });
        break;
      default:
        reject({ code: response.status, message: responseText });
        break;
    }
  } catch (error) {
    console.log("❌ Lỗi khi xử lý phản hồi từ server:", error);
    reject({ message: "Lỗi xử lý phản hồi", rawError: error });
  }
};

const handleUnauthorized = async () => {
  Alert.alert("Phiên đăng nhập hết hạn", "Vui lòng đăng nhập lại.");
  await deleteFile();
  router.replace("/(auths)");
};
