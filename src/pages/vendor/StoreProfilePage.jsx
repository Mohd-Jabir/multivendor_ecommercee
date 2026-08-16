import {
  useCreateVendorStore,
  useUpdateVendorStore,
  useVendorStore,
} from "../../hooks/useVendor.js";

import StoreForm from "../../components/vendor/StoreForm.jsx";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";

const StoreProfilePage = () => {
  const { data: store, isLoading, isError, error } = useVendorStore();
  const createMutation = useCreateVendorStore();
  const updateMutation = useUpdateVendorStore();
  if (isLoading) {
    return <Loading message="Loading store..." />;
  }
  if (isError) {
    return <ErrorMessage message={error?.message || "Unable to load store."} />;
  }
  const handleSubmit = (formData) => {
    if (createMutation.isPending || updateMutation.isPending) {
      return;
    }
    if (store) {
      updateMutation.mutate(formData);
      return;
    }
    createMutation.mutate(formData);
  };
  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Store Profile</h1>
          <p className="mt-1 text-sm text-muted">
            Create or update your marketplace store.
          </p>
        </div>

        {store && (
          <span className="rounded-full bg-success/10 px-3 py-1.5 text-sm font-medium text-success">
            {store.status}
          </span>
        )}
      </header>
      <section className="mt-8 rounded-lg border border-border bg-surface p-5 sm:p-6">
        <StoreForm
          store={store}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </section>
    </main>
  );
};

export default StoreProfilePage;
