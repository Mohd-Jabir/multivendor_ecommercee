import { useNavigate, useParams } from "react-router-dom";

import {
  useVendorProducts,
  useUpdateVendorProduct,
} from "../../hooks/useVendor.js";
import ProductForm from "../../components/vendor/ProductForm.jsx";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import NotFound from "../../components/common/NotFound.jsx";

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError, error } = useVendorProducts(productId);
  const updateMutation = useUpdateVendorProduct();
  if (isLoading) {
    return <Loading message="Loading product..." />;
  }
  if (isError) {
    return (
      <ErrorMessage message={error?.message || "Unable to load product."} />
    );
  }
  if (!product) {
    return <NotFound message="Product not found." />;
  }
  const handleSubmit = (productData) => {
    updateMutation.mutate(
      {
        productId: productId,
        productData,
      },
      {
        onSuccess: () => {
          navigate("/vendor/products");
        },
      },
    );
  };
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <div>
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="mt-1 text-sm text-muted">
          Update your product information and inventory.
        </p>
      </div>

      <section className="mt-8 rounded-lg border border-border bg-surface p-5 sm:p-6">
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
        />
      </section>
    </main>
  );
};

export default EditProductPage;
