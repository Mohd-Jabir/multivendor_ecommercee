const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className="rounded-md border border-border px-3 py-2 text-sm hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onPageChange(index)}
          disabled={page === index}
          className={`h-9 min-w-9 rounded-md px-3 text-sm ${
            page === index
              ? "bg-primary text-white"
              : "border border-border hover:bg-surface"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        type="button"
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
        className="rounded-md border border-border px-3 py-2 text-sm hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
