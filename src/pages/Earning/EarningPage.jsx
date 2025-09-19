import React, { useState } from "react";
import TransactionTable from "./TransactionTable";
import { useGetEarningsStatsQuery } from "../../redux/api/Earnings/statsApi";
import PageHeading from "../../Components/Shared/PageHeading";
import { IoSearch } from "react-icons/io5";
import Loader from "../../Components/Shared/Loaders/Loader";
import useDebounce from "../../hooks/useDebounce";

function EarningPage() {
  const { data, isLoading } = useGetEarningsStatsQuery();
  console.log("Earning data", data);
  console.log(isLoading);

  const earnings = data?.data || {};
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

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
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="Eargings" />
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="relative w-full sm:w-[300px] ">
            <input
              type="text"
              placeholder="Search..."
              className="border-2 border-[#00823b] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className=" text-gray-400 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between  p-10 ounded-xl bg-white shadow-lg rounded-xl mb-5">
        {cardData?.map((card, index) => (
          <div
            className={`w-full ${
              index !== cardData.length - 1
                ? "border-r-2 border-gray-800 md:pr-6 p-2"
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
        <TransactionTable search={debouncedSearch} />
      </div>
    </div>
  );
}

export default EarningPage;
