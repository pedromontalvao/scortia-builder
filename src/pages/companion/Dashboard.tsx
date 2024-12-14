import { Outlet } from "react-router-dom";
import { DashboardNav } from "@/components/companion/dashboard/DashboardNav";

export const CompanionDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <aside className="col-span-3">
            <DashboardNav />
          </aside>
          <main className="col-span-9">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};