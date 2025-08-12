import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
// import logo from "../../assets/icons/logo.png";
import { imageUrl } from "../../Utils/server";
import { decodeAuthToken } from "../../Utils/decode-access-token";
import { useGetProfileQuery } from "../../redux/api/profileApi";
import { IoIosNotificationsOutline } from "react-icons/io";



function Header() {
  const [isOpen, setIsOpen] = useState(true);

  const token = localStorage.getItem("token");
  // console.log(token);
  const decodedToken = decodeAuthToken(token);
  // console.log(decodedToken);
  const { data: profileData } = useGetProfileQuery({ _id: decodedToken?.id });
  // console.log("profileData from header", profileData);
  const navigate = useNavigate();
  const showModal = () => {
    navigate("/notifications")
  }


  if (!isOpen) return null;

  return (
    <div className="px-10 h-20 flex justify-between items-center bg-white shadow">

      <img className="h-12" src='/logo.png' alt="logo image" />

      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button
          onClick={showModal}
          className="relative bg-[#cce9ff] p-[15px] rounded-full transition"
        >
          <IoIosNotificationsOutline size={22} />

          <span className="absolute top-1 right-1 bg-[#00823b] text-xs text-white px-1 rounded-full">
            10
          </span>

        </button>

        {/* Profile */}
        <Link to="/profile" className="flex items-center gap-2">
          <img
            src={imageUrl(profileData?.data?.img || "https://avatar.iran.liara.run/public/26")}
            className="w-8 md:w-12 h-8 md:h-12 object-cover rounded-full"
            alt="User Avatar"
          />
          <div className="hidden md:flex flex-col items-start">
            <h3 className="text-gray-800 text-sm">{profileData?.data?.name || "Shah Aman"}</h3>
            <p className="text-xs px-2 py-1 bg-[#cce9ff] text-[#00823b] rounded">
              {profileData?.data?.role || "Admin"}
            </p>
          </div>
        </Link>
      </div>


    </div>
  );
}

export default Header;
