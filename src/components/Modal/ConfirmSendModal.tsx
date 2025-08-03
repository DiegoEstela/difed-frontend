import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Slide,
} from "@mui/material";
import { forwardRef } from "react";
import type { TransitionProps } from "@mui/material/transitions";

interface ConfirmSendModalProps {
  open: boolean;
  isMobile: boolean;
  sending: boolean;
  email: string;
  recipientName: string;
  onEmailChange: (value: string) => void;
  onRecipientNameChange: (value: string) => void;
  onClose: () => void;
  onSend: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmSendModal = ({
  open,
  isMobile,
  sending,
  email,
  recipientName,
  onEmailChange,
  onRecipientNameChange,
  onClose,
  onSend,
}: ConfirmSendModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={isMobile ? Transition : undefined}
      fullWidth
      maxWidth={isMobile ? "xs" : "sm"}
      PaperProps={{
        style: isMobile
          ? {
              borderRadius: 16,
              padding: 16,
              backgroundColor: "#fff",
            }
          : {
              padding: 24,
              borderRadius: 16,
            },
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DialogTitle
        style={{
          fontSize: isMobile ? 18 : 20,
          fontWeight: 600,
          textAlign: "center",
          paddingBottom: 8,
        }}
      >
        Confirmar y enviar contrato
      </DialogTitle>

      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 12,
          paddingTop: 0,
        }}
      >
        <p style={{ fontSize: isMobile ? 14 : 16 }}>
          Complete los datos para enviar el contrato firmado:
        </p>

        <TextField
          autoFocus
          margin="dense"
          label="Nombre del destinatario"
          type="text"
          fullWidth
          value={recipientName}
          onChange={(e) => onRecipientNameChange(e.target.value)}
          InputProps={{
            style: { fontSize: isMobile ? 14 : 16 },
          }}
        />

        <TextField
          margin="dense"
          label="Correo electrónico"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          InputProps={{
            style: { fontSize: isMobile ? 14 : 16 },
          }}
        />
      </DialogContent>

      <DialogActions
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 12,
          justifyContent: "center",
          padding: isMobile ? "0 0 8px 0" : "16px",
        }}
      >
        <Button
          onClick={onClose}
          color="inherit"
          style={{
            flex: isMobile ? 1 : undefined,
            fontSize: isMobile ? 14 : 12,
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onSend}
          color="success"
          variant="contained"
          disabled={sending || !email || !recipientName}
          style={{
            flex: isMobile ? 1 : undefined,
            fontSize: isMobile ? 14 : 12,
          }}
        >
          {sending ? "Enviando..." : "Aceptar y Enviar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmSendModal;
