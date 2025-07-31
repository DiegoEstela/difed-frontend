import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useUploadContract } from "../../hook/contracts/useUploadContract";
import { useEffect } from "react";
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

  const onSubmit = (data: FormInputs) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("dni", data.dni);
    formData.append("nombre", data.firstName);
    formData.append("apellido", data.lastName);
    formData.append("email", data.email);
    mutate(formData, {
      onSuccess: () => {
        reset();
        onClose();
        showToast("Contrato subido correctamente", "success", 8000);
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

  return (
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
          {isPending ? <CircularProgress size={20} color="inherit" /> : "Subir"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
