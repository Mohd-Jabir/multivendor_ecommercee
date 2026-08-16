import { useEffect, useState } from "react";

const initialForm = {
  fullName: "",
  phone: "",
  addressLine: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  isDefault: false,
};
const AddressForm = ({
  address,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState(initialForm);
  useEffect(() => {
    if (address) {
      setFormData({
        fullName: address.fullName || "",
        phone: address.phone || "",
        addressLine: address.addressLine || "",
        landmark: address.landmark || "",
        city: address.city || "",
        state: address.state || "",
        pincode: address.pincode || "",
        country: address.country || "",
        isDefault: address.isDefault || false,
      });
    } else {
      setFormData(initialForm);
    }
  }, [address]);
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };
  return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full name"
        required
        className="rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
        className="rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
    <input
      name="addressLine"
      value={formData.addressLine}
      onChange={handleChange}
      placeholder="Address"
      required
      className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
    />
    <input
      name="landmark"
      value={formData.landmark}
      onChange={handleChange}
      placeholder="Landmark (optional)"
      className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
    />
    <div className="grid gap-4 sm:grid-cols-2">
      <input
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        required
        className="rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
      <input
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        required
        className="rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
      <input
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        placeholder="Pincode"
        required
        className="rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
      <input
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Country"
        required
        className="rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        name="isDefault"
        checked={formData.isDefault}
        onChange={handleChange}
        className="accent-primary"
      />
      Set as default address
    </label>
    <div className="flex justify-end gap-3 pt-2">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-page"
        >
          Cancel
        </button>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? "Saving..."
          : address
            ? "Update Address"
            : "Add Address"}
      </button>
    </div>
  </form>
);
};

export default AddressForm;
