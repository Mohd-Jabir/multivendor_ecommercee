import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const RegisterPage = () => {
  const { register, isRegistering, registerError } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "CUSTOMER",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    register(formData);
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-border bg-surface p-6 sm:p-8"
      >
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="mt-2 text-sm text-muted">
          Join the marketplace as a customer or seller.
        </p>
        <div className="mt-6">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
            className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="role" className="text-sm font-medium">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
          >
            <option value="CUSTOMER">Customer</option>
            <option value="VENDOR">Vendor</option>
          </select>
        </div>
        {registerError && (
          <p className="mt-4 text-sm text-danger">
            {registerError.response?.data?.message || "Registration failed"}
          </p>
        )}
        <button
          type="submit"
          disabled={isRegistering}
          className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRegistering ? "Creating account..." : "Register"}
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
