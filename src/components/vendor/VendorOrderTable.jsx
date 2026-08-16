import OrderStatusBadge from "../order/OrderStatusBadge.jsx";

const statuses = [
  "PLACED",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURN_REQUESTED",
  "RETURNED",
];

const VendorOrderTable = ({ orders, onStatusChange, isUpdating }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="border-b border-border bg-page text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Order</th>
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Quantity</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Update</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {orders.map((item) => (
            <tr key={item.orderItemId} className="hover:bg-page/60">
              <td className="px-4 py-3 font-medium">
                #{item.orderNumber || item.orderId}
              </td>
              <td className="px-4 py-3">{item.productName}</td>
              <td className="px-4 py-3">{item.quantity}</td>
              <td className="px-4 py-3">₹{item.price}</td>
              <td className="px-4 py-3">
                <OrderStatusBadge status={item.status} />
              </td>
              <td className="px-4 py-3">
                <select
                  value={item.status}
                  onChange={(event) =>
                    onStatusChange(item.orderItemId, event.target.value)
                  }
                  disabled={isUpdating}
                  className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorOrderTable;
