import React from "react";
import PageHeading from "../../Components/Shared/PageHeading";
import { IoSearch } from "react-icons/io5";
import AllUsers from "./AllUsers";

function UsersManage() {
  const [search, setSearch] = React.useState("");
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="Users Management" />
        <div className="flex gap-5">
          <div className="relative w-full sm:w-[300px] ">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search..."
              className="border-2 border-[#00823b] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
            />
            <span className=" text-gray-400 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
          {/* <div className="text-white "> */}
            <button
              // onClick={handleBlock}
              className="bg-[#00823b] !text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
            >
              Blocked Users
            </button>
          {/* </div> */}
        </div>
      </div>

      <AllUsers search={search} />
    </div>
  );
}

export default UsersManage;
