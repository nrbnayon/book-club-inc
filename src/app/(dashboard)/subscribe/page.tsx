// src\app\(dashboard)\users-subscription\page.tsx

import DashboardHeader from "../components/dashboard-header";
import UserSubscriptions from "../components/Subscription/UserSubscriptions";

export default function ManageUserPage() {
  return (
    <div>
      <DashboardHeader title='Welcome  Nayon' />
      <div className='p-2 md:p-5'>
        <UserSubscriptions
          itemsPerPage={15}
          title='All Subscription History'
          buttonText=''
          pageUrl=''
        />
      </div>
    </div>
  );
}
