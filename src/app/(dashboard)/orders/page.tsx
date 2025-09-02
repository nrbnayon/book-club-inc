// src\app\(dashboard)\manage-book-orders\page.tsx
import DashboardHeader from "../components/dashboard-header";
import BooksOrdersManage from "../components/BooksOrders/BooksOrdersManage";

export default function ManageBookOrdersPage() {
  return (
    <div>
      <DashboardHeader title="Welcome Nayon" />
      <div className="p-2 md:p-6">
        <BooksOrdersManage
          itemsPerPage={20}
          title="All Book Orders"
          buttonText=""
          pageUrl=""
        />
      </div>
    </div>
  );
}
