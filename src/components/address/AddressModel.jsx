import AddressForm from "./AddressForm";

const AddressModal = ({
  isOpen,
  address,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="address-modal-title"
    >
      <div className="max-h-full w-full max-w-xl overflow-y-auto rounded-lg bg-surface p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id="address-modal-title" className="text-xl font-semibold">
            {address ? "Edit Address" : "Add Address"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-muted hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <AddressForm
          address={address}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AddressModal;
