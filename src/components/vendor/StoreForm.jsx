import { useEffect, useState } from "react";

const initialForm = {
  storeName: "",
  storeDescription: "",
  gstNumber: "",
  logoUrl: "",
};
const StoreForm = ({ store, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState(initialForm);
  useEffect(() => {
    if (store) {
      setFormData({
        storeName: store.storeName || "",
        storeDescription: store.storeDescription || "",
        gstNumber: store.gstNumber || "",
        logoUrl: store.logoUrl || "",
      });
    }
  }, [store]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Store name</label>
        <input
          name="storeName"
          value={formData.storeName}
          onChange={handleChange}
          placeholder="Store name"
          required
          className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Store description</label>
        <textarea
          name="storeDescription"
          value={formData.storeDescription}
          onChange={handleChange}
          placeholder="Tell customers about your store"
          rows={4}
          className="mt-2 w-full resize-none rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="text-sm font-medium">GST number</label>
        <input
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}
          placeholder="GST number"
          className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Logo URL</label>
        <input
          name="logoUrl"
          type="url"
          value={formData.logoUrl}
          onChange={handleChange}
          placeholder="https://example.com/logo.png"
          className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : store ? "Update Store" : "Create Store"}
      </button>
    </form>
  );
};

export default StoreForm;
