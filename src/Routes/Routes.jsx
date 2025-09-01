import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import UsersManage from "../pages/User/UsersManage";
import EarningPage from "../pages/Earning/EarningPage";
import VerificationCode from "../pages/Auth/Otp";
import Profile from "../pages/Profile/Profile";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "../pages/TermsCondition/TermsCondition";
import Faq from "../pages/Faq/Faq";
import AllSubscriber from "../pages/AllSubscriber/AllSubscriber";
import AboutUs from "../pages/AboutUs/AboutUs";
import BlockedUser from "../pages/User/BlockedUser";
import Notifications from "../pages/Notifications/Notifications";
import Blogs from "../pages/Blogs/Blogs";
import CreateAdmin from "../pages/CreateAdmin/CreateAdmin";
import Reports from "../pages/Report/Reports";
import Subscription from "../pages/Subscription/Subscription";
import Contact from "../pages/Contact/Contact";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      // <PrivateRoute>
      <Dashboard />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/user-management",
        element: (
          // <PrivateRoute>
          <UsersManage />
          // </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/create-admin",
        element: <CreateAdmin />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/all-subscriber",
        element: <AllSubscriber />,
      },
      {
        path: "/manage-subscription",
        element: <Subscription></Subscription>,
      },
      {
        path: "/earnings-management",
        element: <EarningPage />,
      },
      {
        path: "/terms-condition",
        element: <TermsCondition />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/All-Contact",
        element: <Contact />,
      },
      {
        path: "/faq-management",
        element: <Faq />,
      },
      {
        path: "/blocked-user",
        element: <BlockedUser />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/otp",
    element: <VerificationCode />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
]);
