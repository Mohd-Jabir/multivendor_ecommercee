const PaymentMethodSelector = ({ value, onChange }) => {
  const methods = [
    ["COD", "Cash on Delivery"],
    ["CCAVENUE", "CCAvenue"],
  ];
  return (
    <div>
      <h2 className="text-lg font-semibold">Payment Method</h2>
      <div className="mt-4 space-y-3">
        {methods.map(([method, label]) => (
          <label
            key={method}
            className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 text-sm ${
              value === method
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-page"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={value === method}
              onChange={(event) => onChange(event.target.value)}
              className="accent-primary"
            />
            <span className="font-medium">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
export default PaymentMethodSelector;
