import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormInputs>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormInputs) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/"); // Redirige al home tras login
    } catch (err) {
      console.error("Error al iniciar sesión", err);
      setError("Correo o contraseña inválidos");
    }
  };

  return (
    <Box
      bgcolor="#fff"
      p={4}
      borderRadius={2}
      boxShadow={3}
      width="100%"
      maxWidth={400}
    >
      <Typography variant="h6" mb={2} textAlign="center">
        Iniciar Sesión
      </Typography>
      {error && (
        <Typography color="error" mb={2} textAlign="center">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Correo"
          type="email"
          fullWidth
          margin="dense"
          {...register("email", { required: true })}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="dense"
          {...register("password", { required: true })}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Entrar
        </Button>
      </form>
    </Box>
  );
}
