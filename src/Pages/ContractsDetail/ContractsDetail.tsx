import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { db } from "../../services/firebase";

interface Contract {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  signedAt?: any;
  status: string;
  url: string; // URL del PDF en Firebase Storage
}

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

    await updateDoc(doc(db, "contracts", id), {
      status: "confirmado",
    });

    setOpenSnackbar(true);

    // Opcional: volver al home después de 1.5s
    setTimeout(() => navigate("/"), 1500);
  };

  if (loading) return <CircularProgress style={{ margin: 40 }} />;

  if (!contract) return <p style={{ padding: 20 }}>Contrato no encontrado</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>
        Contrato de {contract.nombre} {contract.apellido} - {contract.dni}
      </h2>

      <iframe
        src={contract.url}
        style={{ width: "70vw", height: "75vh", border: "1px solid #ccc" }}
        title="Vista previa del contrato"
      />

      {contract.status === "firmado" && (
        <Button
          variant="contained"
          color="success"
          style={{ marginTop: 20 }}
          onClick={handleConfirm}
        >
          Confirmar firma
        </Button>
      )}

      {/* Snackbar de confirmación */}
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
    </div>
  );
};

export default ContractDetail;
