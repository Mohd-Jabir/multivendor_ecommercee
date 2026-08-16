import ProductCard from './ProductCard.jsx'
const ProductGrid = ({ products = [] }) => {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="text-sm text-muted">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
