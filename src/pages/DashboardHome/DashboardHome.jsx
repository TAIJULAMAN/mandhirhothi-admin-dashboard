import React from "react";
import GrowthChart from "../../Components/charts/UserGrowthChart";
import ActivityChart from "../../Components/charts/ActivityChart";
import RecentlyJoinedUsers from "../User/RecentlyJoinedUsers";
import user from "../../assets/icons/user.png";
import list from "../../assets/icons/list.png";
// import revenue from "../../assets/icons/revenue.png"; // create a revenue icon if you don’t have
import { useGetTotalUserTotalRevenueQuery } from "../../redux/api/homePage/statsApi";

function DashboardHome() {
  const { data: dashboardData, isLoading } = useGetTotalUserTotalRevenueQuery();

  // Extract API data safely
  const stats = dashboardData?.data || {};

  const cardData = [
    {
      title: "Total Users",
      value: isLoading ? "Loading..." : stats.totalUser,
      icon: <img src={user} alt="User Icon" className="md:block hidden" />,
    },
    {
      title: "Total Listings",
      value: isLoading ? "Loading..." : stats.totalListings,
      icon: <img src={list} alt="List Icon" className="md:block hidden" />,
    },
    {
      title: "Subscription Revenue",
      value: isLoading ? "Loading..." : `$${stats.totalSubscriptionRevenue || 0}`,
      icon: <img src={list} alt="Revenue Icon" className="md:block hidden"/>,
    },
    {
      title: "Plate Revenue",
      value: isLoading ? "Loading..." : `$${stats.totalPlatePaymentRevenue || 0}`,
      icon: <img src={list} alt="Revenue Icon" className="md:block hidden"/>,
    },
  ];

  return (
    <div>
      {/* Card Section */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10 bg-white shadow-lg rounded-xl mb-5">
  {cardData.map((card, index) => (
    <div
      key={index}
      className="flex items-center justify-center gap-3 border-r-0 md:border-r-2 md:last:border-r-0 border-gray-300 p-4"
    >
      <h1>{card.icon}</h1>
      <div>
        <h1 className="text-xl md:text-3xl font-semibold">{card.title}</h1>
        <h1 className="text-xl md:text-3xl font-semibold text-[#00823b]">
          {card.value}
        </h1>
      </div>
    </div>
  ))}
</div>


      {/* Chart Section */}
      <div className="w-full col-span-4 xl:col-span-3 h-full">
        <GrowthChart />
      </div>

      {/* Recently Joined Users Section */}
      <div className="mt-5">
        <h1 className="text-2xl font-semibold mb-5">Recently Joined Users</h1>
        <RecentlyJoinedUsers />
      </div>
    </div>
  );
}

export default DashboardHome;
