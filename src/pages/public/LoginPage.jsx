import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const { login, isLoggingIn, loginError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-border bg-surface p-6 sm:p-8"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="mt-2 text-sm text-muted">
          Welcome back. Please enter your details.
        </p>

        <div className="mt-6">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mt-2 w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        {loginError && (
          <p className="mt-4 text-sm text-danger">
            {loginError.response?.data?.message || "Login failed"}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoggingIn}
          className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
