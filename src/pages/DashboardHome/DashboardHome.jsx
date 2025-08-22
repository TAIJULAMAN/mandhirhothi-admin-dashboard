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
      icon: <img src={user} alt="User Icon" />,
    },
    {
      title: "Total Listings",
      value: isLoading ? "Loading..." : stats.totalListings,
      icon: <img src={list} alt="List Icon" />,
    },
    {
      title: "Subscription Revenue",
      value: isLoading ? "Loading..." : `$${stats.totalSubscriptionRevenue || 0}`,
      // icon: <img src={list} alt="Revenue Icon" />,
    },
    {
      title: "Plate Revenue",
      value: isLoading ? "Loading..." : `$${stats.totalPlatePaymentRevenue || 0}`,
      // icon: <img src={list} alt="Revenue Icon" />,
    },
  ];

  return (
    <div>
      {/* Card Section */}
      <div className="flex items-center justify-between p-10 bg-white shadow-lg rounded-xl mb-5">
        {cardData.map((card, index) => (
          <div
            className={`w-full ${
              index !== cardData.length - 1
                ? "border-r-2 border-gray-800 pr-6"
                : "pl-6"
            }`}
            key={index}
          >
            <div className="flex items-center justify-center gap-3">
              <h1>{card.icon}</h1>
              <div>
                <h1 className="md:text-3xl font-semibold">{card.title}</h1>
                <h1 className="md:text-3xl font-semibold text-[#00823b]">
                  {card.value}
                </h1>
              </div>
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
