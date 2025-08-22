import React from "react";
import TransactionTable from "./TransactionTable";
import { useGetEarningsStatsQuery } from "../../redux/api/Earnings/statsApi";

function EarningPage() {
  const { data, isLoading } = useGetEarningsStatsQuery();
  console.log("Earning data", data);
  console.log(isLoading);

  const earnings = data?.data || {};

  const cardData = [
    {
      title: "Today",
      value: earnings.today ?? 0,
    },
    {
      title: "This Week",
      value: earnings.thisWeek ?? 0,
    },
    {
      title: "This Month",
      value: earnings.thisMonth ?? 0,
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between  p-10 ounded-xl bg-white shadow-lg rounded-xl mb-5">
        {cardData?.map((card, index) => (
          <div
            className={`w-full ${
              index !== cardData.length - 1
                ? "border-r-2 border-gray-800 pr-6"
                : "pl-6"
            }`}
            key={index}
          >
            <div className="flex items-center justify-center gap-3">
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
      <div className="mt-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-5 text-start">
          Last transactions history
        </h1>
        <TransactionTable />
      </div>
    </div>
  );
}

export default EarningPage;
