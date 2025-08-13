import React from "react";
import EarningManage from "./EarningManage";
import BookingChart from "./BookingChart";
import PageHeading from "../../Components/Shared/PageHeading";
import TransactionTable from "./TransactionTable";

function EarningPage() {
  const cardData = [
    {
      title: "Today",
      value: 110,

    },
    {
      title: "This Week",
      value: 20,

    },
    {
      title: "This Month",
      value: 20,
    },

  ];
  return (
    <div>
      <div className="flex items-center justify-between  p-10 ounded-xl bg-white shadow-lg rounded-xl mb-5">
        {cardData?.map((card, index) => (
          <div
            className={`w-full ${index !== cardData.length - 1
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
