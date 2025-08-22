import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BrandLogo from "../../Components/Shared/BrandLogo";
import {
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} from "../../redux/api/authApi";
import Swal from "sweetalert2";

function VerificationCode() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  // resend
  const [
    forgotPassword,
    { isLoading: isResending, isSuccess: resendSuccess, isError: resendError, error: resendErr },
  ] = useForgotPasswordMutation();

  // verify
  const [
    verifyEmail,
    { isLoading: isVerifying, isSuccess: verifySuccess, isError: verifyError, error: verifyErr },
  ] = useVerifyEmailMutation();

  // show toast for resend
  useEffect(() => {
    if (resendSuccess) {
      Swal.fire({
        icon: "success",
        title: "OTP Resent",
        text: "A new OTP has been sent to your email.",
      });
    }
    if (resendError) {
      Swal.fire({
        icon: "error",
        title: "Resend Failed",
        text: resendErr?.data?.message || "Could not resend OTP.",
      });
    }
  }, [resendSuccess, resendError, resendErr]);

  // show toast for verify
  useEffect(() => {
    if (verifySuccess) {
      Swal.fire({
        icon: "success",
        title: "Verification successful!",
        text: "Your email has been successfully verified.",
      });
      
      navigate("/reset-password");
    }
    if (verifyError) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: verifyErr?.data?.message || "Invalid code. Please try again.",
      });
    }
  }, [verifySuccess, verifyError, verifyErr, navigate]);

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const enteredCode = code.join("");

  const handleVerifyCode = () => {
    if (enteredCode.length !== 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid 6-digit code.",
      });
      return;
    }

    verifyEmail({ email, verificationCode: enteredCode });
  };

  const handleResend = () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No email found. Please go back and try again.",
      });
      return;
    }
    forgotPassword({ email });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f6ff] p-5">
      <div className="bg-white relative shadow-lg rounded-2xl px-10 py-20 w-full max-w-xl text-center">
        <div className="flex mb-5 flex-col items-center justify-center w-full">
          <BrandLogo img="/logo.png" />
        </div>
        <div className="flex mb-5 flex-col items-center justify-center w-full">
          <h2 className="text-gray-800 text-2xl font-bold text-center mb-5">
            Check your email
          </h2>
          <p className="text-gray-800 text-base text-center mb-5">
            Please enter the 6-digit verification code we sent to your email.
          </p>
        </div>
        <form className="space-y-5">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="shadow-xs w-12 h-12 text-2xl text-center border border-[#00823b] text-[#00823b] rounded-lg focus:outline-none"
              />
            ))}
          </div>

          <div className="flex flex-col gap-5 justify-center items-center text-white">
            <button
              onClick={handleVerifyCode}
              disabled={isVerifying}
              type="button"
              className="whitespace-nowrap w-full bg-[#00823b] text-white font-semibold py-3 rounded-lg shadow-lg cursor-pointer my-5"
            >
              {isVerifying ? "Verifying..." : "Continue"}
            </button>
            <p className="text-[#6A6D76] text-center mt-10">
              Didn’t receive the email?{" "}
              <span
                className="text-[#00823b] cursor-pointer"
                onClick={handleResend}
              >
                {isResending ? "Resending..." : "Resend"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerificationCode;
