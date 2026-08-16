const AddressCard = ({ address, onEdit, onDelete, isDeleting }) => {
  return (
    <article className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold">{address.fullName}</h3>
        {address.isDefault && (
          <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
            Default
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1 text-sm leading-6 text-muted">
        <p>{address.phone}</p>
        <p>{address.addressLine}</p>
        {address.landmark && <p>Landmark: {address.landmark}</p>}
        <p>{address.city}, {address.state}</p>
        <p>{address.pincode}, {address.country}</p>
      </div>

      <div className="mt-5 flex gap-4">
        <button
          type="button"
          onClick={() => onEdit(address)}
          className="text-sm font-medium text-primary hover:text-primary/80"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(address.id)}
          disabled={isDeleting}
          className="text-sm font-medium text-danger hover:text-danger/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
};
export default AddressCard