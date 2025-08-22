import React, { useState, useMemo } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import dayjs from "dayjs";

import img from "../../assets/block.png";
import { useGetRecentlyJoinedUsersQuery } from "../../redux/api/homePage/recentlyJoinedApi";
import { getImageUrl } from "../../config/envConfig";

const RecentlyJoinedUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, isLoading } = useGetRecentlyJoinedUsersQuery();
  console.log("Recently Joined Users Data:", data);

  // ✅ Map API data into table format
  const users = useMemo(() => {
    if (!data?.data?.recentUser) return [];
    return data.data.recentUser.map((u, index) => ({
      key: u._id,
      no: index + 1,
      name: `${u.fastname || ""} ${u.lastname || ""}`,
      img: u.photo
        ? `${getImageUrl(u.photo)}`
        : "https://avatar.iran.liara.run/public/15",
      date: dayjs(u.createdAt).format("YYYY-MM-DD"),
      phone: u.phoneNumber || "N/A",
      country: u.country || "N/A",
      subscription: u.subscription || "Free",
      userRole: u.userRole || "N/A",
      email: u.email,
      block: u.block || false,
      ...u, // keep all original data for modal
    }));
  }, [data]);

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const showModal2 = (user) => {
    setSelectedUser(user);
    setIsModalOpen2(true);
  };

  const handleCancel = () => setIsModalOpen(false);
  const handleCancel2 = () => setIsModalOpen2(false);

  const handleBlock = async () => {
    if (selectedUser) {
      // TODO: call block API here
      console.log("Blocking user:", selectedUser._id);
      setIsModalOpen(false);
    }
  };

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Full Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={getImageUrl(record.img)}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <div className="flex flex-col gap-[2px]">
            <span className="leading-none">{record.name}</span>
            <span className="leading-none text-gray-500 text-sm">
              {record.email}
            </span>
          </div>
        </div>
      ),
    },
    { title: "Contact Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Joined Date", dataIndex: "date", key: "date" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => showModal(record)}
            className={`border rounded-lg p-1 ${
              record.block
                ? "border-red-500 text-red-500 bg-red-100"
                : "border-[#00823b] text-[#00823b] bg-[#cce9ff]"
            }`}
          >
            <MdBlockFlipped className="w-8 h-8" />
          </button>
          <button
            onClick={() => showModal2(record)}
            className="border border-[#00823b] rounded-lg p-1 bg-[#cce9ff] text-[#00823b]"
          >
            <FaRegEye className="w-8 h-8" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#00823b",
            headerColor: "#fff",
            cellFontSize: 16,
            headerSplitColor: "#00823b",
          },
        },
      }}
    >
      <Table
        loading={isLoading}
        dataSource={users}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
      />

      {/* Block Modal */}
      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div className="flex flex-col justify-center items-center py-10">
          <img src={img} alt="Confirmation" className="w-40 h-40 mb-5" />
          <p className="text-3xl text-center text-gray-800">Warning</p>
          <p className="text-xl text-center mt-5">
            Do you want to block this user?
          </p>
          <div className="text-center py-5 w-full flex justify-center gap-4">
            <button
              onClick={handleCancel}
              className="border-2 border-[#00823b] text-[#00823b] font-semibold w-1/3 py-3 px-5 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleBlock}
              className="bg-[#00823b] !text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        open={isModalOpen2}
        centered
        onCancel={handleCancel2}
        footer={null}
        width={700}
      >
        {selectedUser && (
          <div className="w-full p-5 relative mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#00823b] mb-2">
                User Details
              </h1>
              <p className="text-gray-500 text-sm">
                See all details about {selectedUser.name}
              </p>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={selectedUser.img}
                  alt="user profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-[#00823b]">
                {selectedUser.name}
              </h2>
            </div>

            {/* Details Grid */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-2">
                <span className="font-bold text-gray-900">Name</span>
                <span className="text-gray-900">{selectedUser.name}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="font-bold text-gray-900">Email</span>
                <span className="text-gray-900">{selectedUser.email}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="font-bold text-gray-900">Phone</span>
                <span className="text-gray-900">{selectedUser.phone}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="font-bold text-gray-900">Joining Date</span>
                <span className="text-gray-900">{selectedUser.date}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default RecentlyJoinedUsers;
