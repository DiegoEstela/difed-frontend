import {
  Logo,
  NavItem,
  NavItemsWrapper,
  SidebarContainer,
} from "./Sidebar.style";
import { useNavigate } from "react-router-dom";
import { Home, Description } from "@mui/icons-material";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <SidebarContainer>
      <Logo>Difed</Logo>
      <NavItemsWrapper>
        <NavItem onClick={() => navigate("/")}>
          <Home fontSize="small" /> Inicio
        </NavItem>
        <NavItem onClick={() => navigate("/contratos")}>
          <Description fontSize="small" /> Contratos
        </NavItem>
      </NavItemsWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
