import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProduct } from "../../hooks/useProducts.js";
import { useAddCartItem } from "../../hooks/useCart.js";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import NotFound from "../../components/common/NotFound.jsx";
const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProduct(id);
  const addCartMutation = useAddCartItem();
  const canAddToCart =
    user?.role === "CUSTOMER" || user?.role === "ADMIN";

  const handleAddToCart = () => {
    if (!product) {
      return;
    }
    addCartMutation.mutate({
      productId: product.id,
      quantity: 1,
    });
  };
  if (isLoading) {
    return <Loading message="Loading product..." />;
  }
  if (isError) {
    return (
      <ErrorMessage
        message={
          error?.response?.data?.message ||
          error?.message ||
          "Unable to load product."
        }
      />
    );
  }
  if (!product) {
    return <NotFound message="Product not found." />;
  }
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="aspect-square w-full object-contain"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center text-muted">
              No image available
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-muted">
            {product.vendorStoreName || "Marketplace Seller"}
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            {product.name}
          </h1>
          <p className="mt-4 leading-7 text-muted">
            {product.description || "No description available."}
          </p>
          <p className="mt-6 text-2xl font-bold text-primary">
            ₹{product.price}
          </p>
          <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
            <p>
              <span className="text-muted">SKU: </span>
              {product.sku || "—"}
            </p>
            <p>
              <span className="text-muted">Stock: </span>
              <span
                className={
                  product.stock > 0
                    ? "text-success"
                    : "text-danger"
                }
              >
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </span>
            </p>
            <p>
              <span className="text-muted">Vendor: </span>
              {product.vendorStoreName || "—"}
            </p>
          </div>
          {canAddToCart && (
            <div className="mt-8">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={
                  product.stock <= 0 ||
                  addCartMutation.isPending
                }
                className="w-full rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {addCartMutation.isPending
                  ? "Adding to Cart..."
                  : product.stock > 0
                    ? "Add to Cart"
                    : "Out of Stock"}
              </button>
              {addCartMutation.isError && (
                <p className="mt-3 text-sm text-danger">
                  {addCartMutation.error?.response?.data?.message ||
                    addCartMutation.error?.message ||
                    "Unable to add product to cart."}
                </p>
              )}
              {addCartMutation.isSuccess && (
                <p className="mt-3 text-sm text-success">
                  Product added to cart successfully.
                </p>
              )}

            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
