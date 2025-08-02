import { Typography } from "@mui/material";
import { useIsMobile } from "../../hook/common/useIsMobile";

const HeaderTitle = () => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    // 🔹 Desktop: texto normal
    return (
      <Typography
        variant="h6"
        style={{
          color: "white",
          fontWeight: 700,
          flex: 1,
          textAlign: "center",
        }}
      >
        DIFED
      </Typography>
    );
  }

  // 🔹 Mobile: branding moderno
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Typography
        variant="h6"
        style={{
          color: "white",
          fontWeight: 800,
          marginRight: 6,
        }}
      >
        DIFED
      </Typography>
      <Typography
        variant="caption"
        style={{
          color: "#d2e7f8", // azul claro Material UI
          fontWeight: 500,
          letterSpacing: "0.5px",
        }}
      >
        by Mobile
      </Typography>
    </div>
  );
};

export default HeaderTitle;
