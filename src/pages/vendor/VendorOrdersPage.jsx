import { useState } from "react";

import {
  useVendorOrders,
  useUpdateVendorOrderItemStatus,
} from "../../hooks/useVendor.js";
import VendorOrderTable from "../../components/vendor/VendorOrderTable.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

const VendorOrdersPage = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, error } = useVendorOrders({
    page,
    size: 20,
  });
  const statusMutation = useUpdateVendorOrderItemStatus();
  if (isLoading) {
    return <Loading message="Loading orders..." />;
  }
  if (isError) {
    return (
      <ErrorMessage message={error?.message || "Unable to load orders."} />
    );
  }
  const orders = data?.content ?? [];
  const handleStatusChange = (orderItemId, status) => {
    statusMutation.mutate({
      orderItemId,
      status,
    });
  };
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <div>
        <h1 className="text-2xl font-bold">Vendor Orders</h1>
        <p className="mt-1 text-sm text-muted">
          Review customer orders and update their status.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-lg border border-border bg-surface p-8 text-center">
          <h2 className="font-semibold">No orders found</h2>
          <p className="mt-2 text-sm text-muted">
            New customer orders will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <VendorOrderTable
            orders={orders}
            onStatusChange={handleStatusChange}
            isUpdating={statusMutation.isPending}
          />
        </div>
      )}

      <div className="mt-8">
        <Pagination
          page={data?.number ?? page}
          totalPages={data?.totalPages ?? 0}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
};

export default VendorOrdersPage;
