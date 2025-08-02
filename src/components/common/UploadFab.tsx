import { useState } from "react";
import { Fab } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useIsMobile } from "../../hook/common/useIsMobile";
import { UploadContractModal } from "../Modal/UploadContractModal";

const UploadFab = () => {
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isMobile) return null; // 🔹 Solo se muestra en mobile

  return (
    <>
      <Fab
        color="primary"
        aria-label="Subir contrato"
        onClick={() => setIsModalOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24, // 🔹 Separado del borde inferior
          right: 24, // 🔹 Separado del borde derecho
          zIndex: 2500, // 🔹 Por encima de otros elementos
          width: 56, // 🔹 Tamaño fijo estilo FAB nativo
          height: 56,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)", // 🔹 Sombra consistente
        }}
      >
        <UploadFileIcon sx={{ fontSize: 28 }} /> {/* 🔹 Icono uniforme */}
      </Fab>

      <UploadContractModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default UploadFab;
