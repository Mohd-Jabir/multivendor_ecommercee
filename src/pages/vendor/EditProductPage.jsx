import { useNavigate, useParams } from "react-router-dom";
import {
  useVendorProducts,
  useUpdateVendorProduct,
} from "../../hooks/useVendor.js";
import { useCategories } from "../../hooks/useCategories.js";
import ProductForm from "../../components/vendor/ProductForm.jsx";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import NotFound from "../../components/common/NotFound.jsx";
const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useVendorProducts(productId);
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useCategories(false);
  const updateMutation = useUpdateVendorProduct();
  if (isProductLoading || isCategoriesLoading) {
    return <Loading message="Loading product and categories..." />;
  }
  if (isProductError) {
    return (
      <ErrorMessage
        message={
          productError?.message ||
          "Unable to load product."
        }
      />
    );
  }
  if (isCategoriesError) {
    return (
      <ErrorMessage
        message={
          categoriesError?.message ||
          "Unable to load categories."
        }
      />
    );
  }
  if (!product) {
    return <NotFound message="Product not found." />;
  }
  const handleSubmit = (productData) => {
    updateMutation.mutate(
      {
        productId,
        productData,
      },
      {
        onSuccess: () => {
          navigate("/vendor/products");
        },
      }
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
          categories={categories}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
        />
      </section>
      {updateMutation.isError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">
            {updateMutation.error?.response?.data?.message ||
              updateMutation.error?.message ||
              "Unable to update product."}
          </p>
        </div>
      )}
    </main>
  );
};

export default EditProductPage;
