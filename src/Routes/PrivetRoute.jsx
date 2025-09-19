import React from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "admin") {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          // Alert non-admin users
          Swal.fire({
            icon: "error",
            title: "Access Denied",
            text: "Only admin can login.",
          });
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <span className="loader-black"></span>
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
