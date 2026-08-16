const CartItem = ({ item, onUpdate, onRemove, isUpdating, isRemoving }) => {
  return (
    <article className="flex gap-4 rounded-lg border border-border bg-surface p-4">
      <img
        src={item.imageUrl}
        alt={item.productName}
        className="h-20 w-20 rounded-md border border-border object-contain sm:h-24 sm:w-24"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium">{item.productName}</h3>
        <p className="mt-1 text-sm font-semibold text-primary">₹{item.price}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center rounded-md border border-border">
            <button
              type="button"
              onClick={() => onUpdate(item.id, { quantity: item.quantity - 1 })}
              disabled={item.quantity <= 1 || isUpdating}
              className="h-8 w-8 text-lg hover:bg-page disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => onUpdate(item.id, { quantity: item.quantity + 1 })}
              disabled={isUpdating}
              className="h-8 w-8 text-lg hover:bg-page disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            disabled={isRemoving}
            className="text-sm font-medium text-danger hover:text-danger/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
