import { useState } from "react";
import { useAdminOrders } from "../../hooks/useAdmin.js";
import AdminOrderTable from "../../components/admin/AdminOrderTable.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
const AdminOrdersPage = () => {
  const [page, setPage] = useState(0);
  const size = 20;
  const { data, isLoading, isError, isFetching, error } = useAdminOrders({
    page,
    size,
  });
  if (isLoading) {
    return <Loading message="Loading orders..." />;
  }
  if (isError) {
    return (
      <ErrorMessage message={error?.message || "Failed to load orders."} />
    );
  }
  const orders = data?.content ?? [];
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <div>
        <h1 className="text-2xl font-bold">All Orders</h1>
        <p className="mt-1 text-sm text-muted">
          Review marketplace orders and payment details.
        </p>
      </div>
      {isFetching && (
        <p className="mt-4 text-sm text-muted">Updating orders...</p>
      )}
      <div className="mt-8">
        {orders.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface p-8 text-center">
            <p className="text-sm text-muted">No orders found.</p>
          </div>
        ) : (
          <AdminOrderTable orders={orders} />
        )}
      </div>
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

export default AdminOrdersPage;
