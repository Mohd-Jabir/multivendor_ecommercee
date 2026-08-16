import { useNavigate } from "react-router-dom";
import {
  useCreateVendorProduct,
  useVendorStore,
} from "../../hooks/useVendor.js";
import ProductForm from "../../components/vendor/ProductForm.jsx";
const AddProductPage = () => {
  const navigate = useNavigate();
  const {
    data: store,
    isLoading: isStoreLoading,
    isError: isStoreError,
    error: storeError,
  } = useVendorStore();
  const createMutation = useCreateVendorProduct();
  const handleSubmit = (productData) => {
    createMutation.mutate(productData, {
      onSuccess: () => {
        navigate("/vendor/products");
      },
    });
  };
  if (isStoreLoading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold">Add Product</h1>

        <p className="mt-3 text-sm text-muted">
          Checking your store status...
        </p>
      </main>
    );
  }
  if (isStoreError) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold">Add Product</h1>

        <section className="mt-8 rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold">
            Unable to check store
          </h2>

          <p className="mt-2 text-sm text-muted">
            {storeError?.message ||
              "Unable to determine your store status."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/vendor/store")}
            className="mt-5 rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface"
          >
            Manage Store
          </button>
        </section>
      </main>
    );
  }
  if (!store) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <section className="mt-8 rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold">
            Create your store first
          </h2>
          <p className="mt-2 text-sm text-muted">
            You need to create a store before you can add products.
          </p>
          <button
            type="button"
            onClick={() => navigate("/vendor/store")}
            className="mt-5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
          >
            Create Store
          </button>
        </section>
      </main>
    );
  }
  if (store.status === "PENDING") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold">Add Product</h1>

        <section className="mt-8 rounded-lg border border-border bg-surface p-6">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-yellow-500" />

            <h2 className="text-lg font-semibold">
              Store approval pending
            </h2>
          </div>
          <p className="mt-3 text-sm text-muted">
            Your store has been created successfully, but it is
            waiting for administrator approval.
          </p>

          <p className="mt-2 text-sm text-muted">
            You will be able to add products after your store is
            approved.
          </p>
          <button
            type="button"
            onClick={() => navigate("/vendor/store")}
            className="mt-5 rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface"
          >
            View Store
          </button>
        </section>
      </main>
    );
  }
  if (store.status === "REJECTED") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold">Add Product</h1>

        <section className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-700">
            Store approval rejected
          </h2>
          <p className="mt-2 text-sm text-red-600">
            Your store has not been approved by the administrator.
            You cannot add products at this time.
          </p>
          <button
            type="button"
            onClick={() => navigate("/vendor/store")}
            className="mt-5 rounded-md border border-red-300 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            View Store
          </button>
        </section>
      </main>
    );
  }
  if (store.status !== "ACTIVE") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <section className="mt-8 rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold">
            Store is not active
          </h2>
          <p className="mt-2 text-sm text-muted">
            Your store is currently in the{" "}
            <strong>{store.status || "UNKNOWN"}</strong> status.
            Products can only be added when your store is active.
          </p>

          <button
            type="button"
            onClick={() => navigate("/vendor/store")}
            className="mt-5 rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface"
          >
            Manage Store
          </button>
        </section>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <div>
        <h1 className="text-2xl font-bold">Add Product</h1>

        <p className="mt-1 text-sm text-muted">
          Add a new product to your store.
        </p>
      </div>

      <section className="mt-8 rounded-lg border border-border bg-surface p-5 sm:p-6">
        <ProductForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </section>
      {createMutation.isError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">
            {createMutation.error?.response?.data?.message ||
              createMutation.error?.message ||
              "Unable to create product."}
          </p>
        </div>
      )}
    </main>
  );
};

export default AddProductPage;
