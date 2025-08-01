import styled from "@emotion/styled";
import palette from "./styles/palette";

export const Layout = styled.div`
  display: flex;
  min-height: 98vh;
  width: 100vw;
  height: 100vh;
  background-color: ${palette.background};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 32px;
  overflow: hidden; // evita scroll interno
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    padding: 16px;
  }
`;
