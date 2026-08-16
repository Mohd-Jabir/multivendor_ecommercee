import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Outlet />;
  }
  if (user?.role === "VENDOR") {
    return <Navigate to="/vendor/dashboard" replace />;
  }
  if (user?.role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }
  return <Navigate to="/" replace />;
};

export default GuestRoute;
