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
import { PDFDocument } from "pdf-lib";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const Signature = () => {
  const { contractId } = useParams();
  const { showToast } = useToast();

  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [numPages, setNumPages] = useState<number>(0);

  const [showModal, setShowModal] = useState(false);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [signatureVector, setSignatureVector] = useState<any[] | null>(null);
  const [clarification, setClarification] = useState("");

  const [isSignedModalOpen, setIsSignedModalOpen] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [loadingSign, setLoadingSign] = useState(false);

  const sigPad = useRef<SignatureCanvas | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const initialXPercent = 0.78;
  const initialYPercent = 0.71;
  const widthPercent = 0.27;
  const heightPercent = 0.06;
  const offsetXPercent = 0.02;
  const offsetYPercent = -0.01;
  const clarificationOffset = 0.01;

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

  useEffect(() => {
    if (
      showModal &&
      sigPad.current &&
      signatureVector &&
      signatureVector.length > 0
    ) {
      setTimeout(() => {
        sigPad.current?.fromData(signatureVector);
      }, 50);
    }
  }, [showModal, signatureVector]);

  const clearSignature = () => {
    sigPad.current?.clear();
    setSignaturePreview(null);
    setSignatureVector(null);
  };

  const previewSignature = () => {
    if (!sigPad.current) return;
    if (sigPad.current.isEmpty() && !signaturePreview) {
      showToast("Debe firmar antes de previsualizar", "error", 4000);
      return;
    }

    const vectorData = sigPad.current.toData(); // 🔹 Guardar vector
    const signatureData = sigPad.current.isEmpty()
      ? signaturePreview
      : sigPad.current.toDataURL("image/png");

    setSignatureVector(vectorData);
    setSignaturePreview(signatureData || null);
    setShowModal(false);
  };

  const getSignatureCoordsInPdf = async (
    pageWidthPx: number,
    pageHeightPx: number
  ) => {
    if (!pdfData) return null;
    const pdfDoc = await PDFDocument.load(pdfData);
    const lastPage = pdfDoc.getPage(pdfDoc.getPageCount() - 1);
    const { width: pdfWidth, height: pdfHeight } = lastPage.getSize();

    const sigWidthPx = pageWidthPx * widthPercent;
    const sigHeightPx = pageHeightPx * heightPercent;

    const posXPx =
      pageWidthPx * (initialXPercent + offsetXPercent) - sigWidthPx / 2;
    const posYPx =
      pageHeightPx * (initialYPercent + offsetYPercent) - sigHeightPx / 2;

    const signatureYOffsetPx = sigHeightPx * 0.02;

    return {
      x: (posXPx / pageWidthPx) * pdfWidth,
      y:
        pdfHeight -
        ((posYPx + sigHeightPx + signatureYOffsetPx) / pageHeightPx) *
          pdfHeight,
      width: (sigWidthPx / pageWidthPx) * pdfWidth,
      height: (sigHeightPx / pageHeightPx) * pdfHeight,
    };
  };

  const handleSign = async () => {
    if (!pdfData || !pageRef.current) {
      showToast("Error al cargar el contrato", "error", 4000);
      return;
    }

    let finalSignature = signaturePreview;
    if (sigPad.current && !sigPad.current.isEmpty()) {
      finalSignature = sigPad.current.toDataURL("image/png");
      setSignaturePreview(finalSignature);
      setSignatureVector(sigPad.current.toData());
    }

    if (!finalSignature) {
      showToast("Debe firmar antes de enviar", "error", 4000);
      return;
    }

    if (!clarification.trim()) {
      showToast("Debe ingresar su aclaración", "error", 4000);
      return;
    }

    try {
      setLoadingSign(true);

      const pageRect = pageRef.current.getBoundingClientRect();
      const coords = await getSignatureCoordsInPdf(
        pageRect.width,
        pageRect.height
      );

      if (!coords) return;

      await signPdfAndUpload({
        pdfData,
        contractId: contractId!,
        signatureDataUrl: finalSignature!,
        clarification,
        coords,
      });

      showToast("✅ Contrato firmado y enviado correctamente", "success", 5000);
      setShowModal(false);
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
    window.close();
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
                  scale={1.0}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
                {index + 1 === numPages && signaturePreview && !showModal && (
                  <>
                    <img
                      src={signaturePreview}
                      alt="Preview firma"
                      style={{
                        position: "absolute",
                        width: `${widthPercent * 100}%`,
                        left: `${(initialXPercent + offsetXPercent) * 100}%`,
                        top: `${(initialYPercent + offsetYPercent) * 100}%`,
                        transform: "translate(-50%, -50%)",
                        zIndex: 9999,
                        pointerEvents: "none",
                      }}
                    />
                    {clarification && (
                      <div
                        style={{
                          position: "absolute",
                          left: `${(initialXPercent + offsetXPercent) * 100}%`,
                          top: `${
                            (initialYPercent +
                              offsetYPercent +
                              heightPercent / 2 +
                              clarificationOffset) *
                            100
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
        {signaturePreview && !showModal && !loadingSign && (
          <button
            onClick={() => setShowModal(true)}
            style={{ marginRight: 20 }}
          >
            Editar firma
          </button>
        )}
        {!signaturePreview && (
          <button
            onClick={() => setShowModal(true)}
            style={{ marginRight: 20 }}
          >
            Firmar contrato
          </button>
        )}
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
                height: 250,
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
