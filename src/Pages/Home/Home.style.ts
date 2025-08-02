import styled from "@emotion/styled";

export const Container = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  overflow: auto;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 2rem;

  color: #1a1a1a;
`;

export const Logo = styled.img`
  width: 150px;
  height: auto;

  @media (min-width: 768px) {
    width: 200px;
  }
`;

export const WidgetWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 900px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const WidgetCard = styled.div<{ color: string }>`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  /* Efecto hover solo en desktop */
  @media (hover: hover) {
    transition: transform 0.2s ease;
    cursor: pointer;
    &:hover {
      transform: translateY(-4px) scale(1.02);
    }
  }
`;

export const WidgetTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
`;

export const WidgetValue = styled.div<{ color: string }>`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${(props) => props.color};
`;
