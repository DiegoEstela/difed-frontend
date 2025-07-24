// src/Pages/Contracts/Contracts.style.ts
import styled from "@emotion/styled";

export const Container = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

export const OptionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #f6f9fc;
  padding: 32px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 200px;

  &:hover {
    background-color: #e4f1ff;
    transform: translateY(-4px);
  }

  h3 {
    margin: 0;
  }
`;
