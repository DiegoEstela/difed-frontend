import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Stack,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import { Timestamp } from "firebase/firestore"; // Para tipado
import { useIsMobile } from "../../hook/common/useIsMobile";
import { getAllContracts } from "../../services/contracts/getAllContracts";
import { MobileScroll, StyledTableContainer } from "./ContractsTable.style";

type Contract = {
  id: string;
  dni: string;
  nombre: string;
  apellido: string;
  status: string;
  url?: string;
  createdAt?: string | number | Date | Timestamp;
};

const ContractsTable: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "firmado" | "pendiente"
  >("all");
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await getAllContracts();
        setContracts(data as Contract[]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, []);

  const filteredContracts = useMemo(() => {
    return contracts
      .filter((c) => {
        const fullName = `${c.nombre} ${c.apellido}`.toLowerCase();
        const matchesSearch =
          c.dni.toLowerCase().includes(search.toLowerCase()) ||
          fullName.includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || c.status.toLowerCase() === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const getDate = (date?: string | number | Date | Timestamp) => {
          if (!date) return 0;
          if (typeof date === "object" && "seconds" in date) {
            return new Date(date.seconds * 1000).getTime();
          }
          return new Date(date as any).getTime();
        };
        return getDate(b.createdAt) - getDate(a.createdAt);
      });
  }, [contracts, search, statusFilter]);

  const formatDate = (date?: string | number | Date | Timestamp) => {
    if (!date) return "-";
    if (typeof date === "object" && "seconds" in date) {
      return new Date(date.seconds * 1000).toLocaleDateString("es-ES");
    }
    return new Date(date as any).toLocaleDateString("es-ES");
  };

  if (loading) return <CircularProgress />;

  if (contracts.length === 0)
    return <Typography>No hay contratos disponibles</Typography>;

  // 🔹 Vista Mobile como Cards con scroll y compacta
  if (isMobile) {
    return (
      <Box sx={{ mt: 2 }}>
        <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Buscar por DNI o Nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Estado</InputLabel>
            <Select
              value={statusFilter}
              label="Estado"
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="firmado">Firmados</MenuItem>
              <MenuItem value="pendiente">Pendientes</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <MobileScroll>
          <Stack spacing={1}>
            {filteredContracts.map((contract) => (
              <Card
                key={contract.id}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  boxShadow: 1,
                  p: 1,
                }}
              >
                <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(contract.createdAt)}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {contract.dni} - {contract.nombre} {contract.apellido}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={contract.status === "firmado" ? "green" : "orange"}
                    fontWeight="bold"
                    sx={{ mt: 0.5 }}
                  >
                    {contract.status}
                  </Typography>
                  {contract.status === "firmado" && contract.url && (
                    <IconButton
                      component="a"
                      href={contract.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      size="small"
                      sx={{ mt: 0.5 }}
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        </MobileScroll>
      </Box>
    );
  }

  // 🔹 Vista Desktop compacta y scrolleable
  return (
    <Box
      sx={{ mt: 2, height: "80vh", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Buscar por DNI o Nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            value={statusFilter}
            label="Estado"
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="firmado">Firmados</MenuItem>
            <MenuItem value="pendiente">Pendientes</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <StyledTableContainer>
        <Table stickyHeader size="small">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContracts.map((contract) => (
              <TableRow
                key={contract.id}
                sx={{
                  "&:hover": { backgroundColor: "#f9f9f9" },
                  transition: "0.2s",
                  height: 42, // 🔹 filas compactas
                }}
              >
                <TableCell>{formatDate(contract.createdAt)}</TableCell>
                <TableCell>{contract.dni}</TableCell>
                <TableCell>{`${contract.nombre} ${contract.apellido}`}</TableCell>
                <TableCell
                  sx={{
                    color: contract.status === "firmado" ? "green" : "orange",
                    fontWeight: "bold",
                  }}
                >
                  {contract.status}
                </TableCell>
                <TableCell>
                  {contract.status === "firmado" && contract.url && (
                    <IconButton
                      component="a"
                      href={contract.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default ContractsTable;
