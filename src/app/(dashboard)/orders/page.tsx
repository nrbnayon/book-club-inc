// src\app\(dashboard)\orders\page.tsx
import DashboardHeader from "../components/dashboard-header";
import BooksOrdersManage from "../components/BooksOrders/BooksOrdersManage";

export default function ManageBookOrdersPage() {
  return (
    <div>
      <DashboardHeader
        title='All Orders'
        subtitle='Track, manage and forecast your customers and orders.'
      />
      <div className='p-2 md:p-5'>
        <BooksOrdersManage
          itemsPerPage={20}
          title='All Order History'
          buttonText=''
          pageUrl=''
        />
      </div>
    </div>
  );
}
