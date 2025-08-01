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
        position: "fixed",
        top: 50,
        right: 50,
        zIndex: 2000,
      }}
    >
      <IconButton
        color="inherit"
        onClick={handleClick}
        size="large"
        style={{ background: "#52a0b6ff" }}
      >
        <Badge badgeContent={contracts.length} color="error">
          <NotificationsIcon />
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
            .slice() // copia para no mutar el estado original
            .sort((a, b) => {
              const dateA = a.signedAt ? new Date(a.signedAt).getTime() : 0;
              const dateB = b.signedAt ? new Date(b.signedAt).getTime() : 0;
              return dateB - dateA; // descendente (recientes primero)
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
