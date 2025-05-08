import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Private Route Component
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Prevents flashing of unauthorized content

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
