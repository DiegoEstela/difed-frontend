import {
  collection,
  onSnapshot,
  query,
  where,
  type FirestoreDataConverter,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";

export interface Contract {
  id: string;
  nombre: string;
  apellido: string;
  signedAt: string;
  dni: number;
}

const contractConverter: FirestoreDataConverter<Contract> = {
  toFirestore(contract: Contract): DocumentData {
    return contract;
  },
  fromFirestore(snapshot): Contract {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      nombre: data.nombre ?? "",
      apellido: data.apellido ?? "",
      signedAt: data.signedAt?.toDate() ?? null,
      dni: data.dni ?? "",
    };
  },
};

export const listenSignedContracts = (
  callback: (contracts: Contract[]) => void
) => {
  const contractsRef = collection(db, "contracts").withConverter(
    contractConverter
  );

  const q = query(contractsRef, where("status", "==", "firmado"));

  return onSnapshot(q, (snapshot) => {
    const signedContracts = snapshot.docs.map((doc) => doc.data());
    callback(signedContracts);
  });
};
