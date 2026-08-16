import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-border bg-surface text-sm">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <section>
          <h2 className="text-base font-semibold text-foreground">
            WaapTech Coders Software Pvt Ltd
          </h2>
          <p className="mt-3 leading-6 text-muted">
            Building reliable digital solutions and modern software experiences
            for businesses and customers.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground">Quick Links</h3>
          <nav className="mt-3 flex flex-col gap-2 text-muted">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="hover:text-primary">
              Products
            </Link>
            <Link to="/categories" className="hover:text-primary">
              Categories
            </Link>
          </nav>
        </section>

        <section>
          <h3 className="font-semibold text-foreground">Customer</h3>
          <nav className="mt-3 flex flex-col gap-2 text-muted">
            <Link to="/cart" className="hover:text-primary">
              Cart
            </Link>
            <Link to="/orders" className="hover:text-primary">
              My Orders
            </Link>
            <Link to="/addresses" className="hover:text-primary">
              Addresses
            </Link>
          </nav>
        </section>

        <section>
          <h3 className="font-semibold text-foreground">Company</h3>
          <nav className="mt-3 flex flex-col gap-2 text-muted">
            <Link to="/about" className="hover:text-primary">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-primary">
              Contact Us
            </Link>
            <Link to="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary">
              Terms & Conditions
            </Link>
          </nav>
        </section>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            © {currentYear} WaapTech Coders Software Pvt Ltd. All rights
            reserved.
          </p>
          <p>Designed and developed by WaapTech Coders Software Pvt Ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
