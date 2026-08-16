import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";
const OrderCard = ({ order }) => {
  return (
    <article className="rounded-lg border border-border bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">
            Order #{order.orderNumber || order.id}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-5 grid gap-2 text-sm text-muted sm:grid-cols-3">
        <p>
          Total:{" "}
          <span className="font-medium text-foreground">
            ₹{order.totalAmount ?? 0}
          </span>
        </p>
        <p>
          Payment:{" "}
          {order.payment?.paymentMethod || order.paymentMethod || "N/A"}
        </p>
        <p>Payment Status: {order.payment?.status || "N/A"}</p>
      </div>

      <Link
        to={`/orders/${order.id}`}
        className="mt-5 inline-block text-sm font-medium text-primary hover:text-primary/80"
      >
        View Order →
      </Link>
    </article>
  );
};
export default OrderCard;