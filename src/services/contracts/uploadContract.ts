import { axiosInstance } from "../axiosInstance";

export interface UploadContractResponse {
  contractId: string;
  downloadUrl: string;
}

export const uploadContract = async (
  formData: FormData
): Promise<UploadContractResponse> => {
  try {
    console.log(formData);
    const response = await axiosInstance.post<UploadContractResponse>(
      "/contracts/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error al subir el contrato:", error);
    throw new Error("No se pudo subir el contrato");
  }
};
