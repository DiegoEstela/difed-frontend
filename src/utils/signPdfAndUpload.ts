import { PDFDocument, rgb } from "pdf-lib";
import { sendSignedContract } from "../services/contracts/sendSignedContract";

interface SignPdfParams {
  pdfData: ArrayBuffer;
  contractId: string;
  signatureDataUrl: string;
  clarification: string;
  coords: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const signPdfAndUpload = async ({
  pdfData,
  contractId,
  signatureDataUrl,
  clarification,
  coords,
}: SignPdfParams) => {
  const pdfDoc = await PDFDocument.load(pdfData);
  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1];

  const pngImage = await pdfDoc.embedPng(signatureDataUrl);

  lastPage.drawImage(pngImage, {
    x: coords.x,
    y: coords.y,
    width: coords.width,
    height: coords.height,
  });

  if (clarification) {
    const fontSize = 10;
    const textWidth = clarification.length * fontSize * 0.55;
    const centerX = coords.x + coords.width / 2 - textWidth / 2;

    lastPage.drawText(clarification, {
      x: centerX,
      y: coords.y - fontSize - 2,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
  }

  const signedPdfBytes = await pdfDoc.save();
  const signedPdfBlob = new Blob([signedPdfBytes], { type: "application/pdf" });

  return await sendSignedContract(contractId, signedPdfBlob);
};
