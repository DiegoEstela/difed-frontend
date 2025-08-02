import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { db } from "../../services/firebase";
import { useIsMobile } from "../../hook/common/useIsMobile";

import { Wrapper, Title, Iframe } from "./ContractDetail.style";

interface Contract {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  signedAt?: any;
  status: string;
  url: string;
}

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchContract = async () => {
      const docRef = doc(db, "contracts", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as Omit<Contract, "id">;
        setContract({ ...data, id: snap.id });
      }
      setLoading(false);
    };

    fetchContract();
  }, [id]);

  const handleConfirm = async () => {
    if (!id) return;

    await updateDoc(doc(db, "contracts", id), { status: "confirmado" });
    setOpenSnackbar(true);

    setTimeout(() => navigate("/"), 1500);
  };

  if (loading) return <CircularProgress style={{ margin: 40 }} />;

  if (!contract) return <p style={{ padding: 20 }}>Contrato no encontrado</p>;

  return (
    <Wrapper isMobile={isMobile}>
      <Title isMobile={isMobile}>
        Contrato de {contract.nombre} {contract.apellido} - {contract.dni}
      </Title>

      <Iframe
        isMobile={isMobile}
        src={contract.url}
        title="Vista previa del contrato"
      />

      {contract.status === "firmado" && (
        <Button
          variant="contained"
          color="success"
          style={{
            marginTop: isMobile ? 12 : 20,
            width: isMobile ? "90%" : "auto",
          }}
          onClick={handleConfirm}
        >
          Confirmar firma
        </Button>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          ✅ Contrato confirmado correctamente
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default ContractDetail;
