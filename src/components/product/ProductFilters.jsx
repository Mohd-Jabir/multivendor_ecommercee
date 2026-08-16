import { useCategories } from "../../hooks/useCategories.js";
const ProductFilters = ({ filters, setFilters, setPage }) => {
  const { data: categories = [] } = useCategories();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
    setPage(0);
  };
  return (
    <div className="grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-5">
      <input
        name="keyword"
        placeholder="Search products..."
        value={filters.keyword}
        onChange={handleChange}
        className="rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary lg:col-span-2"
      />
      <select
        name="categoryId"
        value={filters.categoryId}
        onChange={handleChange}
        className="rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
      >
        <option value="">All Categories</option>
        {Array.isArray(categories) &&
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>
      <input
        name="minPrice"
        type="number"
        min="0"
        placeholder="Min price"
        value={filters.minPrice}
        onChange={handleChange}
        className="rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
      <input
        name="maxPrice"
        type="number"
        min="0"
        placeholder="Max price"
        value={filters.maxPrice}
        onChange={handleChange}
        className="rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={handleChange}
        className="rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
      >
        <option value="createdAt">Newest</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

export default ProductFilters;
