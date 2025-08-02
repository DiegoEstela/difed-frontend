import { useEffect, useState } from "react";
import { getContractsSummary } from "../../services/contracts/getContractsSummary";
import logo from "../../assets/logoDifed.png";
import {
  Logo,
  WidgetWrapper,
  WidgetCard,
  WidgetTitle,
  WidgetValue,
} from "./Home.style";
import Container from "../../styles/Container";
import { useIsMobile } from "../../hook/common/useIsMobile";

const Home = () => {
  const [summary, setSummary] = useState({
    pending: 0,
    signed: 0,
    confirmed: 0,
  });

  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getContractsSummary();
      setSummary(data);
    };
    fetchSummary();
  }, []);

  return (
    <Container isMobile={isMobile}>
      <Logo src={logo} alt="Difed Logo" />

      <WidgetWrapper>
        <WidgetCard color="#ffcc00">
          <WidgetTitle>Contratos Pendientes</WidgetTitle>
          <WidgetValue color="#ffcc00">{summary.pending}</WidgetValue>
        </WidgetCard>

        <WidgetCard color="#4cafef">
          <WidgetTitle>Contratos Firmados</WidgetTitle>
          <WidgetValue color="#4cafef">{summary.signed}</WidgetValue>
        </WidgetCard>

        <WidgetCard color="#34c759">
          <WidgetTitle>Contratos Confirmados</WidgetTitle>
          <WidgetValue color="#34c759">{summary.confirmed}</WidgetValue>
        </WidgetCard>
      </WidgetWrapper>
    </Container>
  );
};

export default Home;
