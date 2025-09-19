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
      iconSrc: user,
      iconAlt: "User Icon",
    },
    {
      title: "Total Listings",
      value: isLoading ? "Loading..." : stats.totalListings,
      iconSrc: list,
      iconAlt: "List Icon",
    },
    {
      title: "Subscription Revenue",
      value: isLoading ? "Loading..." : `$${stats.totalSubscriptionRevenue || 0}`,
      iconSrc: list,
      iconAlt: "Revenue Icon",
    },
    {
      title: "Plate Revenue",
      value: isLoading ? "Loading..." : `$${stats.totalPlatePaymentRevenue || 0}`,
      iconSrc: list,
      iconAlt: "Revenue Icon",
    },
  ];

  return (
    <div>
      {/* Card Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6 bg-white shadow-lg rounded-xl mb-5">
  {cardData.map((card, index) => (
    <div
      key={index}
      className="flex items-center justify-start gap-3 md:gap-4 border-r-0 md:border-r-2 md:last:border-r-0 border-gray-300 p-3 md:p-4"
    >
      <img
        src={card.iconSrc}
        alt={card.iconAlt}
        className="hidden lg:block w-8 h-8 lg:w-10 lg:h-10 object-contain flex-shrink-0"
      />
      <div className="min-w-0">
        <h1 className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 truncate">{card.title}</h1>
        <h1 className="text-base sm:text-lg md:text-xl lg:text-3xl font-bold text-[#00823b] break-words whitespace-normal">
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
