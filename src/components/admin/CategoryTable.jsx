const CategoryTable = ({ categories, onEdit, onDelete, isDeleting }) => {
  if (!categories?.length) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="text-sm text-muted">No categories found.</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full min-w-[650px] text-left text-sm">
        <thead className="border-b border-border bg-page text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Description</th>
            <th className="px-4 py-3 font-medium">Parent</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-page/60">
              <td className="px-4 py-3 font-medium">{category.name}</td>
              <td className="max-w-sm truncate px-4 py-3 text-muted">
                {category.description || "—"}
              </td>
              <td className="px-4 py-3 text-muted">
                {category.parentName || "Top Level"}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => onEdit(category)}
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(category.id)}
                    disabled={isDeleting}
                    className="font-medium text-danger hover:text-danger/80 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
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
export default CategoryTable;
