import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useVendorProducts,
  useDeleteVendorProduct,
} from "../../hooks/useVendor.js";
import VendorProductTable from "../../components/vendor/VendorProductTable.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

const VendorProductsPage = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, error } = useVendorProducts({
    page,
    size: 20,
  });
  const deleteMutation = useDeleteVendorProduct();
  if (isLoading) {
    return <Loading message="Loading products..." />;
  }
  if (isError) {
    return (
      <ErrorMessage message={error?.message || "Unable to load products."} />
    );
  }
  const products = data?.content ?? [];
  const handleDelete = (productId) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) {
      return;
    }
    deleteMutation.mutate(productId);
  };
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Products</h1>
          <p className="mt-1 text-sm text-muted">
            Manage your store products and inventory.
          </p>
        </div>

        <Link
          to="/vendor/products/add"
          className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="mt-8 rounded-lg border border-border bg-surface p-8 text-center">
          <h2 className="font-semibold">No products found</h2>
          <p className="mt-2 text-sm text-muted">
            Add your first product to start selling.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <VendorProductTable
            products={products}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending}
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
export default VendorProductsPage;
