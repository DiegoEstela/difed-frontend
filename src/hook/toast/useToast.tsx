import { useContext } from "react";
import {
  ToastContext,
  type ToastContextType,
} from "../../context/Toast/ToastContext";

export const useToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast debe usarse dentro de <ToastProvider>");
  }
  return ctx;
};
