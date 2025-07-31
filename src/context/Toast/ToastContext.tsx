import type { AlertColor } from "@mui/material";
import { createContext } from "react";

export interface ToastContextType {
  showToast: (
    message: string,
    severity?: AlertColor,
    duration?: number
  ) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);
