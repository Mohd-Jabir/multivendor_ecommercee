import { Link, useParams } from "react-router-dom";
import { useOrder, useCancelOrder } from "../../hooks/useOrders.js";
import OrderStatusBadge from "../../components/order/OrderStatusBadge.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import Loading from "../../components/common/Loading.jsx";
import NotFound from "../../components/common/NotFound.jsx";
const OrderDetailPage = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError, error } = useOrder(id);
  const cancelMutation = useCancelOrder();
  if (isLoading) {
    return <Loading message="Loading order..." />;
  }
  if (isError) {
    return (
      <ErrorMessage
        message={error?.response?.data?.message || "Failed to load order."}
      />
    );
  }
  if (!order) {
    return <NotFound message="Order not found." />;
  }
  const canCancel = order.status === "PLACED" || order.status === "CONFIRMED";
  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) {
      return;
    }
    cancelMutation.mutate(order.id);
  };
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <Link
        to="/orders"
        className="text-sm font-medium text-primary hover:text-primary/80"
      >
        ← Back to Orders
      </Link>
      <header className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Order #{order.orderNumber || order.id}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {order.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="rounded-lg border border-border bg-surface p-5">
            <h2 className="font-semibold">Items</h2>

            <div className="mt-4 divide-y divide-border">
              {order.items?.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium">{item.productName}</h3>
                      <p className="mt-1 text-sm text-muted">
                        Quantity: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ₹{item.price * item.quantity}
                      </p>
                      <div className="mt-2">
                        <OrderStatusBadge status={item.status} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-5">
            <h2 className="font-semibold">Shipping Address</h2>
            {order.shippingAddress ? (
              <div className="mt-3 text-sm leading-6 text-muted">
                <p className="font-medium text-foreground">
                  {order.shippingAddress.fullName}
                </p>
                <p>{order.shippingAddress.addressLine}</p>
                {order.shippingAddress.landmark && (
                  <p>{order.shippingAddress.landmark}</p>
                )}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <p>{order.shippingAddress.pincode}</p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted">
                Shipping address unavailable.
              </p>
            )}
          </section>
        </div>
        <aside className="space-y-6">
          <section className="rounded-lg border border-border bg-surface p-5">
            <h2 className="font-semibold">Order Information</h2>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="text-muted">Order ID: </span>
                {order.id}
              </p>
              <p>
                <span className="text-muted">Total: </span>
                <strong>₹{order.totalAmount ?? 0}</strong>
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-5">
            <h2 className="font-semibold">Payment</h2>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="text-muted">Method: </span>
                {order.payment?.paymentMethod || order.paymentMethod || "N/A"}
              </p>
              <p>
                <span className="text-muted">Status: </span>
                {order.payment?.status || "N/A"}
              </p>
              <p>
                <span className="text-muted">Amount: </span>₹
                {order.payment?.amount ?? order.totalAmount ?? 0}
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-surface p-5">
            <h2 className="font-semibold">Shipping / Tracking</h2>
            <p className="mt-3 text-sm text-muted">
              {order.shipment
                ? `Tracking Number: ${order.shipment.trackingNumber}`
                : "Shipping and tracking information is not available yet."}
            </p>
          </section>

          {canCancel && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={cancelMutation.isPending}
              className="w-full rounded-md border border-danger/30 px-4 py-3 text-sm font-medium text-danger hover:bg-danger/5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cancelMutation.isPending ? "Cancelling..." : "Cancel Order"}
            </button>
          )}

          {cancelMutation.isError && (
            <p className="text-sm text-danger">
              {cancelMutation.error?.response?.data?.message ||
                "Unable to cancel order."}
            </p>
          )}
        </aside>
      </div>
    </main>
  );
};

export default OrderDetailPage;
