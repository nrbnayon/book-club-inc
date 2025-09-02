// src\app\(dashboard)\manage-post\page.tsx
import DashboardHeader from "../components/dashboard-header";
import ManagementPosts from "../components/UploadBook/BookManagement";

export default function ManagePostsPage() {
  return (
    <div>
      <DashboardHeader title='Welcome Nayon' />
      <div className='p-2 md:p-5'>
        <ManagementPosts itemsPerPage={8} title='All Book' />
      </div>
    </div>
  );
}
