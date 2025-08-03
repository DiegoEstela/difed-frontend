import { Box, TableContainer } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: theme.shadows[3],
  overflowY: "auto",
  flex: 1,
  "&::-webkit-scrollbar": {
    width: 8,
    height: 8,
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.background.default,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main,
    borderRadius: 4,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.primary.dark,
  },
  scrollbarWidth: "thin",
  scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.default}`,
}));

// 🔹 Scroll container para mobile
export const MobileScroll = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "80vh",
  paddingRight: 4,
  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.background.default,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main,
    borderRadius: 3,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.primary.dark,
  },
}));
