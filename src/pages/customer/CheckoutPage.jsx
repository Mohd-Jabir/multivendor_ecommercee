import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAddresses } from "../../hooks/useAddresses";
import { useCreateOrder } from "../../hooks/useOrders";
import { useInitiateCCAvenuePayment } from "../../hooks/usePayments";
import CheckoutSummary from "../../components/order/CheckoutSummary";
import PaymentMethodSelector from "../../components/order/PaymentMethodSelector";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [addressId, setAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const { data: cart, isLoading: cartLoading } = useCart();
  const { data: addresses, isLoading: addressesLoading } = useAddresses();
  const createOrderMutation = useCreateOrder();
  const initiatePaymentMutation = useInitiateCCAvenuePayment();
  const submitCCAvenueForm = ({ transactionUrl, encRequest, accessCode }) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = transactionUrl;
    const encRequestInput = document.createElement("input");
    encRequestInput.type = "hidden";
    encRequestInput.name = "encRequest";
    encRequestInput.value = encRequest;
    const accessCodeInput = document.createElement("input");
    accessCodeInput.type = "hidden";
    accessCodeInput.name = "access_code";
    accessCodeInput.value = accessCode;
    form.appendChild(encRequestInput);
    form.appendChild(accessCodeInput);
    document.body.appendChild(form);
    form.submit();
  };

  const handleCheckout = () => {
    if (!addressId) {
      alert("Please select an address.");
      return;
    }
    if (!cart?.items?.length) {
      alert("Your cart is empty.");
      return;
    }
    createOrderMutation.mutate(
      {
        addressId,
        paymentMethod,
      },
      {
        onSuccess: async (order) => {
          if (paymentMethod === "COD") {
            navigate(`/orders/${order.id}`);

            return;
          }
          try {
            const payment = await initiatePaymentMutation.mutateAsync(order.id);

            submitCCAvenueForm(payment);
          } catch (error) {
            console.error(error);
          }
        },
      },
    );
  };
  if (cartLoading || addressesLoading) {
    return (
      <div className="py-12 text-center text-sm text-muted">
        Loading checkout...
      </div>
    );
  }
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="mt-1 text-sm text-muted">
        Review your order and select a delivery address.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-lg font-semibold">Select Address</h2>

            <div className="mt-4 space-y-3">
              {addresses?.map((address) => (
                <label
                  key={address.id}
                  className={`flex cursor-pointer gap-3 rounded-md border p-4 text-sm ${
                    addressId === address.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-page"
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={address.id}
                    checked={addressId === address.id}
                    onChange={() => setAddressId(address.id)}
                    className="mt-1 accent-primary"
                  />
                  <span className="leading-6">
                    <strong className="block text-foreground">
                      {address.fullName}
                    </strong>
                    <span className="text-muted">
                      {address.addressLine}, {address.city}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            {!addresses?.length && (
              <p className="mt-4 text-sm text-muted">
                No saved addresses found. Please add an address first.
              </p>
            )}
          </section>
          <section className="rounded-lg border border-border bg-surface p-5">
            <PaymentMethodSelector
              value={paymentMethod}
              onChange={setPaymentMethod}
            />
          </section>
        </div>
        <aside className="h-fit rounded-lg border border-border bg-surface p-5">
          <CheckoutSummary cart={cart} />

          <button
            type="button"
            onClick={handleCheckout}
            disabled={
              createOrderMutation.isPending || initiatePaymentMutation.isPending
            }
            className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {createOrderMutation.isPending || initiatePaymentMutation.isPending
              ? "Processing..."
              : paymentMethod === "CCAVENUE"
                ? "Proceed to Payment"
                : "Place Order"}
          </button>
        </aside>
      </div>
    </main>
  );
};

export default CheckoutPage;
