import { axiosInstance } from "../axiosInstance";

export interface SendSignedContractResponse {
  signedUrl: string;
  signed: boolean;
  signedAt: string;
}

export const sendSignedContract = async (
  contractId: string,
  signedPdf: Blob
): Promise<SendSignedContractResponse> => {
  try {
    const formData = new FormData();
    formData.append("contractId", contractId);
    formData.append("signedPdf", signedPdf);

    const response = await axiosInstance.post<SendSignedContractResponse>(
      "/contracts/sign",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error al enviar contrato firmado:", error);
    throw new Error("No se pudo enviar el contrato firmado");
  }
};
