import { Link } from "react-router-dom";
import StockEditor from "./StockEditor.jsx";
const VendorProductTable = ({ products, onDelete, isDeleting }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-border bg-page text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">SKU</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Stock</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-page/60">
              <td className="px-4 py-3 font-medium">{product.name}</td>
              <td className="px-4 py-3 text-muted">{product.sku || "—"}</td>
              <td className="px-4 py-3">₹{product.price}</td>
              <td className="px-4 py-3">
                <StockEditor productId={product.id} stock={product.stock} />
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    product.active
                      ? "bg-success/10 text-success"
                      : "bg-muted/10 text-muted"
                  }`}
                >
                  {product.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-4">
                  <Link
                    to={`/vendor/products/${product.id}/edit`}
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(product.id)}
                    disabled={isDeleting}
                    className="font-medium text-danger hover:text-danger/80 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorProductTable;
