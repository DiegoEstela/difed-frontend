import styled from "@emotion/styled";

interface ContainerProps {
  /** Si es mobile, ajusta padding y estilos */
  isMobile?: boolean;
}

const Container = styled.div<ContainerProps>`
  flex: 1;
  background-color: #fff;
  border-radius: 16px;
  height: 90%;
  padding: ${(props) => (props.isMobile ? "0" : "32px")};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.isMobile ? "flex-center" : "center")};
  align-items: ${(props) => (props.isMobile ? "center" : "center")};
  gap: 2rem;

  color: #1a1a1a;

  /* 🔹 Mobile: ocupa toda la pantalla debajo del header */
  @media (max-width: 768px) {
    border-radius: 0;
    height: auto;
    min-height: calc(100vh - 56px); /* Pantalla menos header */
    box-shadow: none;
  }
`;

export default Container;
