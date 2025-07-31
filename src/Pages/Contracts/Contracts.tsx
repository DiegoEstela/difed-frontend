import UploadFileIcon from "@mui/icons-material/UploadFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Container from "../../styles/Container";
import { useState } from "react";
import { UploadContractModal } from "../../components/Modal/UploadContractModal";

const Contracts = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Gestión de Contratos
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Seleccioná una acción para continuar:
      </Typography>

      <Box display="flex" gap={4} flexWrap="wrap" justifyContent="center">
        <Paper
          onClick={() => navigate("/ver-contratos")}
          elevation={3}
          sx={{
            width: 200,
            height: 180,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            borderRadius: 4,
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "primary.light",
              color: "#fff",
            },
          }}
        >
          <VisibilityIcon fontSize="large" />
          <Typography variant="subtitle1" fontWeight={600}>
            Ver contratos
          </Typography>
        </Paper>

        <Paper
          onClick={() => setIsModalOpen(true)}
          sx={{
            width: 200,
            height: 180,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            borderRadius: 4,
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "primary.light",
              color: "#fff",
            },
          }}
        >
          <UploadFileIcon fontSize="large" />
          <Typography variant="subtitle1" fontWeight={600}>
            Cargar contrato
          </Typography>
        </Paper>
      </Box>

      {/* MODAL */}
      <UploadContractModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default Contracts;
