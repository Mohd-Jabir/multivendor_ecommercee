import CartItem from "../../components/cart/CartItem.jsx";
import CartSummary from "../../components/cart/CartSummary.jsx";

import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
import NotFound from "../../components/common/NotFound.jsx";

import {
  useCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
} from "../../hooks/useCart";

const CartPage = () => {
  const { data: cart, isLoading, isError, error } = useCart();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();
  const clearMutation = useClearCart();
  const handleUpdate = (cartItemId, data) => {
    updateMutation.mutate({
      cartItemId,
      data,
    });
  };
  const handleRemove = (cartItemId) => {
    removeMutation.mutate(cartItemId);
  };
  const handleClear = () => {
    clearMutation.mutate();
  };
  if (isLoading) {
    return <Loading message="Loading cart..." />;
  }
  if (isError) {
    return <ErrorMessage message={error?.message || "Failed to load cart."} />;
  }
  if (!cart) {
    return <NotFound message="Cart not found." />;
  }
  const items = cart.items || [];
  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted">
          Add products to your cart to continue shopping.
        </p>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        <button
          type="button"
          onClick={handleClear}
          disabled={clearMutation.isPending}
          className="rounded-md border border-danger/30 px-4 py-2 text-sm font-medium text-danger hover:bg-danger/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {clearMutation.isPending ? "Clearing..." : "Clear Cart"}
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
              isUpdating={updateMutation.isPending}
              isRemoving={removeMutation.isPending}
            />
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-border bg-surface p-5">
          <CartSummary subtotal={cart.subtotal} itemCount={cart.itemCount} />
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
