import { Link, useNavigate } from "react-router-dom";
import  useAuth  from "../../hooks/useAuth.js";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
      onError: () => {
        navigate("/login");
      },
    });
  };
  return (
  <nav className="border-b border-border bg-surface">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
      <Link to="/" className="text-lg font-bold text-foreground">
        MV-ECOM
      </Link>
      <div className="flex items-center gap-4 text-sm text-muted">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <Link to="/products" className="hover:text-foreground">Products</Link>
      </div>
      <div className="flex items-center gap-4 text-sm">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="text-muted hover:text-foreground">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-primary px-3 py-2 font-medium text-white hover:bg-primary/90"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {user?.role === "CUSTOMER" && (
              <>
                <Link to="/cart">Cart</Link>
                <Link to="/orders">My Orders</Link>
                <Link to="/addresses">Addresses</Link>
              </>
            )}
            {user?.role === "VENDOR" && (
              <>
                <Link to="/vendor/dashboard">Dashboard</Link>
                <Link to="/vendor/products">Products</Link>
                <Link to="/vendor/orders">Orders</Link>
                <Link to="/vendor/store">Store</Link>
              </>
            )}
            {user?.role === "ADMIN" && (
              <>
                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/vendors">Vendors</Link>
                <Link to="/admin/categories">Categories</Link>
                <Link to="/admin/orders">Orders</Link>
              </>
            )}
            <span className="text-muted">Welcome, {user?.name}</span>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded-md border border-border px-3 py-2 text-sm hover:bg-page disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
);
};

export default Navbar;
