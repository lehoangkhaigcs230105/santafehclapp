import { Form, urlConfig } from "../../../../configs/config";
import { HttpGetDataWithoutToken } from "../../services/HttpNoToken";
import { RandomDTO } from "../DTO/formDTOs/RandomDTO";

export const RandomController = {
create: async (formData: FormData) => {
    const url = urlConfig.serverTest + Form.submit;
    console.log(url);
    
    try {
      const response = await fetch(url, {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  },
    test : async ( ): Promise<any> => {


        const url = urlConfig.serverTest + Form.test;
        try {
            const response = await HttpGetDataWithoutToken(url);

            if (!response) console.log("Không nhận được phản hồi từ server");

            console.debug("---  Book Data Response: ", response);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Tạo CatholicBook: ", error);
        }
    },
}

// fileUri: lấy từ file picker hoặc camera
const createFormData = (dto: RandomDTO, fileUri: string, fileName: string, fileType = "application/pdf") => {
  const data = new FormData();

  data.append("file", {
    uri: fileUri,
    name: fileName,
    type: fileType,
  } as any);

  data.append("formItem", JSON.stringify(dto)); // Gửi dạng JSON string để backend parse

  return data;
};