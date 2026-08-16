import { useState } from "react";
import { useCategories } from "../../hooks/useCategories.js";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import {
  useCreateAdminCategory,
  useUpdateAdminCategory,
  useDeleteAdminCategory,
} from "../../hooks/useAdmin.js";
import CategoryForm from "../../components/admin/CategoryForm.jsx";
import CategoryTable from "../../components/admin/CategoryTable.jsx";
const CategoryManagementPage = () => {
  const [editingCategory, setEditingCategory] = useState(null);
  const { data: categories, isLoading, isError } = useCategories(false);
  const createMutation = useCreateAdminCategory();
  const updateMutation = useUpdateAdminCategory();
  const deleteMutation = useDeleteAdminCategory();
  if (isLoading) {
    return <Loading message="Loading categories..." />;
  }
  if (isError) {
    return <ErrorMessage message="Failed to load categories." />;
  }
  const handleSubmit = (categoryData) => {
    if (editingCategory) {
      updateMutation.mutate(
        {
          id: editingCategory.id,
          categoryData,
        },
        {
          onSuccess: () => {
            setEditingCategory(null);
          },
        },
      );
      return;
    }
    createMutation.mutate(categoryData);
  };
  const handleDelete = (id) => {
    const confirmed = window.confirm("Delete this category?");
    if (!confirmed) {
      return;
    }
    deleteMutation.mutate(id);
  };
  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <div>
        <h1 className="text-2xl font-bold">Category Management</h1>
        <p className="mt-1 text-sm text-muted">
          Create, edit, and organize marketplace categories.
        </p>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[360px_1fr]">
        <section className="h-fit rounded-lg border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold">
            {editingCategory ? "Edit Category" : "Create Category"}
          </h2>
          <div className="mt-5">
            <CategoryForm
              category={editingCategory}
              categories={categories || []}
              onSubmit={handleSubmit}
              onCancel={() => setEditingCategory(null)}
              isSubmitting={isSubmitting}
            />
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Categories</h2>
          <div className="mt-5">
            <CategoryTable
              categories={categories || []}
              onEdit={setEditingCategory}
              onDelete={handleDelete}
              isDeleting={deleteMutation.isPending}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default CategoryManagementPage;
