import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Accounts from "./Accounts";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <Accounts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default AppRoutes;