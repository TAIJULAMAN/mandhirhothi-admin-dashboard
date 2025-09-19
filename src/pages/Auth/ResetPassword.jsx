import React, { useState } from "react";
import "antd/dist/reset.css";
import BrandLogo from "../../Components/Shared/BrandLogo";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useResetPasswordMutation } from "../../redux/api/authApi";
import { jwtDecode } from "jwt-decode"; 

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "The passwords do not match. Please try again.",
      });
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Invalid Request",
        text: "Missing verification token. Please restart the reset process.",
      });
      return;
    }

    // ✅ Decode token to get userId
    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      Swal.fire({
        icon: "error" + error,
        title: "Invalid Token",
        text: "Your session is invalid. Please try again.",
      });
      return;
    }

    const userId = decoded?.id;

    try {
      await resetPassword(
        {
          userId,
          password: newPassword,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      ).unwrap();

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "Your password has been successfully updated.",
      });

      // ✅ remove token after reset
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Password Reset Failed",
        text: error?.data?.message || "Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f6ff] p-5">
      <div className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-start">
        <BrandLogo
          status="Set a new password"
          information="Create a new password. Ensure it differs from previous ones for security."
        />
        <form className="space-y-5" onSubmit={handleUpdatePassword}>
          {/* --- New Password --- */}
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start">
              New Password
            </label>
            <div className="w-full relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="**********"
                className="w-full px-5 py-3 border-2 border-gray-400 rounded-md outline-none mt-2"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 bottom-3 text-gray-400"
              >
                {showNewPassword ? <FaEye />:<FaEyeSlash /> }
              </button>
            </div>
          </div>

          {/* --- Confirm Password --- */}
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start">
              Confirm Password
            </label>
            <div className="w-full relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="**********"
                className="w-full px-5 py-3 border-2 border-gray-400 rounded-md outline-none mt-2"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 bottom-3 text-gray-400"
              >
                {showConfirmPassword ?  <FaEye />:<FaEyeSlash /> }
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center text-white">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00823b] font-semibold py-3 px-6 rounded-lg shadow-lg cursor-pointer mt-5"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
