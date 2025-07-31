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

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const Signature = () => {
  const { contractId } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [numPages, setNumPages] = useState<number>(0);

  const [showModal, setShowModal] = useState(false);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [clarification, setClarification] = useState("");

  const sigPad = useRef<SignatureCanvas | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Posición fija de la firma
  const initialXPercent = 0.8;
  const initialYPercent = 0.71;

  // Offset para la aclaración
  const clarificationOffset = 0.03;

  // 🔹 Cargar contrato desde Firebase
  useEffect(() => {
    const fetchContract = async () => {
      if (!contractId) return;
      const contractRef = doc(db, "contracts", contractId);
      const snapshot = await getDoc(contractRef);

      if (!snapshot.exists()) {
        alert("Contrato no encontrado");
        return;
      }

      const data = snapshot.data();
      const url = data.url as string;
      setPdfUrl(url);

      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      setPdfData(buffer);
    };

    fetchContract();
  }, [contractId]);

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

    // Caso 1: ya hay firma previa aunque el canvas esté vacío
    if (sigPad.current.isEmpty() && signaturePreview) {
      setShowModal(false);
      return;
    }

    // Caso 2: no hay firma previa ni dibujo
    if (sigPad.current.isEmpty()) {
      alert("Debe firmar antes de previsualizar");
      return;
    }

    // Caso 3: nueva firma dibujada
    const signatureData = sigPad.current.toDataURL("image/png");
    setSignaturePreview(signatureData);
    setShowModal(false); // Cerramos modal para ver PDF completo
  };

  const handleSign = async () => {
    if (!pdfData || !signaturePreview) return alert("Falta firma o PDF");
    if (!clarification.trim()) return alert("Debe ingresar su aclaración");

    // Guardamos usando la posición fija
    const posXPercent = initialXPercent * 100;
    const posYPercent = initialYPercent * 100;

    try {
      await signPdfAndUpload({
        pdfData,
        contractId: contractId!,
        signatureDataUrl: signaturePreview,
        clarification,
        coordsPercent: {
          x: posXPercent,
          y: posYPercent,
          widthPercent: 25,
          heightPercent: 6,
        },
      });

      alert("✅ Contrato firmado y enviado correctamente!");
      setShowModal(false);
      // 👇 Mantenemos la firma para poder editar aclaración después si se desea
    } catch (error) {
      console.error(error);
      alert("❌ Hubo un error al firmar el contrato");
    }
  };

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
                          background: "rgba(255,255,255,0.6)", // opcional para contraste
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
        <button onClick={() => setShowModal(true)} style={{ marginRight: 20 }}>
          {signaturePreview ? "Volver a editar" : "Firmar contrato"}
        </button>
        {signaturePreview && !showModal && (
          <button onClick={handleSign}>Firmar y Enviar</button>
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
              <button onClick={clearSignature}>Borrar</button>
              <button onClick={previewSignature}>Previsualizar</button>
              <button onClick={handleSign}>Firmar y Enviar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </ButtonRow>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Signature;
