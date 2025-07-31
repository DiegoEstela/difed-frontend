import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./Pages/Home/Home";
import Contracts from "./Pages/Contracts/Contracts";
import { Layout, Content } from "./App.style";
import Signature from "./Pages/Signature/Signature";

function App() {
  return (
    <Router>
      <Layout>
        <Sidebar />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contratos" element={<Contracts />} />
            <Route path="/signature/:contractId" element={<Signature />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
