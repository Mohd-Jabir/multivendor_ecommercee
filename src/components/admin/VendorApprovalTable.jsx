const VendorApprovalTable = ({
  vendors,
  onApprove,
  onReject,
  isProcessing,
}) => {
  if (!vendors?.length) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="text-sm text-muted">No pending vendors.</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="border-b border-border bg-page text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Vendor</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Store</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {vendors.map((vendor) => {
            const vendorId = vendor.id || vendor.vendorId;
            return (
              <tr key={vendorId} className="hover:bg-page/60">
                <td className="px-4 py-3 font-medium">{vendor.name || "N/A"}</td>
                <td className="px-4 py-3 text-muted">{vendor.email || "N/A"}</td>
                <td className="px-4 py-3">{vendor.storeName || "N/A"}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {vendor.status || "PENDING"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onApprove(vendorId)}
                      disabled={isProcessing}
                      className="rounded-md bg-success px-3 py-1.5 text-xs font-medium text-white hover:bg-success/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => onReject(vendorId)}
                      disabled={isProcessing}
                      className="rounded-md border border-danger/30 px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default VendorApprovalTable;
