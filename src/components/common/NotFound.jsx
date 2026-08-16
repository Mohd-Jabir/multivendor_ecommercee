const NotFound = ({ message = "Data not found." }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      <h1 className="text-xl font-semibold">Nothing found</h1>
      <p className="mt-2 text-sm text-muted">{message}</p>
    </div>
  );
};

export default NotFound;
