import Container from "../../styles/Container";
import logo from "../../assets/logoDifed.png";

const Home = () => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        flexDirection: "column",
      }}
    >
      <img
        src={logo}
        alt="Difed Logo"
        style={{ width: "600px", height: "auto" }}
      />
    </Container>
  );
};

export default Home;
