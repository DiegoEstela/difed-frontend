import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./Pages/Home/Home";
import Contracts from "./Pages/Contracts/Contracts";
import { Layout, Content } from "./App.style";
import Signature from "./Pages/Signature/Signature";
import NotificationBell from "./components/common/NotificationBell";
import ContractDetail from "./Pages/ContractsDetail/ContractsDetail";

import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { useAuth } from "./hook/auth/useAuth";
import LoginPage from "./Pages/Login/LoginPages";

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();

  // 🔹 Solo ocultamos sidebar en /signature/:id
  const isSignaturePage =
    location.pathname.startsWith("/signature/") &&
    !location.pathname.startsWith("/signatureDetail");

  return (
    <Layout>
      {/* 🔹 Solo mostrar Sidebar si NO estamos en modo firma */}
      {!isSignaturePage && <Sidebar />}

      <Content>
        {/* 🔹 Mostrar campana solo si hay usuario y no estamos en modo firma */}
        {user && !isSignaturePage && <NotificationBell />}

        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signature/:contractId" element={<Signature />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contratos"
            element={
              <ProtectedRoute>
                <Contracts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signatureDetail/:id"
            element={
              <ProtectedRoute>
                <ContractDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Content>
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
