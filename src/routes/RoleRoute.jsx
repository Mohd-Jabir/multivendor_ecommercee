import { Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function RoleRoute({allowedRoles}){
    const { user, isAuthenticated } = useSelector((state) => state.auth);
      if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet/>
}
export default RoleRoute;
