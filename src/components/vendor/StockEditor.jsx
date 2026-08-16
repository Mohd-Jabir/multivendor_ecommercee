import { useState } from "react";
import { useUpdateVendorProductStock } from "../../hooks/useVendor.js";
const StockEditor = ({ productId, stock }) => {
  const [value, setValue] = useState(stock);
  const mutation = useUpdateVendorProductStock();
  const handleSave = () => {
    mutation.mutate({
      productId,
      stock: Number(value),
    });
  };
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min="0"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label="Product stock"
        className="w-20 rounded-md border border-border px-2 py-2 text-sm outline-none focus:border-primary"
      />
      <button
        type="button"
        onClick={handleSave}
        disabled={mutation.isPending}
        className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-page disabled:cursor-not-allowed disabled:opacity-60"
      >
        {mutation.isPending ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default StockEditor;
