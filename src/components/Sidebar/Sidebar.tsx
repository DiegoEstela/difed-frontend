import {
  Logo,
  NavItem,
  NavItemsWrapper,
  SidebarContainer,
  SidebarFooter,
  SidebarBottom,
  SidebarSignature,
} from "./Sidebar.style";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Description, Logout } from "@mui/icons-material";

import { Typography } from "@mui/material";
import { useAuth } from "../../hook/auth/useAuth";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <SidebarContainer>
      {/* Logo */}
      <Logo>DIFED</Logo>

      {/* Navegación */}
      <NavItemsWrapper>
        <NavItem
          onClick={() => navigate("/")}
          className={location.pathname === "/" ? "active" : ""}
        >
          <Home fontSize="small" /> Inicio
        </NavItem>
        <NavItem
          onClick={() => navigate("/contratos")}
          className={location.pathname.startsWith("/contratos") ? "active" : ""}
        >
          <Description fontSize="small" /> Contratos
        </NavItem>
      </NavItemsWrapper>

      {/* Footer */}
      <SidebarBottom>
        <SidebarFooter onClick={handleLogout}>
          <Logout fontSize="small" />
          <Typography variant="body2" ml={1}>
            Cerrar sesión
          </Typography>
        </SidebarFooter>

        <SidebarSignature>
          <div className="divider" />
          <Typography variant="caption" style={{ opacity: 0.8 }}>
            Creado por FarestLab 2025
          </Typography>
          <Typography variant="caption" style={{ opacity: 0.6 }}>
            v1.0.0
          </Typography>
        </SidebarSignature>
      </SidebarBottom>
    </SidebarContainer>
  );
};

export default Sidebar;
