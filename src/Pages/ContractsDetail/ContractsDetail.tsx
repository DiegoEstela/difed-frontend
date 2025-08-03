import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Button, CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import { db } from "../../services/firebase";
import { useIsMobile } from "../../hook/common/useIsMobile";

import { Wrapper, Iframe } from "./ContractDetail.style";

import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";
import { confirmAndSendContract } from "../../services/contracts/confirmAndSendContract";
import { useToast } from "../../hook/toast/useToast";
import ConfirmSendModal from "../../components/Modal/ConfirmSendModal";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface Contract {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  signedAt?: any;
  status: string;
  url: string;
}

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { showToast } = useToast();

  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState<number>(0);

  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");

  const { mutate: sendContract, isPending } = useMutation({
    mutationFn: confirmAndSendContract,
    onSuccess: () => {
      showToast("Contrato enviado correctamente", "success", 3000);
      handleCloseModal();
      setTimeout(() => navigate("/"), 1500);
    },
    onError: () => {
      showToast("Error al enviar el contrato", "error", 3000);
    },
  });

  useEffect(() => {
    if (!id) return;

    const fetchContract = async () => {
      const docRef = doc(db, "contracts", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as Omit<Contract, "id">;
        setContract({ ...data, id: snap.id });
      }
      setLoading(false);
    };

    fetchContract();
  }, [id]);

  const handleDownload = () => {
    if (!contract?.url) return;
    const link = document.createElement("a");
    link.href = contract.url;
    link.download = `Contrato-${contract.nombre}-${contract.apellido}.pdf`;
    link.target = "_blank";
    link.click();
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setEmail("");
    setRecipientName("");
    setOpenModal(false);
  };

  const handleSendEmail = () => {
    if (!id || !email || !recipientName) return;
    sendContract({
      contractId: id,
      email,
      recipientName,
    });
  };

  if (loading) return <CircularProgress style={{ margin: 40 }} />;

  if (!contract) return <p style={{ padding: 20 }}>Contrato no encontrado</p>;

  return (
    <Wrapper isMobile={isMobile}>
      {/* 🔹 Desktop -> Iframe / Mobile -> React-PDF */}
      {!isMobile ? (
        <Iframe
          isMobile={isMobile}
          src={contract.url}
          title="Vista previa del contrato"
        />
      ) : (
        <div
          style={{
            width: "100%",
            maxHeight: "65vh",
            overflowX: "auto",
            overflowY: "auto",
            background: "#f5f7fa",
            borderRadius: 12,
            padding: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Document
            file={contract.url}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={isMobile ? 1.3 : 1.0}
              />
            ))}
          </Document>
        </div>
      )}

      {/* 🔹 Botones */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 12,
          marginTop: isMobile ? 16 : 24,
          width: isMobile ? "90%" : "auto",
          justifyContent: "center",
        }}
      >
        {contract.status === "firmado" && (
          <Button
            variant="contained"
            color="success"
            style={{
              flex: isMobile ? 1 : undefined,
              fontSize: isMobile ? 14 : 12,
              padding: isMobile ? "12px 0" : "6px 18px",
              minWidth: isMobile ? "auto" : 160,
            }}
            onClick={handleOpenModal}
          >
            Confirmar y Enviar
          </Button>
        )}

        <Button
          variant="outlined"
          color="primary"
          style={{
            flex: isMobile ? 1 : undefined,
            fontSize: isMobile ? 14 : 12,
            padding: isMobile ? "12px 0" : "6px 18px",
            minWidth: isMobile ? "auto" : 160,
          }}
          onClick={handleDownload}
        >
          Descargar contrato
        </Button>
      </div>

      <ConfirmSendModal
        open={openModal}
        isMobile={isMobile}
        sending={isPending}
        email={email}
        recipientName={recipientName}
        onEmailChange={setEmail}
        onRecipientNameChange={setRecipientName}
        onClose={handleCloseModal}
        onSend={handleSendEmail}
      />
    </Wrapper>
  );
};

export default ContractDetail;
