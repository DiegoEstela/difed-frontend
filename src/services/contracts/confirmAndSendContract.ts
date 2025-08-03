import axios from "axios";

export interface ConfirmAndSendPayload {
  contractId: string;
  email: string;
  recipientName: string;
}

export const confirmAndSendContract = async (
  payload: ConfirmAndSendPayload
) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/contracts/confirm-and-send`,
    payload
  );
  return data;
};
