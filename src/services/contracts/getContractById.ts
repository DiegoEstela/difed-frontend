// src/services/contracts/getContractById.ts
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export interface ContractData {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  status: string;
  signedAt?: string;
  url: string;
}

export const getContractById = async (
  id: string
): Promise<ContractData | null> => {
  const ref = doc(db, "contracts", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as ContractData;
};
