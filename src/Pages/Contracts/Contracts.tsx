import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/material";

import Container from "../../styles/Container";
import { UploadContractModal } from "../../components/Modal/UploadContractModal";
import { useIsMobile } from "../../hook/common/useIsMobile";

import { CardsWrapper, ActionCard, IconWrapper } from "./Contracts.style";

const Contracts = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container isMobile={isMobile}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        fontWeight={700}
        mb={2}
        textAlign="center"
        width="100%"
      >
        Gestión de Contratos
      </Typography>

      <CardsWrapper isMobile={isMobile}>
        <ActionCard
          isMobile={isMobile}
          onClick={() => navigate("/ver-contratos")}
        >
          <IconWrapper>
            <VisibilityIcon fontSize={isMobile ? "medium" : "large"} />
          </IconWrapper>
          <Typography variant="subtitle1" fontWeight={600}>
            Ver contratos
          </Typography>
        </ActionCard>

        <ActionCard isMobile={isMobile} onClick={() => setIsModalOpen(true)}>
          <IconWrapper>
            <UploadFileIcon fontSize={isMobile ? "medium" : "large"} />
          </IconWrapper>
          <Typography variant="subtitle1" fontWeight={600}>
            Cargar contrato
          </Typography>
        </ActionCard>
      </CardsWrapper>

      {/* MODAL */}
      <UploadContractModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default Contracts;
