import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ContractsTable from "../../components/table/ContractsTable";

const ContractView: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Contratos
        </Typography>
      </Box>
      <ContractsTable />
    </Container>
  );
};

export default ContractView;
