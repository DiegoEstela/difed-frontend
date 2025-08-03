import { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import {
  listenSignedContracts,
  type Contract,
} from "../../services/contracts/listenSignedContracts";

const NotificationBell = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const unsubscribe = listenSignedContracts(setContracts);
    return () => unsubscribe();
  }, []);

  // 🔹 Actualiza isMobile en resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelectContract = (id: string) => {
    window.location.href = `/signatureDetail/${id}`;
    handleClose();
  };

  const sortedContracts = contracts.slice().sort((a, b) => {
    const dateA = a.signedAt ? new Date(a.signedAt).getTime() : 0;
    const dateB = b.signedAt ? new Date(b.signedAt).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div
      className="notification-bell"
      style={{
        position: isMobile ? "static" : "fixed",
        top: isMobile ? "auto" : 24,
        right: isMobile ? "auto" : 24,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        color="inherit"
        onClick={handleClick}
        size={isMobile ? "medium" : "large"}
        sx={{
          background: isMobile ? "transparent" : "#52a0b6",
          "&:hover": { background: isMobile ? "transparent" : "#4790a3" },
        }}
      >
        <Badge
          badgeContent={contracts.length}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.65rem",
              height: "16px",
              minWidth: "16px",
              ...(isMobile && {
                fontSize: "0.7rem",
                height: "18px",
                minWidth: "18px",
              }),
            },
          }}
        >
          <NotificationsIcon fontSize={isMobile ? "large" : "medium"} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { maxHeight: 300, width: 300 },
        }}
      >
        {contracts.length === 0 ? (
          <MenuItem disabled>No hay contratos firmados</MenuItem>
        ) : (
          sortedContracts.map((contract) => (
            <MenuItem
              key={contract.id}
              onClick={() => handleSelectContract(contract.id)}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <strong>
                  {contract.nombre} {contract.apellido} - {contract.dni}
                </strong>
                <small>
                  {contract.signedAt
                    ? new Date(contract.signedAt).toLocaleString()
                    : "Sin fecha"}
                </small>
              </div>
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
};

export default NotificationBell;
