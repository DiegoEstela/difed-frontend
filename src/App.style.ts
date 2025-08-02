import styled from "@emotion/styled";
import palette from "./styles/palette";

interface LayoutProps {
  isMobile?: boolean;
}

export const Layout = styled.div<LayoutProps>`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background-color: ${palette.background};
  overflow: hidden; /* Evita cualquier borde negro alrededor */

  ${(props) =>
    props.isMobile &&
    `
      flex-direction: column;
  `}
`;

interface ContentProps {
  isMobile?: boolean;
}

export const Content = styled.div<ContentProps>`
  flex: 1;
  padding: ${(props) => (props.isMobile ? "16px" : "32px")};
  display: flex;
  justify-content: ${(props) => (props.isMobile ? "flex-start" : "center")};
  align-items: ${(props) => (props.isMobile ? "flex-start" : "center")};
  box-sizing: border-box;
  width: 100%;

  /* 🔹 Sin scroll interno */
  overflow: hidden;

  ${(props) =>
    props.isMobile &&
    `
      height: auto;
      min-height: calc(100vh - 56px); /* Altura menos header mobile */
  `}
`;
