import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoutes;
