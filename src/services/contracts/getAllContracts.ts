import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getAllContracts = async () => {
  const snapshot = await getDocs(collection(db, "contracts"));
  const contracts: any[] = [];
  snapshot.forEach((doc) => {
    contracts.push({ id: doc.id, ...doc.data() });
  });
  return contracts;
};
