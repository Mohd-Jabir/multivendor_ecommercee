import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  description: "",
  parentId: "",
};
const CategoryForm = ({
  category,
  categories = [],
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState(initialForm);
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        parentId: category.parentId ?? "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [category]);
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
      name: formData.name,
      description: formData.description,
      parentId: formData.parentId === "" ? null : Number(formData.parentId),
    });
  };
return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="text-sm font-medium">Category name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Category name"
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
    <div>
      <label className="text-sm font-medium">Parent category</label>
      <select
        name="parentId"
        value={formData.parentId}
        onChange={handleChange}
        className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
      >
        <option value="">No Parent Category</option>
        {categories
          .filter((item) => item.id !== category?.id)
          .map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
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
          : category
            ? "Update Category"
            : "Create Category"}
      </button>
    </div>
  </form>
);
}
export default CategoryForm;
