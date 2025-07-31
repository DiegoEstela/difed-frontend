import { PDFDocument, rgb } from "pdf-lib";
import { sendSignedContract } from "../services/contracts/sendSignedContract";

interface SignPdfParams {
  pdfData: ArrayBuffer;
  contractId: string;
  signatureDataUrl: string;
  clarification: string;
  coordsPercent?: {
    x: number;
    y: number;
    widthPercent: number;
    heightPercent: number;
  };
}

export const signPdfAndUpload = async ({
  pdfData,
  contractId,
  signatureDataUrl,
  clarification,
  coordsPercent,
}: SignPdfParams) => {
  // 1️⃣ Cargar PDF en memoria
  const pdfDoc = await PDFDocument.load(pdfData);
  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1];

  // 🔹 Tamaño real de la página
  const { width, height } = lastPage.getSize();

  // 🔹 Calcular posición y tamaño de la firma
  const signatureWidth = coordsPercent
    ? (width * coordsPercent.widthPercent) / 100
    : width * 0.25;

  const signatureHeight = coordsPercent
    ? (height * coordsPercent.heightPercent) / 100
    : height * 0.06;

  const posX = coordsPercent ? (width * coordsPercent.x) / 100 : width * 0.64;
  const posY = coordsPercent ? (height * coordsPercent.y) / 100 : height * 0.15;

  // 2️⃣ Insertar firma
  const pngImage = await pdfDoc.embedPng(signatureDataUrl);
  lastPage.drawImage(pngImage, {
    x: posX,
    y: posY,
    width: signatureWidth,
    height: signatureHeight,
  });

  // 3️⃣ Insertar aclaración debajo de la firma
  if (clarification) {
    lastPage.drawText(clarification, {
      x: posX,
      y: posY - 15,
      size: 10,
      color: rgb(0, 0, 0),
    });
  }

  // 4️⃣ Guardar PDF firmado en memoria
  const signedPdfBytes = await pdfDoc.save();
  const signedPdfBlob = new Blob([signedPdfBytes], { type: "application/pdf" });

  // 5️⃣ Enviar PDF firmado al backend
  return await sendSignedContract(contractId, signedPdfBlob);
};
