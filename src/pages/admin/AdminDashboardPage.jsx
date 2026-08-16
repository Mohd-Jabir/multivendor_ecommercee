import { Link } from "react-router-dom";

import {
  usePendingVendors,
  useApprovedVendors,
  useAdminOrders,
} from "../../hooks/useAdmin.js";
import { useCategories } from "../../hooks/useCategories.js";
const AdminDashboardPage = () => {
  const { data: pendingVendors, isLoading: pendingLoading } =
    usePendingVendors();
  const { data: approvedVendors, isLoading: approvedLoading } =
    useApprovedVendors();
  const { data: categories, isLoading: categoriesLoading } =
    useCategories(false);
  const { data: ordersData, isLoading: ordersLoading } = useAdminOrders({
    page: 0,
    size: 20,
  });
  const isLoading =
    pendingLoading || approvedLoading || categoriesLoading || ordersLoading;
  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-3 text-sm text-muted">Loading dashboard...</p>
      </main>
    );
  }
  const orders = ordersData?.content || [];
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <section>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Manage vendors, categories and orders.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="font-semibold">Overview</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Pending Vendors",
              pendingVendors?.length || 0,
              "/admin/vendors",
              "Review Vendors",
            ],
            ["Approved Vendors", approvedVendors?.length || 0],
            [
              "Categories",
              categories?.length || 0,
              "/admin/categories",
              "Manage Categories",
            ],
            [
              "Recent Orders",
              ordersData?.totalElements ?? orders.length,
              "/admin/orders",
              "View Orders",
            ],
          ].map(([label, value, path, action]) => (
            <article
              key={label}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <h3 className="text-sm text-muted">{label}</h3>
              <p className="mt-2 text-2xl font-bold">{value}</p>
              {path && (
                <Link
                  to={path}
                  className="mt-3 inline-block text-sm font-medium text-primary"
                >
                  {action}
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border bg-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Pending Vendor Approvals</h2>
            <Link
              to="/admin/vendors"
              className="text-sm font-medium text-primary"
            >
              View All
            </Link>
          </div>

          {!pendingVendors?.length ? (
            <p className="mt-4 text-sm text-muted">
              No vendors are waiting for approval.
            </p>
          ) : (
            <div className="mt-4 divide-y divide-border">
              {pendingVendors.slice(0, 5).map((vendor) => (
                <article
                  key={vendor.id || vendor.vendorId}
                  className="py-3 first:pt-0 last:pb-0"
                >
                  <h3 className="text-sm font-medium">
                    {vendor.name || "Vendor"}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{vendor.email}</p>
                  <p className="mt-1 text-sm text-muted">
                    Store: {vendor.storeName || "N/A"}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-lg border border-border bg-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-sm font-medium text-primary"
            >
              View All
            </Link>
          </div>

          {!orders.length ? (
            <p className="mt-4 text-sm text-muted">No orders yet.</p>
          ) : (
            <div className="mt-4 divide-y divide-border">
              {orders.slice(0, 5).map((order) => (
                <article
                  key={order.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <h3 className="text-sm font-medium">
                      Order #{order.orderNumber || order.id}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      Status: {order.status || "N/A"}
                    </p>
                  </div>
                  <strong className="text-sm">₹{order.totalAmount ?? 0}</strong>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="mt-8">
        <h2 className="font-semibold">Quick Actions</h2>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/admin/vendors"
            className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
          >
            Vendor Approvals
          </Link>
          <Link
            to="/admin/categories"
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface"
          >
            Categories
          </Link>
          <Link
            to="/admin/orders"
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface"
          >
            All Orders
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboardPage;
