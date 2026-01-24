import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function CompanyProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // Wait until auth is loaded
  if (loading) return null;

  // Not logged in or not company
  if (!user || user.role !== "company") {
    return <Navigate to="/company-login" replace />;
  }

  return children;
}
