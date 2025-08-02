import { useState } from "react";
import { Fab } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useIsMobile } from "../../hook/common/useIsMobile";
import { UploadContractModal } from "../Modal/UploadContractModal";

const UploadFab = () => {
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isMobile) return null; // Solo visible en mobile

  return (
    <>
      <Fab
        color="primary"
        aria-label="Subir contrato"
        onClick={() => setIsModalOpen(true)}
        style={{
          position: "fixed",
          bottom: "80px", // justo arriba del footer / botón firmar
          right: "20px",
          zIndex: 2000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <UploadFileIcon />
      </Fab>

      <UploadContractModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default UploadFab;
