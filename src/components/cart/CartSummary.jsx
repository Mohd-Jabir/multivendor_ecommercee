import { Link } from "react-router-dom";

const CartSummary = ({ subtotal, itemCount }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Cart Summary</h2>

      <div className="mt-4 space-y-3 text-sm">
        <p className="flex justify-between">
          <span className="text-muted">Items</span>
          <span>{itemCount}</span>
        </p>

        <p className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span>₹{subtotal ?? 0}</span>
        </p>

        <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
          <span>Total</span>
          <span className="text-primary">₹{subtotal ?? 0}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="mt-6 block rounded-md bg-primary px-4 py-3 text-center text-sm font-medium text-white hover:bg-primary/90"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;
