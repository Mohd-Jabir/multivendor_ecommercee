import { useState } from "react";

import {
  usePendingVendors,
  useApproveVendor,
  useRejectVendor,
} from "../../hooks/useAdmin.js";
import VendorApprovalTable from "../../components/admin/VendorApprovalTable.jsx";
import Loading from "../../components/common/Loading.jsx";
import ErrorMessage from "../../components/common/ErrorMessage.jsx";
const VendorApprovalsPage = () => {
  const [processingVendorId, setProcessingVendorId] = useState(null);
  const { data: vendors = [], isLoading, isError, error } = usePendingVendors();
  const approveMutation = useApproveVendor();
  const rejectMutation = useRejectVendor();
  if (isLoading) {
    return <Loading message="Loading vendors..." />;
  }
  if (isError) {
    return (
      <ErrorMessage
        message={error?.message || "Failed to load pending vendors."}
      />
    );
  }
  const handleApprove = (vendorId) => {
    const confirmed = window.confirm("Approve this vendor?");
    if (!confirmed) {
      return;
    }
    setProcessingVendorId(vendorId);
    approveMutation.mutate(vendorId, {
      onSettled: () => {
        setProcessingVendorId(null);
      },
    });
  };
  const handleReject = (vendorId) => {
    const confirmed = window.confirm("Reject this vendor?");
    if (!confirmed) {
      return;
    }
    setProcessingVendorId(vendorId);
    rejectMutation.mutate(vendorId, {
      onSettled: () => {
        setProcessingVendorId(null);
      },
    });
  };
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <div>
        <h1 className="text-2xl font-bold">Vendor Approvals</h1>
        <p className="mt-1 text-sm text-muted">
          Review and approve seller applications.
        </p>
      </div>

      <div className="mt-8">
        {vendors.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface p-8 text-center">
            <h2 className="font-semibold">No pending vendors</h2>
            <p className="mt-2 text-sm text-muted">
              New vendor applications will appear here.
            </p>
          </div>
        ) : (
          <VendorApprovalTable
            vendors={vendors}
            onApprove={handleApprove}
            onReject={handleReject}
            isProcessing={Boolean(processingVendorId)}
          />
        )}
      </div>
    </main>
  );
};

export default VendorApprovalsPage;
