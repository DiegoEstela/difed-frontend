import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Description, Logout, Menu } from "@mui/icons-material";
import { Typography, IconButton, Drawer } from "@mui/material";
import { useAuth } from "../../hook/auth/useAuth";
import NotificationBell from "../common/NotificationBell";

import {
  SidebarContainer,
  Logo,
  NavItemsWrapper,
  NavItem,
  SidebarBottom,
  SidebarFooter,
  SidebarSignature,
  MobileHeader,
  MobileRight,
} from "./Sidebar.style";
import HeaderTitle from "./HeaderTitle";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const isMobile = window.innerWidth <= 768;

  /* ---------- MOBILE ---------- */
  if (isMobile) {
    return (
      <>
        {/* 🔹 Header Mobile */}
        <MobileHeader>
          <IconButton onClick={() => setMobileOpen(true)}>
            <Menu style={{ color: "white" }} />
          </IconButton>
          <HeaderTitle />
          <MobileRight>{user && <NotificationBell />}</MobileRight>
        </MobileHeader>

        {/* 🔹 Drawer con menú lateral */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{
            style: {
              width: "70vw",
              maxWidth: 260,
              backgroundColor: "#52a0b6",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "20px 16px",
            },
          }}
        >
          <NavItemsWrapper isDrawer>
            <NavItem
              onClick={() => {
                navigate("/");
                setMobileOpen(false);
              }}
              className={location.pathname === "/" ? "active" : ""}
            >
              <Home fontSize="small" /> Inicio
            </NavItem>
            <NavItem
              onClick={() => {
                navigate("/contratos");
                setMobileOpen(false);
              }}
              className={
                location.pathname.startsWith("/contratos") ? "active" : ""
              }
            >
              <Description fontSize="small" /> Contratos
            </NavItem>
          </NavItemsWrapper>

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
        </Drawer>
      </>
    );
  }

  /* ---------- DESKTOP ---------- */
  return (
    <SidebarContainer>
      <Logo>DIFED</Logo>

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
            v1.1.0
          </Typography>
        </SidebarSignature>
      </SidebarBottom>
    </SidebarContainer>
  );
};

export default Sidebar;
