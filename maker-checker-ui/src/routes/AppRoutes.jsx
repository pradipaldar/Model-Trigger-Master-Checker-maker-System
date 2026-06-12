import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";

// Maker
import MakerDashboard from "../pages/maker/MakerDashboard";
import Modules from "../pages/maker/Modules";
import MyRequests from "../pages/maker/MyRequests";

// Checker
import CheckerDashboard from "../pages/checker/CheckerDashboard";
import PendingApprovals from "../pages/checker/PendingApprovals";
import AuditLogs from "../pages/checker/AuditLogs";
import LoginHistory from "../pages/checker/LoginHistory";
import AddModule from "../pages/checker/AddModule";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* MAKER ROUTES */}
        <Route
          path="/maker/dashboard"
          element={
            <ProtectedRoute>
              <MakerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/maker/modules"
          element={
            <ProtectedRoute>
              <Modules />
            </ProtectedRoute>
          }
        />

        <Route
          path="/maker/requests"
          element={
            <ProtectedRoute>
              <MyRequests />
            </ProtectedRoute>
          }
        />

        {/* CHECKER ROUTES */}
        <Route
          path="/checker/dashboard"
          element={
            <ProtectedRoute>
              <CheckerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checker/approvals"
          element={
            <ProtectedRoute>
              <PendingApprovals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checker/audit"
          element={
            <ProtectedRoute>
              <AuditLogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checker/history"
          element={
            <ProtectedRoute>
              <LoginHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checker/add-module"
          element={
            <ProtectedRoute>
              <AddModule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checker/modules"
          element={
         <ProtectedRoute>
          <Modules />
         </ProtectedRoute>
      }
    />
      

      </Routes>
    </BrowserRouter>
  );
}