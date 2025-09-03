// src\app\(dashboard)\upload\page.tsx
import DashboardHeader from "../components/dashboard-header";
import BookManagement from "../components/UploadBook/BookManagement";

export default function ManagePostsPage() {
  return (
    <div>
      <DashboardHeader title="Upload Your New Book" />
      <div className="p-2 md:p-5">
        <BookManagement itemsPerPage={8} title="All Book" />
      </div>
    </div>
  );
}
