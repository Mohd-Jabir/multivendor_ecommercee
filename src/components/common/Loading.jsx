const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-sm text-muted">{message}</p>
    </div>
  );
};

export default Loading;
