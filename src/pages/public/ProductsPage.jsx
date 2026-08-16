import { useState } from "react";
import { useProducts } from "../../hooks/useProducts.js";
import ProductFilters from "../../components/product/ProductFilters.jsx";
import ProductGrid from "../../components/product/ProductGrid.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

const ProductPage = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    categoryId: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt",
    direction: "desc",
  });

  const [page, setPage] = useState(0);
  const size = 12;

  const { data, isLoading, isFetching, isError, error } = useProducts({
    ...filters,
    page,
    size,
  });
  if (isLoading) {
    return <Loading message="Loading products..." />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="mt-1 text-sm text-muted">
          Explore products from trusted marketplace sellers.
        </p>
      </div>

      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        setPage={setPage}
      />

      {isFetching && (
        <p className="mt-5 text-sm text-muted">Updating products...</p>
      )}
      <div className="mt-6">
        <ProductGrid products={data?.content || []} />
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

export default ProductPage;
