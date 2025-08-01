import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { signPdfAndUpload } from "../../utils/signPdfAndUpload";

import {
  Container,
  PdfWrapper,
  Footer,
  ModalOverlay,
  ModalContent,
  Canvas,
  ButtonRow,
} from "./Signature.style";
import { useToast } from "../../hook/toast/useToast";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const Signature = () => {
  const { contractId } = useParams();
  const { showToast } = useToast();

  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [numPages, setNumPages] = useState<number>(0);

  const [showModal, setShowModal] = useState(false);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [clarification, setClarification] = useState("");

  const [isSignedModalOpen, setIsSignedModalOpen] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const [loadingSign, setLoadingSign] = useState(false); // 🔹 Estado de carga para botones

  const sigPad = useRef<SignatureCanvas | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Posición fija de la firma
  const initialXPercent = 0.8;
  const initialYPercent = 0.71;
  const clarificationOffset = 0.03;

  // 🔹 Cargar contrato desde Firestore y validar estado
  useEffect(() => {
    const fetchContract = async () => {
      if (!contractId) return;
      const contractRef = doc(db, "contracts", contractId);
      const snapshot = await getDoc(contractRef);

      if (!snapshot.exists()) {
        showToast("Contrato no encontrado", "error", 5000);
        setIsSigned(true);
        setIsSignedModalOpen(true);
        return;
      }

      const data = snapshot.data() as any;
      const url = data.url as string;
      setPdfUrl(url);

      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      setPdfData(buffer);

      if (data.status === "firmado") {
        setIsSigned(true);
        setIsSignedModalOpen(true);
      }
    };

    fetchContract();
  }, [contractId, showToast]);

  // 🔹 Restaurar firma en canvas al abrir modal si ya existe
  useEffect(() => {
    if (showModal && sigPad.current && signaturePreview) {
      sigPad.current.clear();
      sigPad.current.fromDataURL(signaturePreview);
    }
  }, [showModal, signaturePreview]);

  const clearSignature = () => {
    sigPad.current?.clear();
    setSignaturePreview(null);
  };

  const previewSignature = () => {
    if (!sigPad.current) return;

    if (sigPad.current.isEmpty() && !signaturePreview) {
      showToast("Debe firmar antes de previsualizar", "error", 4000);
      return;
    }

    const signatureData = sigPad.current.isEmpty()
      ? signaturePreview
      : sigPad.current.toDataURL("image/png");

    setSignaturePreview(signatureData || null);
    setShowModal(false);
  };

  const handleSign = async () => {
    if (!pdfData || !signaturePreview) {
      showToast("Debe firmar antes de enviar", "error", 4000);
      return;
    }

    if (!clarification.trim()) {
      showToast("Debe ingresar su aclaración", "error", 4000);
      return;
    }

    try {
      setLoadingSign(true);
      await signPdfAndUpload({
        pdfData,
        contractId: contractId!,
        signatureDataUrl: signaturePreview,
        clarification,
        coordsPercent: {
          x: initialXPercent * 100,
          y: initialYPercent * 100,
          widthPercent: 25,
          heightPercent: 6,
        },
      });

      showToast("✅ Contrato firmado y enviado correctamente", "success", 5000);
      setShowModal(false);

      // 🔹 Mostrar modal de documento firmado
      setIsSigned(true);
      setIsSignedModalOpen(true);
    } catch (error) {
      console.error(error);
      showToast("❌ Hubo un error al firmar el contrato", "error", 5000);
    } finally {
      setLoadingSign(false);
    }
  };

  const handleCloseSignedModal = () => {
    setIsSignedModalOpen(false);
    window.close(); // Cierra la ventana
  };

  if (isSigned) {
    return (
      <Dialog open={isSignedModalOpen} onClose={handleCloseSignedModal}>
        <DialogTitle>Documento firmado</DialogTitle>
        <DialogContent>
          <Typography>
            Este documento ha sido firmado correctamente y no se podrá volver a
            ingresar. Si necesita asistencia, comuníquese con el equipo de
            Difed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseSignedModal}
            variant="contained"
            color="primary"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Container>
      <PdfWrapper>
        {pdfUrl && (
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages), (_el, index) => (
              <div
                key={`page_${index + 1}`}
                ref={index + 1 === numPages ? pageRef : null}
                style={{ position: "relative" }}
              >
                <Page
                  pageNumber={index + 1}
                  scale={1.1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
                {index + 1 === numPages && signaturePreview && !showModal && (
                  <>
                    {/* Firma */}
                    <img
                      src={signaturePreview}
                      alt="Preview firma"
                      style={{
                        position: "absolute",
                        width: 150,
                        height: 50,
                        left: `${initialXPercent * 100}%`,
                        top: `${initialYPercent * 100}%`,
                        transform: "translate(-50%, -50%)",
                        zIndex: 9999,
                        pointerEvents: "none",
                      }}
                    />
                    {/* Aclaración */}
                    {clarification && (
                      <div
                        style={{
                          position: "absolute",
                          left: `${initialXPercent * 100}%`,
                          top: `${
                            (initialYPercent + clarificationOffset) * 100
                          }%`,
                          transform: "translate(-50%, -50%)",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "black",
                          background: "rgba(255,255,255,0.6)",
                          padding: "1px 4px",
                          borderRadius: "4px",
                          zIndex: 9999,
                        }}
                      >
                        {clarification}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </Document>
        )}
      </PdfWrapper>

      <Footer>
        <button
          onClick={() => setShowModal(true)}
          style={{ marginRight: 20 }}
          disabled={loadingSign}
        >
          {loadingSign
            ? ""
            : signaturePreview
            ? "Volver a editar"
            : "Firmar contrato"}
        </button>
        {signaturePreview && !showModal && (
          <button onClick={handleSign} disabled={loadingSign}>
            {loadingSign ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              "Firmar y Enviar"
            )}
          </button>
        )}
      </Footer>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Firme aquí</h3>
            <Canvas
              ref={(ref) => {
                sigPad.current = ref;
              }}
              penColor="black"
              canvasProps={{
                width: 350,
                height: 150,
                style: {
                  border: "1px solid black",
                  display: "block",
                  margin: "0 auto",
                },
              }}
            />
            <input
              type="text"
              placeholder="Aclaración (Nombre y Apellido)"
              value={clarification}
              onChange={(e) => setClarification(e.target.value)}
            />
            <ButtonRow>
              <button onClick={clearSignature} disabled={loadingSign}>
                Borrar
              </button>
              <button onClick={previewSignature} disabled={loadingSign}>
                Previsualizar
              </button>
              <button onClick={handleSign} disabled={loadingSign}>
                {loadingSign ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  "Firmar y Enviar"
                )}
              </button>
              <button
                onClick={() => setShowModal(false)}
                disabled={loadingSign}
              >
                Cancelar
              </button>
            </ButtonRow>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Signature;
