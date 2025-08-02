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
  const open = Boolean(anchorEl);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const unsubscribe = listenSignedContracts(setContracts);
    return () => unsubscribe();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        position: isMobile ? "static" : "fixed",
        top: isMobile ? "auto" : "6%",
        right: isMobile ? "auto" : "3%",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="notification-bell"
    >
      <IconButton
        color="inherit"
        onClick={handleClick}
        size={isMobile ? "medium" : "large"}
        style={{
          background: "#52a0b6",
          ...(isMobile && { background: "transparent" }),
        }}
      >
        <Badge
          badgeContent={contracts.length}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: isMobile ? "0.7rem" : "0.65rem",
              height: isMobile ? "18px" : "16px",
              minWidth: isMobile ? "18px" : "16px",
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
          contracts
            .slice()
            .sort((a, b) => {
              const dateA = a.signedAt ? new Date(a.signedAt).getTime() : 0;
              const dateB = b.signedAt ? new Date(b.signedAt).getTime() : 0;
              return dateB - dateA;
            })
            .map((contract) => (
              <MenuItem
                key={contract.id}
                onClick={() => {
                  window.location.href = `/signatureDetail/${contract.id}`;
                  handleClose();
                }}
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
