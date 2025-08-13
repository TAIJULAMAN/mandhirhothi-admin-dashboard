import React, { useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { SidebarLink } from "../../Utils/Sideber/SidebarLink.jsx";
import { RiLogoutBoxLine } from "react-icons/ri";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  // const [setting_active, set_setting_active] = useState(false);
  const ref = useRef(null);

  // useEffect(() => {
  //   if (!ref.current) return;
  //   if (ref.current.querySelector(".active")) {
  //     set_setting_active(true);
  //   } else {
  //     set_setting_active(false);
  //   }
  // }, [ref, location.pathname]);

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-white bg-opacity-40 z-40 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <div
        ref={ref}
        className={`fixed md:static top-0 left-0 h-full md:h-auto bg-white px-4 pb-10 flex flex-col gap-3 z-50 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 
          w-[250px] md:w-full`}
      >
        {SidebarLink?.map((item) => (
          <NavLink
            onClick={() => {
              toggleSidebar(); // closes on mobile click
              // set_setting_active(false);
            }}
            to={item?.path}
            style={{
              width: "100%",
              justifyContent: "start",
              paddingLeft: "14px",
              paddingRight: "14px",
            }}
            className={`button-white w-full ${
              item?.path === location.pathname
                ? "!bg-[#00823b] !text-white"
                : "!bg-white !text-[#111]"
            } whitespace-nowrap links`}
            key={item?.path}
          >
            {item?.icon} {item?.label}
          </NavLink>
        ))}

        {/* Logout Button */}
        <div className="mt-10 w-full px-5 text-white">
          <Link to="/login">
            <button className="flex items-center gap-4 w-full py-3 rounded-lg bg-[#00823b] justify-center">
              <RiLogoutBoxLine className="w-5 h-5 font-bold" />
              <span>Logout</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
