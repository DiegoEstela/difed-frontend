import styled from "@emotion/styled";
import palette from "./styles/palette";

export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background-color: ${palette.background};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;
