import { useState } from "react";

import {
  useAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
} from "../../hooks/useAddresses.js";

import AddressCard from "../../components/address/AddressCard.jsx";
import AddressModal from "../../components/address/AddressModel.jsx";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
const AddressesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { data, isLoading, isError, error } = useAddresses();
  const createMutation = useCreateAddress();
  const updateMutation = useUpdateAddress();
  const deleteMutation = useDeleteAddress();

  if (isLoading) {
    return <Loading message="Loading addresses..." />;
  }
  if (isError) {
    return (
      <ErrorMessage message={error?.message || "Failed to load addresses."} />
    );
  }
  const addresses = data?.data ?? data ?? [];
  const handleAdd = () => {
    setSelectedAddress(null);
    setIsModalOpen(true);
  };
  const handleEdit = (address) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  const handleSubmit = (addressData) => {
    if (selectedAddress) {
      updateMutation.mutate(
        {
          id: selectedAddress.id,
          addressData,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedAddress(null);
          },
        },
      );

      return;
    }
    createMutation.mutate(addressData, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
  };
  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Addresses</h1>
          <p className="mt-1 text-sm text-muted">
            Manage your saved delivery addresses.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
        >
          Add Address
        </button>
      </header>

      {addresses.length === 0 ? (
        <div className="mt-8 rounded-lg border border-border bg-surface p-8 text-center">
          <h2 className="font-semibold">No addresses found</h2>
          <p className="mt-2 text-sm text-muted">
            Add an address to make checkout faster.
          </p>
        </div>
      ) : (
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </section>
      )}

      <AddressModal
        isOpen={isModalOpen}
        address={selectedAddress}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </main>
  );
};

export default AddressesPage;
