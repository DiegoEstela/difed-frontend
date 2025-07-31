import { Snackbar, Alert, type AlertColor } from "@mui/material";

interface ToastProps {
  open: boolean;
  message: string;
  severity?: AlertColor; // 'success' | 'error' | 'info' | 'warning'
  onClose: () => void;
  autoHideDuration?: number;
}

export const Toast = ({
  open,
  message,
  severity = "success",
  onClose,
  autoHideDuration = 4000,
}: ToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
