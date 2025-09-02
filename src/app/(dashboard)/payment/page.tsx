// src\app\(dashboard)\payment\page.tsx
import DashboardHeader from "../components/dashboard-header";
import PaymentTrack from "../components/PaymentTrack/PaymentTrack";

export default function TrackPaymentPage() {
  return (
    <div>
      <DashboardHeader
        title="Payment"
        subtitle="Track payment of your customers."
      />
      <div className="p-2 md:p-6">
        <PaymentTrack
          itemsPerPage={20}
          title="All Payment History"
          buttonText=""
          pageUrl=""
        />
      </div>
    </div>
  );
}
