import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-surface">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="aspect-square w-full border-b border-border object-contain"
      />
      <div className="p-4">
        <p className="text-xs text-muted">{product.categoryName}</p>
        <h2 className="mt-1 truncate font-semibold">{product.name}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-semibold text-primary">₹{product.price}</p>
          <Link
            to={`/products/${product.id}`}
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            View Product →
          </Link>
        </div>
      </div>
    </article>
  );
};
export default ProductCard
