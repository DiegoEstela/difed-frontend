import styled from "@emotion/styled";

export const SidebarContainer = styled.div`
  width: 240px;
  margin: 16px;
  padding: 24px 20px;
  background-color: #52a0b6ff;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Empuja el footer abajo */

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex-direction: column;
    margin: 0;
    border-radius: 0 0 16px 16px;
    padding: 8px 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    align-items: center;
    justify-content: center;
  }
`;

export const Logo = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
    margin: 4px 0;
  }
`;

export const NavItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 16px;
    justify-content: center;
    width: 100%;
  }
`;

export const NavItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.25);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 10px;
  }
`;

export const SidebarBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto; /* Empuja al fondo */
`;

export const SidebarFooter = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #334155;
  transition: all 0.2s ease;
  &:hover {
    background-color: #475569;
  }
`;

export const SidebarSignature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: 11px;
  margin-top: 8px;
  opacity: 0.9;

  .divider {
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.4);
    margin: 6px 0;
  }
`;
