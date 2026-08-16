import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="bg-page">
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 sm:py-24">
          <div>
            <p className="text-xs font-semibold tracking-wider text-primary">
              YOUR ONE-STOP ONLINE MARKETPLACE
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
              Discover More.
              <br />
              Shop Better.
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-muted">
              Explore products from trusted sellers, discover great deals, and
              enjoy a simple and reliable shopping experience — all from one
              marketplace.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary/90"
              >
                Shop Now
              </Link>

              <Link
                to="/register"
                className="rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium hover:bg-page"
              >
                Become a Seller
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 border-t border-border pt-6 text-sm">
              {[
                ["Trusted Sellers", "500+"],
                ["Products", "10K+"],
                ["Happy Customers", "25K+"],
              ].map(([label, value]) => (
                <div key={label}>
                  <strong className="block text-xl">{value}</strong>
                  <span className="text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src="/home.webp"
              alt="Online marketplace"
              width="600"
              height="600"
              loading="eager"
              decoding="async"
              className="h-auto w-full max-w-xl object-contain"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold">
            Everything you need for a better shopping experience
          </h2>
          <p className="mt-3 text-muted">
            From discovering products to receiving your order, our marketplace
            is designed to keep every step simple.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Trusted Sellers",
              "Shop from vendors who have been reviewed and approved before selling on the marketplace.",
            ],
            [
              "Wide Selection",
              "Discover products across multiple categories and find everything you need in one place.",
            ],
            [
              "Secure Payments",
              "Choose from available payment options and complete your purchases through a secure checkout process.",
            ],
            [
              "Easy Order Management",
              "View your orders, check their status and manage your purchases from your account.",
            ],
          ].map(([title, text]) => (
            <article
              key={title}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wider text-primary">
                EXPLORE OUR MARKETPLACE
              </p>
              <h2 className="mt-2 text-2xl font-bold">Shop by category</h2>
              <p className="mt-3 max-w-xl text-muted">
                Find exactly what you are looking for by exploring our growing
                range of product categories.
              </p>
            </div>
            <Link
              to="/products"
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              View All Products
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "01",
                "Electronics",
                "Technology, gadgets and electronic essentials.",
                "electronics",
              ],
              [
                "02",
                "Fashion",
                "Clothing, footwear and everyday fashion.",
                "fashion",
              ],
              [
                "03",
                "Home & Living",
                "Products for a comfortable and modern home.",
                "home",
              ],
              [
                "04",
                "Beauty & Personal Care",
                "Everyday personal care and lifestyle essentials.",
                "beauty",
              ],
              [
                "05",
                "Groceries",
                "Everyday essentials for your home.",
                "grocery",
              ],
              [
                "06",
                "More Categories",
                "Explore the complete marketplace.",
                "",
              ],
            ].map(([number, title, text, category]) => (
              <Link
                key={title}
                to={category ? `/products?category=${category}` : "/products"}
                className="rounded-lg border border-border p-5 hover:border-primary"
              >
                <span className="text-sm font-semibold text-primary">
                  {number}
                </span>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-wider text-primary">
            FIND WHAT YOU NEED
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            A marketplace built around your needs
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-muted">
            Search by product, category or price range and quickly discover
            products that match what you are looking for.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block text-sm font-medium text-primary hover:text-primary/80"
          >
            Browse Products
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {["Search", "Compare", "Choose"].map((item, index) => (
            <div key={item} className="border-l-2 border-primary pl-4">
              <span className="text-sm text-muted">0{index + 1}</span>
              <h3 className="mt-2 font-semibold">{item}</h3>
              <p className="mt-2 text-sm text-muted">
                {
                  [
                    "Quickly find products using marketplace search.",
                    "Explore products from different sellers.",
                    "Select the product that best matches your needs.",
                  ][index]
                }
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <p className="text-xs font-semibold tracking-wider text-primary">
            SIMPLE SHOPPING
          </p>
          <h2 className="mt-2 text-2xl font-bold">How shopping works</h2>
          <p className="mt-3 max-w-2xl text-muted">
            We've kept the buying process straightforward so you can spend less
            time managing your order and more time enjoying your purchase.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Explore",
                "Browse products and categories from multiple sellers.",
              ],
              [
                "Add to Cart",
                "Add the products you want and manage quantities easily.",
              ],
              [
                "Checkout",
                "Select your delivery address and preferred payment method.",
              ],
              [
                "Track Your Order",
                "Manage your orders and follow their current status.",
              ],
            ].map(([title, text], index) => (
              <article
                key={title}
                className="rounded-lg border border-border p-5"
              >
                <span className="text-sm font-semibold text-primary">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-wider text-primary">
            FOR SELLERS
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            Turn your products into a growing online business.
          </h2>
          <p className="mt-3 leading-7 text-muted">
            Join our marketplace and get the tools you need to create your
            store, manage products, maintain inventory and handle customer
            orders.
          </p>
          <Link
            to="/register"
            className="mt-6 inline-block rounded-md bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary/90"
          >
            Start Selling
          </Link>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          <h3 className="font-semibold">Everything sellers need</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {[
              "Create and manage your store",
              "Add and manage products",
              "Control product inventory",
              "Manage customer orders",
              "Update order item status",
              "Build your presence in a growing marketplace",
            ].map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <p className="text-xs font-semibold tracking-wider text-primary">
            BUILT FOR EVERYONE
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            One marketplace.
            <br />
            Multiple possibilities.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-lg border border-border p-6">
              <h3 className="font-semibold">For Customers</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Discover products, manage your cart, save delivery addresses,
                place orders and manage your purchases.
              </p>
              <Link
                to="/products"
                className="mt-4 inline-block text-sm font-medium text-primary"
              >
                Start Shopping
              </Link>
            </article>
            <article className="rounded-lg border border-border p-6">
              <h3 className="font-semibold">For Sellers</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Create your store, publish products, manage inventory and
                fulfill customer orders from one place.
              </p>
              <Link
                to="/register"
                className="mt-4 inline-block text-sm font-medium text-primary"
              >
                Become a Seller
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-xs font-semibold tracking-wider text-primary">
          START EXPLORING
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Your next great find is waiting.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Discover products from trusted sellers and experience a simpler way to
          shop online.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link
            to="/products"
            className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary/90"
          >
            Explore Products
          </Link>
          <Link
            to="/register"
            className="rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium hover:bg-page"
          >
            Create Account
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
