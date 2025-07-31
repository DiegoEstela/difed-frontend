// hook/useUploadContract.ts
import { useMutation } from "@tanstack/react-query";
import {
  uploadContract,
  type UploadContractResponse,
} from "../../services/contracts/uploadContract";

export const useUploadContract = () => {
  const mutation = useMutation<UploadContractResponse, Error, FormData>({
    mutationFn: uploadContract,
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    status: mutation.status, // ✅ agregá esta línea
    error: mutation.error,
    reset: mutation.reset,
  };
};
