// "use client";

import Link from "next/link";
import StatsGrid from "./ٍStatsGrid/page"
import TopProducts from "./component/TopProducts"
import SalesChart from "./component/SalesChart"
import RecentOrders from "./component/RecentOrders";
const AdminDashboard = () => {
 

  return (
    <div className=" p-8">
      <div className="">
        <h1 className="font-bold mb-6 text-lg">Overview</h1>
        <h1 className="font-bold text-2xl my-2">Welcome back 👋</h1>
        <h4 className="">Here&apos;s how the store performed over the last 30 days</h4>
      </div>
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4">
        <SalesChart />
        <TopProducts />
      </div>
      <RecentOrders />
    </div>
  );
};

export default AdminDashboard;