import {
  createBrowserRouter,
  Outlet,
} from "react-router-dom";

import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";
import GuestRoute from "./GuestRoute.jsx";
import HomePage from "../pages/public/HomePage.jsx";
import LoginPage from "../pages/public/LoginPage.jsx";
import RegisterPage from "../pages/public/RegisterPage.jsx";
import ProductsPage from "../pages/public/ProductsPage.jsx";
import ProductDetailPage from "../pages/public/ProductDetailPage.jsx";
import CartPage from "../pages/customer/CartPage.jsx";
import AddressesPage from "../pages/customer/AddressesPage.jsx";
import CheckoutPage from "../pages/customer/CheckoutPage.jsx";
import OrdersPage from "../pages/customer/OrdersPage.jsx";
import OrderDetailPage from "../pages/customer/OrderDetailPage.jsx";
import VendorDashboardPage from "../pages/vendor/VendorDashboardPage.jsx";
import StoreProfilePage from "../pages/vendor/StoreProfilePage.jsx";
import VendorProductsPage from "../pages/vendor/VendorProductsPage.jsx";
import AddProductPage from "../pages/vendor/AddProductPage.jsx";
import EditProductPage from "../pages/vendor/EditProductPage.jsx";
import VendorOrdersPage from "../pages/vendor/VendorOrdersPage.jsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import VendorApprovalsPage from "../pages/admin/VendorApprovalsPage.jsx";
import CategoryManagementPage from "../pages/admin/CategoryManagementPage.jsx";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage.jsx";
const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        element: <GuestRoute />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: (
              <RoleRoute
                allowedRoles={["CUSTOMER"]}
              />
            ),
            children: [
              {
                path: "/cart",
                element: <CartPage />,
              },
              {
                path: "/addresses",
                element: <AddressesPage />,
              },
              {
                path: "/checkout",
                element: <CheckoutPage />,
              },
              {
                path: "/orders",
                element: <OrdersPage />,
              },
              {
                path: "/orders/:id",
                element: <OrderDetailPage />,
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: (
              <RoleRoute
                allowedRoles={["VENDOR"]}
              />
            ),
            children: [
              {
                path: "/vendor/dashboard",
                element: <VendorDashboardPage />,
              },
              {
                path: "/vendor/store",
                element: <StoreProfilePage />,
              },
              {
                path: "/vendor/products",
                element: <VendorProductsPage />,
              },
              {
                path: "/vendor/products/add",
                element: <AddProductPage />,
              },
              {
                path: "/vendor/products/:productId/edit",
                element: <EditProductPage />,
              },
              {
                path: "/vendor/orders",
                element: <VendorOrdersPage />,
              },
            ],
          },
        ],
      },
     {
        element: <ProtectedRoute />,
        children: [
          {
            element: (
              <RoleRoute
                allowedRoles={["ADMIN"]}
              />
            ),
            children: [
              {
                path: "/admin",
                element: <AdminDashboardPage />,
              },
              {
                path: "/admin/vendors",
                element: <VendorApprovalsPage />,
              },
              {
                path: "/admin/categories",
                element: <CategoryManagementPage />,
              },
              {
                path: "/admin/orders",
                element: <AdminOrdersPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <HomePage />,
  },
]);

export default router;
