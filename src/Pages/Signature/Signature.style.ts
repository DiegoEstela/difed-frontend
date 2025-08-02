import styled, { keyframes } from "styled-components";

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Container = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  height: 96vh;
  width: 100%;
  overflow: hidden;
  background: #f5f7fa;
`;

export const PdfWrapper = styled.div<{ isMobile?: boolean }>`
  flex: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: ${(props) => (props.isMobile ? "4px" : "16px")};
  background-color: #f5f7fa;

  ${(props) =>
    props.isMobile &&
    `
      max-height: calc(100vh - 140px);
  `}
`;

export const Footer = styled.div<{ isMobile?: boolean }>`
  position: ${(props) => (props.isMobile ? "fixed" : "static")};
  bottom: ${(props) => (props.isMobile ? "70px" : "0")};
  width: ${(props) => (props.isMobile ? "96%" : "100%")};
  display: flex;
  justify-content: center;
  background-color: transparent;

  button {
    background: linear-gradient(90deg, #4a90e2, #357ae8);
    color: white;
    border: none;
    padding: ${(props) => (props.isMobile ? "10px 24px" : "10px 32px")};
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: ${(props) => (props.isMobile ? "14px" : "15px")};
    transition: all 0.3s ease;
    min-width: 160px;

    &:hover {
      background: linear-gradient(90deg, #5aa0f2, #4688f0);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div<{ isMobile?: boolean }>`
  background: white;
  padding: 24px 28px;
  border-radius: 20px;
  text-align: center;
  width: ${(props) => (props.isMobile ? "90%" : "440px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2);
  animation: ${fadeInScale} 0.25s ease-out;

  h3 {
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: 600;
    color: #222;
  }

  input {
    width: 100%;
    padding: 10px 12px;
    margin-top: 12px;
    border: 1px solid #ddd;
    border-radius: 12px;
    background: #fff;
    outline: none;
    font-size: 14px;
    color: #333;
    transition: 0.2s;

    &:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.2);
    }
  }
`;

export const CanvasWrapper = styled.div`
  display: block;
  margin: 16px 0;
  width: 100%;
  max-width: 350px;

  /* 🔹 Estilo para el canvas interno */
  canvas {
    width: 100% !important;
    height: auto !important;
    border: 2px dashed #bbb; /* Borde visible */
    border-radius: 16px; /* Bordes redondeados */
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export const ButtonRow = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
  width: 100%;

  /* 🔹 Primera fila para botones secundarios */
  .top-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;

    button {
      flex: 1;
      padding: 8px 12px;
      font-size: ${(props) => (props.isMobile ? "13px" : "14px")};
      border-radius: 12px;
      border: none;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:nth-child(1) {
        background: #f44336;
        &:hover {
          background: #e53935;
        }
      }

      &:nth-child(2) {
        background: #2196f3;
        &:hover {
          background: #1976d2;
        }
      }

      &:nth-child(3) {
        background: #9e9e9e;
        &:hover {
          background: #757575;
        }
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }

  /* 🔹 Botón principal "Firmar y Enviar" */
  .primary-button {
    display: flex;
    justify-content: center;

    button {
      width: 100%;
      max-width: 220px;
      padding: 10px 16px;
      background: #4caf50;
      color: white;
      border: none;
      border-radius: 14px;
      font-weight: 700;
      font-size: ${(props) => (props.isMobile ? "14px" : "15px")};
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #43a047;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
`;
