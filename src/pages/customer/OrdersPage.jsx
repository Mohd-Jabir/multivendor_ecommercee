import { useState } from "react";
import { useOrders } from "../../hooks/useOrders.js";
import OrderCard from "../../components/order/OrderCard.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

const OrdersPage = () => {
  const [page, setPage] = useState(0);
  const size = 10;
  const { data, isLoading, isError, error, isFetching } = useOrders(page, size);
  if (isLoading) {
    return <Loading message="Loading orders..." />;
  }
  if (isError) {
    return (
      <ErrorMessage
        message={error?.response?.data?.message || "Failed to load orders."}
      />
    );
  }
  const orders = data?.content || [];
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold">My Orders</h1>
      <p className="mt-1 text-sm text-muted">
        View and track your marketplace purchases.
      </p>
      {isFetching && (
        <p className="mt-4 text-sm text-muted">Updating orders...</p>
      )}
      {orders.length === 0 ? (
        <div className="mt-8 rounded-lg border border-border bg-surface p-8 text-center">
          <h2 className="font-semibold">No orders yet</h2>
          <p className="mt-2 text-sm text-muted">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              page={data?.number ?? page}
              totalPages={data?.totalPages ?? 0}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default OrdersPage;
