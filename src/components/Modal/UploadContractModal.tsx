import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useForm } from "react-hook-form";
import { useUploadContract } from "../../hook/contracts/useUploadContract";
import { useEffect, useState } from "react";
import { useToast } from "../../hook/toast/useToast";

interface FormInputs {
  file: FileList;
  dni: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export const UploadContractModal = ({ open, onClose }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const { mutate, status, reset: resetMutation } = useUploadContract();
  const { showToast } = useToast();

  const isPending = status === "pending";

  // Estado para el modal de link
  const [successLink, setSuccessLink] = useState<string | null>(null);

  const onSubmit = (data: FormInputs) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("dni", data.dni);
    formData.append("nombre", data.firstName);
    formData.append("apellido", data.lastName);
    formData.append("email", data.email);

    mutate(formData, {
      onSuccess: (res: any) => {
        reset();
        onClose();
        showToast("Contrato subido correctamente", "success", 8000);

        // Generar link
        const link = `https://difed-contratos.web.app/signature/${res.id}`;
        setSuccessLink(link);
      },
      onError: (err) => {
        console.error("Error al subir contrato", err);
        showToast("Hubo un error al subir el contrato", "error", 8000);
      },
    });
  };

  useEffect(() => {
    if (!open) {
      reset();
      resetMutation();
    }
  }, [open, reset, resetMutation]);

  const handleCopyLink = () => {
    if (successLink) {
      navigator.clipboard.writeText(successLink);
      showToast("Link copiado al portapapeles", "info", 3000);
    }
  };

  return (
    <>
      {/* Modal de carga */}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Subir Contrato</DialogTitle>
        <DialogContent>
          <form id="upload-contract-form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="DNI"
              fullWidth
              margin="dense"
              {...register("dni", { required: true })}
            />
            <TextField
              label="Nombre"
              fullWidth
              margin="dense"
              {...register("firstName", { required: true })}
            />
            <TextField
              label="Apellido"
              fullWidth
              margin="dense"
              {...register("lastName", { required: true })}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="dense"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                  message: "Email inválido",
                },
              })}
            />

            <Box mt={2}>
              <label>
                <input
                  type="file"
                  accept="application/pdf"
                  {...register("file", { required: true })}
                />
              </label>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button
            type="submit"
            form="upload-contract-form"
            disabled={isPending}
            variant="contained"
          >
            {isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Subir"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de link generado */}
      <Dialog
        open={!!successLink}
        onClose={() => setSuccessLink(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Contrato Subido</DialogTitle>
        <DialogContent>
          <Typography mb={2}>
            Comparte este link con el cliente para que firme el contrato:
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              p: 1,
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#f9f9f9",
            }}
          >
            <Typography
              variant="body2"
              sx={{ wordBreak: "break-all", flex: 1, mr: 1 }}
            >
              {successLink}
            </Typography>
            <IconButton onClick={handleCopyLink}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessLink(null)} variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
