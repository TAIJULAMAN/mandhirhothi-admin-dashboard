import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BrandLogo from "../../Components/Shared/BrandLogo";
import {
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} from "../../redux/api/authApi";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slice/authSlice";

function VerificationCode() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [resendCooldown, setResendCooldown] = useState(0); // seconds
  const dispatch = useDispatch();

  // resend
  const [
    forgotPassword,
    {
      isLoading: isResending,
      isSuccess: resendSuccess,
      isError: resendError,
      error: resendErr,
    },
  ] = useForgotPasswordMutation();

  // verify
  const [
    verifyEmail,
    {
      data: verifyData, // 
      isLoading: isVerifying,
      isSuccess: verifySuccess,
      isError: verifyError,
      error: verifyErr,
    },
  ] = useVerifyEmailMutation();

  // handle resend toast
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

  // resend cooldown ticker
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => {
      setResendCooldown((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  // handle verify toast + token save to Redux
  useEffect(() => {
    if (verifySuccess && verifyData) {
      const token = verifyData?.data; // 
      console.log("Received token:", token);

      if (token) {
        // Save token in Redux auth state
        dispatch(
          setUser({
            user: {},
            token,
          })
        );
        navigate("/reset-password");
      }

      Swal.fire({
        icon: "success",
        title: "Verification successful!",
        text: "Your email has been successfully verified.",
      });
    }

    if (verifyError) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: verifyErr?.data?.message || "Invalid code. Please try again.",
      });
    }
  }, [verifySuccess, verifyError, verifyErr, verifyData, navigate, dispatch]);

  const handleChange = (value, index) => {
    const digits = (value || "").replace(/\D/g, "");
    const newCode = [...code];
    if (digits.length <= 1) {
      newCode[index] = digits;
      setCode(newCode);
      if (digits && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
      return;
    }
    // If user pasted multiple digits into a single box, distribute them
    let i = index;
    for (const d of digits) {
      if (i > 5) break;
      newCode[i] = d;
      i++;
    }
    setCode(newCode);
    if (i <= 5) inputRefs.current[i]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (code[index]) {
        // Clear current digit
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
        return;
      }
      if (index > 0) {
        // Move to previous and clear it
        inputRefs.current[index - 1]?.focus();
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const text = (e.clipboardData?.getData("text") || "").replace(/\D/g, "");
    if (!text) return;
    const newCode = [...code];
    let i = index;
    for (const d of text) {
      if (i > 5) break;
      newCode[i] = d;
      i++;
    }
    setCode(newCode);
    if (i <= 5) inputRefs.current[i]?.focus();
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

    const numberedCode = parseInt(enteredCode, 10);

    const payload = { verificationCode: numberedCode };
    console.log("sending payload:", payload);

    verifyEmail(payload); // 
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
    if (resendCooldown > 0 || isResending) return;
    forgotPassword({ email });
    setResendCooldown(30);
    
  };

  const allFilled = code.every((d) => d !== "");

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
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (allFilled) handleVerifyCode();
            }}
          >
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => handlePaste(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="shadow-xs w-12 h-12 text-2xl text-center border border-[#00823b] text-[#00823b] rounded-lg focus:outline-none"
                />
              ))}
            </div>

            <div className="flex flex-col gap-5 justify-center items-center text-white">
              <button
                onClick={handleVerifyCode}
                disabled={isVerifying || !allFilled}
                type="button"
                className="whitespace-nowrap w-full bg-[#00823b] text-white font-semibold py-3 rounded-lg shadow-lg cursor-pointer my-5"
              >
                {isVerifying ? "Verifying..." : allFilled ? "Continue" : "Enter 6-digit code"}
              </button>
              <p className="text-[#6A6D76] text-center mt-10">
                Didn’t receive the email?{" "}
                <button
                  type="button"
                  className={`text-[#00823b] ${
                    resendCooldown > 0 || isResending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || isResending}
                >
                  {isResending ? "Resending..." : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;
