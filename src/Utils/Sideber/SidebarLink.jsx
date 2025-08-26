import React from "react";
import { BiCategory } from "react-icons/bi";
import { CiCircleQuestion } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

import { GoChecklist } from "react-icons/go";
import { ImInfo } from "react-icons/im";
import {
  LuChartNoAxesCombined,
  LuClipboardList,
  LuCrown,
  LuNotebookPen,
} from "react-icons/lu";
import { MdBlockFlipped, MdOutlineManageHistory, MdOutlineReportProblem } from "react-icons/md";
import { IoIosNotificationsOutline, IoMdSettings } from "react-icons/io";
import {
  RiContactsLine,
  RiCoupon4Line,
  RiDashboard2Line,
  RiUserSettingsLine,
} from "react-icons/ri";
import { TbMessageQuestion } from "react-icons/tb";
import { GrUserSettings } from "react-icons/gr";
import { BsCardChecklist } from "react-icons/bs";


export const SidebarLink = [
  {
    path: "/",
    label: "Dashboard",
    icon: <RiDashboard2Line size={24} />,
  },
  {
    path: "/user-management",
    label: "User",
    icon: <FaRegUserCircle size={24} />,
  },
  {
    path: "/earnings-management",
    label: "Earnings",
    icon: <LuChartNoAxesCombined size={24} />,
  },
  {
    path: "/all-subscriber",
    label: "All Subscribers",
    icon: <LuCrown size={24} />,
  },
    {
    path: "/manage-subscription",
    label: "Subscriptions",
    icon: <BsCardChecklist size={24} />,
  },
  {
    path: "/blogs",
    label: "Blogs ",
    icon: <LuNotebookPen size={24} />,
  },
  {
    path: "/create-admin",
    label: "Create Admin",
    icon: <GrUserSettings size={24} />,
  },
  // {
  //   path: "/reports",
  //   label: "Report",
  //   icon: <MdOutlineReportProblem size={24} />,
  // },

  {
    path: "/profile",
    label: "Profile Setting",
    icon: <IoMdSettings size={24} />,
  },
  
  {
    path: "/All-Contact",
    label: "All Contact",
    icon: <RiContactsLine size={24} />,
  },
  {
    path: "/faq-management",
    label: "FAQ",
    icon: <TbMessageQuestion size={24} />,
  },
  {
    path: "/privacy-policy",
    label: "Privacy Policy",
    icon: <GoChecklist size={24} />,
  },
  {
    path: "/terms-condition",
    label: "Terms & Condition",
    icon: <CiCircleQuestion size={24} />,
  },
  {
    path: "/about-us",
    label: "About Us",
    icon: <ImInfo size={24} />,
  },
];
