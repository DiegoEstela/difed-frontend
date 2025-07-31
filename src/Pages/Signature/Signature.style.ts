import styled, { keyframes } from "styled-components";
import SignatureCanvas from "react-signature-canvas";

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 96vh;
  width: 100%;
  overflow: hidden;
`;

export const PdfWrapper = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f5f7fa;
`;

export const Footer = styled.div`
  padding: 12px;
  display: flex;
  justify-content: center;
  background-color: white;
  border-top: 1px solid #eee;

  button {
    background: linear-gradient(90deg, #4a90e2, #357ae8);
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.3s ease;

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

export const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 24px 28px;
  border-radius: 20px;
  text-align: center;
  width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2);
  animation: ${fadeInScale} 0.25s ease-out;

  h3 {
    margin-bottom: 12px;
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
    outline: none;
    transition: 0.2s;
    font-size: 14px;

    &:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.2);
    }
  }
`;

export const Canvas = styled(SignatureCanvas)`
  border: 1px solid #ccc;
  border-radius: 12px;
  margin: 16px 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 16px;

  button {
    background: linear-gradient(90deg, #4a90e2, #357ae8);
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(90deg, #5aa0f2, #4688f0);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
    }

    &:nth-child(1) {
      background: #f44336;
      &:hover {
        background: #e53935;
        box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
      }
    }

    &:nth-child(3) {
      background: #9e9e9e;
      &:hover {
        background: #757575;
        box-shadow: 0 4px 12px rgba(158, 158, 158, 0.3);
      }
    }
  }
`;
