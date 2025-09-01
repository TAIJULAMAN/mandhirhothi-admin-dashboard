import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import PageHeading from "../../Components/Shared/PageHeading";
import { useSelector } from "react-redux";
import { decodeAuthToken } from "../../Utils/decode-access-token";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/profileApi";
// import { message } from "antd";
import { getImageUrl } from "../../config/envConfig";

function Profile() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const [profilePic, setProfilePic] = useState();

  const token = useSelector((state) => state.auth.token);
  const decodedToken = decodeAuthToken(token);

  // Fetch profile data
  const { data: profileData, refetch } = useGetProfileQuery({
    _id: decodedToken?.id,
  });
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (profileData?.data?.photo) {
      setProfilePic(getImageUrl(profileData.data.photo));
    }
  }, [profileData]);

  // Update profile picture
  // const handleProfilePicUpload = async (e) => {
  //   const formData = new FormData();
  //   formData.append("file", e.target.files[0]);
  //   const response = await updateProfile(formData).unwrap();

  //   if (response?.success) {
  //     message.success(`Profile Picture Updated Successfully`);
  //     setProfilePic(URL.createObjectURL(e.target.files[0]));
  //     refetch(); // refresh after update
  //   } else {
  //     message.error(`Failed to update Profile Picture`);
  //   }
  // };

  return (
    <div className="overflow-y-auto">
      <div className="px-5 pb-5 h-full">
        <PageHeading title="Profile Setting" />

        <div className="mx-auto flex flex-col justify-center items-center">
          {/* Profile Picture */}
          <div className="flex flex-col justify-center items-center mt-5 md:w-[900px] mx-auto p-5 gap-5 rounded-lg">
            <div className="relative">
              <div className="w-[122px] h-[122px] bg-gray-300 rounded-full border-4 border-white shadow-xl flex justify-center items-center overflow-hidden">
                <img
                  src={
                    profilePic ||
                    profileData?.data?.photo ||
                    "https://avatar.iran.liara.run/public/46"
                  }
                  className="w-full h-full object-cover rounded-full"
                  alt="User Avatar"
                />
                {/* <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                  <label htmlFor="profilePicUpload" className="cursor-pointer">
                    <FaCamera className="text-[#00823b]" />
                  </label>
                  <input
                    onChange={handleProfilePicUpload}
                    type="file"
                    id="profilePicUpload"
                    className="hidden"
                  />
                </div> */}
              </div>
            </div>
            <div className="flex flex-col justify-center text-center">
              <span className="text-xl text-gray-800 md:text-3xl font-bold">
                {profileData?.data?.fastname +
                  " " +
                  profileData?.data?.lastname}
              </span>
              <span className="text-xl font-semibold text-gray-600">
                {profileData?.data?.role || "Admin"}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center items-center gap-5 text-md md:text-xl font-semibold my-5">
            <p
              onClick={() => setActiveTab("editProfile")}
              className={`cursor-pointer pb-1 ${
                activeTab === "editProfile"
                  ? "text-[#00823b] border-b-2 border-[#00823b]"
                  : "text-[#6A6D76]"
              }`}
            >
              Edit Profile
            </p>
            <p
              onClick={() => setActiveTab("changePassword")}
              className={`cursor-pointer pb-1 ${
                activeTab === "changePassword"
                  ? "text-[#00823b] border-b-2 border-[#00823b]"
                  : "text-[#6A6D76]"
              }`}
            >
              Change Password
            </p>
          </div>

          {/* Tab Content */}
          <div className="flex justify-center items-center p-5 rounded-md !w-full">
            <div className="w-full max-w-3xl">
              {activeTab === "editProfile" && (
                <EditProfile
                  profileData={profileData?.data}
                  updateProfile={updateProfile}
                  refetch={refetch}
                  isLoading={isLoading}
                />
              )}
              {activeTab === "changePassword" && <ChangePassword />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
