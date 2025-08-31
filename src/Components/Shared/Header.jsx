// Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { decodeAuthToken } from "../../Utils/decode-access-token";
import { useGetProfileQuery } from "../../redux/api/profileApi";
import { RxCross1 } from "react-icons/rx";
import Loader from "./Loaders/Loader";
import { getImageBaseUrl } from "../../config/envConfig";
import { useSelector } from "react-redux";

function Header({ toggleSidebar, isSidebarOpen }) {
  const [isOpen] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const decodedToken = decodeAuthToken(token);

  const { data: profileData, isLoading } = useGetProfileQuery({
    _id: decodedToken?.id,
  });

  const navigate = useNavigate();
  const showModal = () => navigate("/notifications");

  if (!isOpen) return null;

  if (isLoading) {
    <Loader />;
  }

  const profileImage = getImageBaseUrl() + profileData?.data?.photo;

  // console.log("Profile Data:", profileData);
  // console.log(isLoading, "Loading State");

  return (
    <div className="px-5 md:px-10 h-16 flex justify-between items-center bg-white shadow">
      <div className="flex items-center gap-4">
        <img className="md:h-12 h-8" src="/logo.png" alt="logo image" />
      </div>

      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button
          onClick={showModal}
          className="relative bg-[#cce9ff] md:p-[13px] p-[10px] rounded-full transition"
        >
          <IoIosNotificationsOutline className="size-6" />
          <span className="absolute top-1 right-1 bg-[#00823b] text-xs text-white px-1 rounded-full">
            10
          </span>
        </button>

        {/* Profile */}
        <Link to="/profile" className="flex items-center gap-2">
          <img
            // src="https://avatar.iran.liara.run/public/15"
            src={profileImage}
            className="md:size-12 size-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <div className="hidden md:flex flex-col items-start">
            <h3 className="text-gray-800 text-sm">
              {profileData?.data?.fastname}
            </h3>
            <p className="text-xs px-2 py-1 bg-[#cce9ff] text-[#00823b] rounded">
              {profileData?.data?.role ?? "Admin"}
            </p>
          </div>
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 md:hidden cursor-pointer"
        >
          {isSidebarOpen ? (
            <RxCross1 size={20} />
          ) : (
            <GiHamburgerMenu size={20} />
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;
