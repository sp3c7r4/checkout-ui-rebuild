import Auth from "./components/Auth"
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AppProvider, useAuth } from "./contexts/AppContext";
import { DashboardLayout } from "./layouts/DashboardLayout";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return user ? children : <Navigate to="/auth" />;
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout business={null} user={null} />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
