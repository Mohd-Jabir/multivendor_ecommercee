const ErrorMessage = ({ message = "Something went wrong." }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <p className="rounded-md border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;
