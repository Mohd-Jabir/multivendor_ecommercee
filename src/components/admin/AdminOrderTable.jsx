const AdminOrderTable = ({ orders }) => {
  if (!orders?.length) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="text-sm text-muted">No orders found.</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full min-w-[750px] text-left text-sm">
        <thead className="border-b border-border bg-page text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Order</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Payment</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-page/60">
              <td className="px-4 py-3 font-medium">
                #{order.orderNumber || order.id}
              </td>
              <td className="px-4 py-3">
                {order.customerName || order.customer?.name || "N/A"}
              </td>
              <td className="px-4 py-3 font-medium">
                ₹{order.totalAmount ?? 0}
              </td>
              <td className="px-4 py-3">
                {order.payment?.paymentMethod || order.paymentMethod || "N/A"}
              </td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-page px-2.5 py-1 text-xs text-muted">
                  {order.status || "N/A"}
                </span>
              </td>
              <td className="px-4 py-3 text-muted">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminOrderTable;
