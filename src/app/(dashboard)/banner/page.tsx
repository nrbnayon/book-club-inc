// src\app\(dashboard)\banner\page.tsx
import DashboardHeader from "../components/dashboard-header";
import BannerManagement from "../components/AppBanner/BannerManagement";

export default function BannerPage() {
  return (
    <div>
      <DashboardHeader title='Upload your new banner' />
      <div className='p-2 md:p-5'>
        <BannerManagement itemsPerPage={1} showAds={1} title='App Banner' />
      </div>
    </div>
  );
}
