const CheckoutSummary = ({ cart }) => {
  if (!cart) {
    return <p className="text-sm text-muted">Loading cart...</p>;
  }
  const items = cart.items || [];
  return (
    <section>
      <h2 className="text-lg font-semibold">Order Summary</h2>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-muted">Your cart is empty.</p>
      ) : (
        <div className="mt-4 divide-y divide-border">
          {items.map((item) => (
            <div key={item.cartItemId} className="py-3 first:pt-0">
              <div className="flex items-start justify-between gap-4 text-sm">
                <div>
                  <h3 className="font-medium">{item.productName}</h3>
                  <p className="mt-1 text-muted">
                    {item.quantity} × ₹{item.price}
                  </p>
                </div>

                <strong>₹{item.price * item.quantity}</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <strong>Total</strong>
        <strong className="text-lg text-primary">
          ₹{cart.totalAmount ?? cart.subtotal ?? 0}
        </strong>
      </div>
    </section>
  );
};

export default CheckoutSummary;
