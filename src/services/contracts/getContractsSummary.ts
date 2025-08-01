import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export interface ContractsSummary {
  pending: number;
  signed: number;
  confirmed: number;
}

export const getContractsSummary = async (): Promise<ContractsSummary> => {
  const snapshot = await getDocs(collection(db, "contracts"));

  let pending = 0;
  let signed = 0;
  let confirmed = 0;

  snapshot.forEach((doc) => {
    const data = doc.data() as { status?: string };
    switch (data.status) {
      case "pendiente":
        pending++;
        break;
      case "firmado":
        signed++;
        break;
      case "confirmado":
        confirmed++;
        break;
      default:
        break;
    }
  });

  return { pending, signed, confirmed };
};
