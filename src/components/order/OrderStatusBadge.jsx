const OrderStatusBadge = ({ status }) => {
  const labels = {
    PLACED: "Placed",
    CONFIRMED: "Confirmed",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
    RETURN_REQUESTED: "Return Requested",
    RETURNED: "Returned",
  };

  const colors = {
    PLACED: "bg-primary/10 text-primary",
    CONFIRMED: "bg-primary/10 text-primary",
    SHIPPED: "bg-primary/10 text-primary",
    DELIVERED: "bg-success/10 text-success",
    CANCELLED: "bg-danger/10 text-danger",
    RETURN_REQUESTED: "bg-danger/10 text-danger",
    RETURNED: "bg-muted/10 text-muted",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        colors[status] || "bg-page text-muted"
      }`}
    >
      {labels[status] || status}
    </span>
  );
};

export default OrderStatusBadge;
