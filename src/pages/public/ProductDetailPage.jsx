import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts.js";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import NotFound from "../../components/common/NotFound.jsx";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError, error } = useProduct(id);
  if (isLoading) {
    return <Loading message="Loading product..." />;
  }
  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }
  if (!product) {
    return <NotFound message="Product not found." />;
  }
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="aspect-square w-full object-contain"
          />
        </div>
        <div>
          <p className="text-sm text-muted">{product.vendorStoreName}</p>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 leading-7 text-muted">{product.description}</p>
          <p className="mt-6 text-2xl font-bold text-primary">
            ₹{product.price}
          </p>
          <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
            <p>
              <span className="text-muted">SKU: </span>
              {product.sku}
            </p>
            <p>
              <span className="text-muted">Stock: </span>
              <span
                className={product.stock > 0 ? "text-success" : "text-danger"}
              >
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </span>
            </p>
            <p>
              <span className="text-muted">Vendor: </span>
              {product.vendorStoreName}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
