import React, { useState } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

import img from "../../assets/block.png";


const RecentlyJoinedUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Demo data
  const demoUsers = [
    {
      key: "1",
      no: 1,
      name: "John Doe",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      date: "2025-05-20",
      phone: "+1 (555) 123-4567",
      country: "Bangladesh",
      subscription: "Free",
      userRole: "Business Asset Seller",
      email: "john.doe@example.com",
      block: false,
      totalListings: 15,
      activeListings: 8,
      approvedListings: 10,
      rejectedListings: 2,
      soldListing: 3,
    },
    {
      key: "2",
      no: 2,
      name: "Jane Smith",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      date: "2025-04-15",
      phone: "+44 7700 900123",
      country: "United Kingdom",
      subscription: "Premium",
      userRole: "Franchise Buyer",
      email: "jane.smith@example.co.uk",
      block: false,
      totalListings: 20,
      activeListings: 12,
      approvedListings: 18,
      rejectedListings: 1,
      soldListing: 5,
    },
    {
      key: "3",
      no: 3,
      name: "Ahmed Khan",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      date: "2025-03-10",
      phone: "+92 300 1234567",
      country: "Pakistan",
      subscription: "Free",
      userRole: "Business Asset Buyer",
      email: "ahmed.khan@example.pk",
      block: true,
      totalListings: 5,
      activeListings: 2,
      approvedListings: 3,
      rejectedListings: 2,
      soldListing: 1,
    },
    {
      key: "4",
      no: 4,
      name: "Maria Garcia",
      img: "https://randomuser.me/api/portraits/women/4.jpg",
      date: "2025-06-05",
      phone: "+34 600 123 456",
      country: "Spain",
      subscription: "Standard",
      userRole: "Franchise Seller",
      email: "maria.garcia@example.es",
      block: false,
      totalListings: 12,
      activeListings: 6,
      approvedListings: 9,
      rejectedListings: 1,
      soldListing: 4,
    },
    {
      key: "5",
      no: 5,
      name: "David Lee",
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      date: "2025-02-28",
      phone: "+1 (213) 555-7890",
      country: "United States",
      subscription: "Premium",
      userRole: "Business Broker",
      email: "david.lee@example.com",
      block: false,
      totalListings: 30,
      activeListings: 20,
      approvedListings: 25,
      rejectedListings: 3,
      soldListing: 10,
    },
  ];

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const showModal2 = (user) => {
    setSelectedUser(user);
    setIsModalOpen2(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const handleBlock = async () => {
    if (selectedUser) {
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
            src={record.img}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <div className="flex flex-col gap-[2px]">
            <span className="leading-none">{record.name}</span>
            <span className="leading-none">{record.email}</span>
          </div>
        </div>
      ),
    },
    { title: "Contact Number", dataIndex: "phone", key: "phone" },
    {
      title: "Email",
      key: "email",
      dataIndex: "email"
    },
    { title: "Joined Date", dataIndex: "date", key: "date" },


    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => showModal(record)}
            className={`border rounded-lg p-1 ${record.block
              ? "border-red-500 text-red-500 bg-red-100"
              : "border-[#00823b] text-[#00823b] bg-[#cce9ff]"
              }`}
          >
            <MdBlockFlipped
              className={`w-8 h-8 ${record.block
                ? "border-red-500 text-red-500 bg-red-100"
                : "border-[#00823b] text-[#00823b] bg-[#cce9ff]"
                }`}
            />
          </button>
          <button
            onClick={() => showModal2(record)}
            className="border border-[#00823b] rounded-lg p-1 bg-[#cce9ff] text-[#00823b]"
          >
            <FaRegEye className="w-8 h-8 text-[#00823b]" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            activeBorderColor: "#00823b",
          },
          Table: {
            headerBg: "#00823b",
            headerColor: "rgb(255,255,255)",
            cellFontSize: 16,
            headerSplitColor: "#00823b",
          },
        },
      }}
    >
      <Table
        dataSource={demoUsers}
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
        <div className="w-full p-5 relative mx-auto m">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#00823b] mb-2">User Details</h1>
            <p className="text-gray-500 text-sm">See all details about John Doe</p>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
              <img src="https://avatar.iran.liara.run/public/15" alt="user profile picture" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-[#00823b]">John Doe</h2>
          </div>

          {/* Details Grid */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center py-2">
              <span className="font-bold text-gray-900">Name</span>
              <span className="text-gray-900">John Doe.</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="font-bold text-gray-900">Email</span>
              <span className="text-gray-900">john@email.com</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="font-bold text-gray-900">Phone</span>
              <span className="text-gray-900">+1231341Z</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="font-bold text-gray-900">Joining Date</span>
              <span className="text-gray-900">02-24-2024</span>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default RecentlyJoinedUsers;
