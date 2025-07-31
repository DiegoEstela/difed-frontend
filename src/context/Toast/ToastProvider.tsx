import { useState, useCallback, useMemo, type ReactNode } from "react";
import { Snackbar, Alert, type AlertColor } from "@mui/material";
import { ToastContext } from "./ToastContext";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [duration, setDuration] = useState(6000);

  const showToast = useCallback(
    (msg: string, sev: AlertColor = "success", dur = 6000) => {
      setMessage(msg);
      setSeverity(sev);
      setDuration(dur);
      setOpen(true);
    },
    []
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
