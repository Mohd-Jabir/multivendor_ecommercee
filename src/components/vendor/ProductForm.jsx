import { useEffect, useState } from "react";
const initialForm = {
  name: "",
  description: "",
  categoryId: "",
  price: "",
  sku: "",
  stock: "",
  imageUrl: "",
};
const ProductForm = ({ product, categories = [], onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState(initialForm);
  console.log("CATEGORIES RECEIVED:", categories);
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        categoryId: product.categoryId || "",
        price: product.price ?? "",
        sku: product.sku || "",
        stock: product.stock ?? "",
        imageUrl: product.imageUrl || "",
      });
    }
  }, [product]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...formData,
      categoryId: Number(formData.categoryId),
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Product name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product name"
          required
          className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="mt-2 w-full resize-none rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm"
          >
            <option value="">Select category</option>
            <option value="1">Electronics TEST</option>
            <option value="2">Clothing TEST</option>
            <option value="3">Books TEST</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Price</label>
          <input
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium">SKU</label>
          <input
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="SKU"
            className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Stock</label>
          <input
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
            className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Image URL</label>
        <input
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/product.jpg"
          className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? "Saving..."
          : product
            ? "Update Product"
            : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
