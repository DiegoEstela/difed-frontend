import { useEffect, useState } from "react";
import Container from "../../styles/Container";
import logo from "../../assets/logoDifed.png";
import { getContractsSummary } from "../../services/contracts/getContractsSummary";

const Home = () => {
  const [summary, setSummary] = useState({
    pending: 0,
    signed: 0,
    confirmed: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getContractsSummary();
      setSummary(data);
    };
    fetchSummary();
  }, []);

  return (
    <Container>
      {/* Logo */}
      <img
        src={logo}
        alt="Difed Logo"
        style={{
          width: "30%",
          height: "auto",
          marginBottom: "2rem",
        }}
      />

      {/* Widgets */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        <WidgetCard
          title="Contratos Pendientes"
          value={summary.pending}
          color="#ffcc00"
        />
        <WidgetCard
          title="Contratos Firmados"
          value={summary.signed}
          color="#4cafef"
        />
        <WidgetCard
          title="Contratos Confirmados"
          value={summary.confirmed}
          color="#34c759"
        />
      </div>
    </Container>
  );
};

const WidgetCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => {
  return (
    <div
      style={{
        width: "240px",
        height: "140px",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        transition: "transform 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px) scale(1.02)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
    >
      <div style={{ fontSize: "1rem", fontWeight: 600 }}>{title}</div>
      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default Home;
