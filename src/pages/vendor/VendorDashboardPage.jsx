import { Link } from "react-router-dom";

import {
  useVendorStore,
  useVendorProducts,
  useVendorOrders,
} from "../../hooks/useVendor.js";

const VendorDashboardPage = () => {
  const {
    data: store,
    isLoading: isStoreLoading,
  } = useVendorStore();
  const {
    data: productsData,
    isLoading: isProductsLoading,
  } = useVendorProducts({
    page: 0,
    size: 20,
  });
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
  } = useVendorOrders({
    page: 0,
    size: 20,
  });
  const products = productsData?.content || [];
  const orders = ordersData?.content || [];
  const isLoading =
    isStoreLoading ||
    isProductsLoading ||
    isOrdersLoading;
  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-bold">
          Vendor Dashboard
        </h1>
        <p className="mt-3 text-sm text-muted">
          Loading dashboard...
        </p>
      </main>
    );
  }
  const activeProducts = products.filter(
    (product) => product.active
  );
  const inactiveProducts = products.filter(
    (product) => !product.active
  );
  const pendingOrders = orders.filter(
    (order) =>
      order.status === "PLACED" ||
      order.status === "CONFIRMED"
  );
  const shippedOrders = orders.filter(
    (order) => order.status === "SHIPPED"
  );
  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Vendor Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted">
            Welcome back
            {store?.storeName
              ? `, ${store.storeName}`
              : ""}
          </p>
        </div>
        <Link
          to="/vendor/store"
          className="rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface"
        >
          Manage Store
        </Link>
      </section>
      <section className="mt-8 rounded-lg border border-border bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">
              Store Status
            </h2>
            <p className="mt-1 text-sm text-muted">
              Your store approval status
            </p>
          </div>
          {store && (
            <span
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                store.approved
                  ? "bg-success/10 text-success"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {store.approved
                ? "APPROVED"
                : "PENDING APPROVAL"}
            </span>
          )}
        </div>
        {!store ? (
          <div className="mt-4 text-sm">
            <p className="text-muted">
              You haven't created your store yet.
            </p>

            <Link
              to="/vendor/store"
              className="mt-3 inline-block font-medium text-primary"
            >
              Create Store
            </Link>
          </div>
        ) : (
          <div className="mt-5 rounded-md border border-border bg-page p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted">
                  Store Name
                </p>
                <p className="mt-1 font-medium">
                  {store.storeName || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">
                  Approval Status
                </p>

                <p
                  className={`mt-1 font-semibold ${
                    store.approved
                      ? "text-success"
                      : "text-primary"
                  }`}
                >
                  {store.approved
                    ? "Approved"
                    : "Pending Approval"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted">
                  Owner
                </p>

                <p className="mt-1 font-medium">
                  {store.ownerName || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted">
                  Email
                </p>

                <p className="mt-1 font-medium">
                  {store.ownerEmail || "N/A"}
                </p>
              </div>

            </div>

            {!store.approved && (
              <div className="mt-4 rounded-md border border-border bg-surface p-4">
                <p className="text-sm text-muted">
                  Your store has been submitted and is
                  waiting for administrator approval.
                </p>
              </div>
            )}

            {store.approved && (
              <div className="mt-4 rounded-md bg-success/10 p-4">
                <p className="text-sm font-medium text-success">
                  Your store has been approved. You can
                  now manage your products and start
                  selling.
                </p>
              </div>
            )}

          </div>
        )}
      </section>
      <section className="mt-8">
        <h2 className="font-semibold">
          Overview
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {[
            [
              "Total Products",
              productsData?.totalElements ??
                products.length,
              "/vendor/products",
              "View Products",
            ],

            [
              "Active Products",
              activeProducts.length,
            ],

            [
              "Inactive Products",
              inactiveProducts.length,
            ],

            [
              "Total Orders",
              ordersData?.totalElements ??
                orders.length,
              "/vendor/orders",
              "View Orders",
            ],
          ].map(
            ([label, value, path, action]) => (
              <article
                key={label}
                className="rounded-lg border border-border bg-surface p-5"
              >

                <h3 className="text-sm text-muted">
                  {label}
                </h3>

                <p className="mt-2 text-2xl font-bold">
                  {value}
                </p>

                {path && (
                  <Link
                    to={path}
                    className="mt-3 inline-block text-sm font-medium text-primary"
                  >
                    {action}
                  </Link>
                )}

              </article>
            )
          )}

        </div>
      </section>
      <section className="mt-8">
        <h2 className="font-semibold">
          Order Overview
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            [
              "Pending",
              pendingOrders.length,
              "text-primary",
            ],
            [
              "Shipped",
              shippedOrders.length,
              "text-muted",
            ],

            [
              "Delivered",
              deliveredOrders.length,
              "text-success",
            ],
          ].map(
            ([label, value, color]) => (
              <article
                key={label}
                className="rounded-lg border border-border bg-surface p-5"
              >

                <h3 className="text-sm text-muted">
                  {label}
                </h3>

                <p
                  className={`mt-2 text-2xl font-bold ${color}`}
                >
                  {value}
                </p>

              </article>
            )
          )}

        </div>

      </section>
      <section className="mt-8 rounded-lg border border-border bg-surface p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-semibold">
            Recent Orders
          </h2>
          <Link
            to="/vendor/orders"
            className="text-sm font-medium text-primary"
          >
            View All
          </Link>
        </div>
        {orders.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            You don't have any orders yet.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-border">
            {orders
              .slice(0, 5)
              .map((order) => (
                <article
                  key={
                    order.orderItemId ||
                    order.id
                  }
                  className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0 text-sm"
                >

                  <div>

                    <h3 className="font-medium">
                      Order #
                      {order.orderNumber ||
                        order.orderId ||
                        order.id}
                    </h3>

                    <p className="mt-1 text-muted">
                      {order.productName ||
                        "N/A"}{" "}
                      · Qty:{" "}
                      {order.quantity ?? "N/A"}
                    </p>
                  </div>
                  <span className="rounded-full bg-page px-2.5 py-1 text-xs text-muted">
                    {order.status || "N/A"}
                  </span>
                </article>
              ))}
          </div>
        )}
      </section>
      <section className="mt-8">
        <h2 className="font-semibold">
          Quick Actions
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/vendor/products/add"
            className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
          >
            Add Product
          </Link>
          <Link
            to="/vendor/products"
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface"
          >
            Manage Products
          </Link>
          <Link
            to="/vendor/orders"
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface"
          >
            Manage Orders
          </Link>
          <Link
            to="/vendor/store"
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface"
          >
            Store Profile
          </Link>

        </div>

      </section>

    </main>
  );
};

export default VendorDashboardPage;
