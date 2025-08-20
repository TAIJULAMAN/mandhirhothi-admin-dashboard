import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function EditProfile({ profileData, updateProfile, refetch, isLoading }) {
  const [formData, setFormData] = useState({
    fastname: "",
    lastname: "",
    email: "",
    male: "",
    phoneNumber: "",
    address: "",
  });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (profileData) {
      setFormData({
        fastname: profileData.fastname || "",
        lastname: profileData.lastname || "",
        email: profileData.email || "",
        male: profileData.male || "",
        phoneNumber: profileData.phoneNumber || "",
        address: profileData.address || "",
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fastname", formData.fastname);
      formDataToSend.append("lastname", formData.lastname);
      formDataToSend.append("male", formData.male);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("address", formData.address);

      if (photo) {
        formDataToSend.append("file", photo);
      }

      await updateProfile(formDataToSend).unwrap();

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
      });
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error updating profile",
        text: error?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="bg-white md:px-20 px-5 md:w-[715px] py-5 rounded-md">
      <p className="text-gray-800 text-center font-bold text-2xl mb-5">
        Edit Your Profile
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="text-xl text-gray-800 mb-2">First Name</label>
          <input
            type="text"
            name="fastname"
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-2"
            placeholder="Enter First Name"
            value={formData.fastname}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="text-xl text-gray-800 mb-2">Last Name</label>
          <input
            type="text"
            name="lastname"
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-2"
            placeholder="Enter Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="text-xl text-gray-800 mb-2">Email</label>
          <input
            type="text"
            name="email"
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-2 bg-gray-100"
            value={formData.email}
            readOnly
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-xl text-gray-800 mb-2">Gender</label>
          <select
            name="male"
            value={formData.male}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-xl text-gray-800 mb-2">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            required
            defaultValue={"01"}
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-2"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div>
          <label className="text-xl text-gray-800 mb-2">Address</label>
          <input
            type="text"
            name="address"
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-2"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="text-xl text-gray-800 mb-2">Profile Image</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-2"
          />
        </div>

        <div className="text-center py-5 text-white">
          <button className={`bg-[#00823b] text-white font-semibold w-full py-3 rounded-lg cursor-pointer` + (isLoading ? " opacity-50 cursor-not-allowed" : "")} disabled={isLoading}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
