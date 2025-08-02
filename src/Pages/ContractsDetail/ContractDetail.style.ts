import styled from "@emotion/styled";

export const Wrapper = styled.div<{ isMobile?: boolean }>`
  padding: ${(props) => (props.isMobile ? "12px" : "20px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h2<{ isMobile?: boolean }>`
  font-size: ${(props) => (props.isMobile ? "1.2rem" : "1.5rem")};
  font-weight: 700;
  text-align: ${(props) => (props.isMobile ? "left" : "center")};
  width: 100%;
  margin-bottom: ${(props) => (props.isMobile ? "12px" : "20px")};
`;

export const Iframe = styled.iframe<{ isMobile?: boolean }>`
  width: ${(props) => (props.isMobile ? "100%" : "80vw")};
  height: ${(props) => (props.isMobile ? "65vh" : "75vh")};
  border: 1px solid #ccc;
  border-radius: ${(props) => (props.isMobile ? "8px" : "12px")};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  margin-bottom: ${(props) => (props.isMobile ? "12px" : "20px")};
`;
