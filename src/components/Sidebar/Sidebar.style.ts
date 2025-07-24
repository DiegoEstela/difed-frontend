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
  gap: 24px;

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

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 10px;
  }
`;
