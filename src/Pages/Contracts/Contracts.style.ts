import styled from "@emotion/styled";
import { Paper } from "@mui/material";

export const CardsWrapper = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${(props) => (props.isMobile ? "1rem" : "2rem")};
  width: 100%;
  max-width: 900px;
`;

export const ActionCard = styled(Paper)<{ isMobile?: boolean }>`
  width: ${(props) => (props.isMobile ? "100%" : "200px")};
  height: ${(props) => (props.isMobile ? "120px" : "180px")};
  padding: ${(props) => (props.isMobile ? "16px" : "32px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.isMobile ? "0.5rem" : "1rem")};
  border-radius: 16px;
  cursor: pointer;
  transition: 0.2s;

  /* Hover solo en desktop */
  @media (hover: hover) {
    &:hover {
      background-color: #52a0b6;
      color: white;
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
