import React, { useState } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

import img from "../../assets/block.png";


const AllUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);

  // Demo users data
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
    {
      key: "6",
      no: 6,
      name: "Sophia Brown",
      img: "https://randomuser.me/api/portraits/women/6.jpg",
      date: "2025-01-18",
      phone: "+61 412 345 678",
      country: "Australia",
      subscription: "Standard",
      userRole: "Franchise Buyer",
      email: "sophia.brown@example.au",
      block: false,
      totalListings: 8,
      activeListings: 4,
      approvedListings: 7,
      rejectedListings: 1,
      soldListing: 2,
    },
    {
      key: "7",
      no: 7,
      name: "Liam Johnson",
      img: "https://randomuser.me/api/portraits/men/7.jpg",
      date: "2025-07-12",
      phone: "+27 82 555 1234",
      country: "South Africa",
      subscription: "Free",
      userRole: "Business Asset Seller",
      email: "liam.johnson@example.za",
      block: true,
      totalListings: 3,
      activeListings: 1,
      approvedListings: 2,
      rejectedListings: 1,
      soldListing: 0,
    },
    {
      key: "8",
      no: 8,
      name: "Emma Wilson",
      img: "https://randomuser.me/api/portraits/women/8.jpg",
      date: "2025-03-22",
      phone: "+49 170 1234567",
      country: "Germany",
      subscription: "Premium",
      userRole: "Franchise Seller",
      email: "emma.wilson@example.de",
      block: false,
      totalListings: 18,
      activeListings: 10,
      approvedListings: 16,
      rejectedListings: 1,
      soldListing: 6,
    },
    {
      key: "9",
      no: 9,
      name: "Noah Martinez",
      img: "https://randomuser.me/api/portraits/men/9.jpg",
      date: "2025-05-05",
      phone: "+33 612 345 678",
      country: "France",
      subscription: "Standard",
      userRole: "Business Broker",
      email: "noah.martinez@example.fr",
      block: false,
      totalListings: 14,
      activeListings: 9,
      approvedListings: 12,
      rejectedListings: 1,
      soldListing: 4,
    },
    {
      key: "10",
      no: 10,
      name: "Olivia Davis",
      img: "https://randomuser.me/api/portraits/women/10.jpg",
      date: "2025-04-01",
      phone: "+1 (646) 555-2345",
      country: "United States",
      subscription: "Free",
      userRole: "Franchise Buyer",
      email: "olivia.davis@example.com",
      block: false,
      totalListings: 6,
      activeListings: 3,
      approvedListings: 5,
      rejectedListings: 1,
      soldListing: 2,
    },
    {
      key: "11",
      no: 11,
      name: "Isabella Turner",
      img: "https://randomuser.me/api/portraits/women/11.jpg",
      date: "2025-02-05",
      phone: "+1 (202) 555-9988",
      country: "Canada",
      subscription: "Standard",
      userRole: "Business Asset Buyer",
      email: "isabella.turner@example.ca",
      block: false,
      totalListings: 7,
      activeListings: 3,
      approvedListings: 6,
      rejectedListings: 1,
      soldListing: 2,
    },
    {
      key: "12",
      no: 12,
      name: "Mason Clark",
      img: "https://randomuser.me/api/portraits/men/12.jpg",
      date: "2025-07-08",
      phone: "+64 21 555 9090",
      country: "New Zealand",
      subscription: "Premium",
      userRole: "Franchise Seller",
      email: "mason.clark@example.nz",
      block: false,
      totalListings: 22,
      activeListings: 15,
      approvedListings: 20,
      rejectedListings: 2,
      soldListing: 8,
    },
    {
      key: "13",
      no: 13,
      name: "Chloe Hall",
      img: "https://randomuser.me/api/portraits/women/13.jpg",
      date: "2025-06-18",
      phone: "+65 8123 4567",
      country: "Singapore",
      subscription: "Free",
      userRole: "Business Broker",
      email: "chloe.hall@example.sg",
      block: true,
      totalListings: 4,
      activeListings: 1,
      approvedListings: 3,
      rejectedListings: 1,
      soldListing: 1,
    },
    {
      key: "14",
      no: 14,
      name: "Ethan Wright",
      img: "https://randomuser.me/api/portraits/men/14.jpg",
      date: "2025-05-28",
      phone: "+1 (415) 555-1122",
      country: "United States",
      subscription: "Standard",
      userRole: "Franchise Buyer",
      email: "ethan.wright@example.com",
      block: false,
      totalListings: 9,
      activeListings: 4,
      approvedListings: 7,
      rejectedListings: 1,
      soldListing: 3,
    },
    {
      key: "15",
      no: 15,
      name: "Mia Harris",
      img: "https://randomuser.me/api/portraits/women/15.jpg",
      date: "2025-01-25",
      phone: "+353 86 123 4567",
      country: "Ireland",
      subscription: "Premium",
      userRole: "Business Asset Seller",
      email: "mia.harris@example.ie",
      block: false,
      totalListings: 19,
      activeListings: 12,
      approvedListings: 17,
      rejectedListings: 2,
      soldListing: 6,
    },
    {
      key: "16",
      no: 16,
      name: "James Evans",
      img: "https://randomuser.me/api/portraits/men/16.jpg",
      date: "2025-03-12",
      phone: "+81 80-1234-5678",
      country: "Japan",
      subscription: "Free",
      userRole: "Franchise Seller",
      email: "james.evans@example.jp",
      block: false,
      totalListings: 10,
      activeListings: 5,
      approvedListings: 8,
      rejectedListings: 2,
      soldListing: 3,
    },
    {
      key: "17",
      no: 17,
      name: "Ella Scott",
      img: "https://randomuser.me/api/portraits/women/17.jpg",
      date: "2025-06-10",
      phone: "+32 470 12 34 56",
      country: "Belgium",
      subscription: "Standard",
      userRole: "Business Broker",
      email: "ella.scott@example.be",
      block: false,
      totalListings: 11,
      activeListings: 6,
      approvedListings: 9,
      rejectedListings: 1,
      soldListing: 4,
    },
    {
      key: "18",
      no: 18,
      name: "Lucas Green",
      img: "https://randomuser.me/api/portraits/men/18.jpg",
      date: "2025-05-02",
      phone: "+351 912 345 678",
      country: "Portugal",
      subscription: "Premium",
      userRole: "Franchise Buyer",
      email: "lucas.green@example.pt",
      block: false,
      totalListings: 17,
      activeListings: 11,
      approvedListings: 15,
      rejectedListings: 1,
      soldListing: 5,
    },
    {
      key: "19",
      no: 19,
      name: "Grace Adams",
      img: "https://randomuser.me/api/portraits/women/19.jpg",
      date: "2025-02-15",
      phone: "+972 50-123-4567",
      country: "Israel",
      subscription: "Free",
      userRole: "Business Asset Buyer",
      email: "grace.adams@example.il",
      block: true,
      totalListings: 2,
      activeListings: 1,
      approvedListings: 1,
      rejectedListings: 1,
      soldListing: 0,
    },
    {
      key: "20",
      no: 20,
      name: "Benjamin Carter",
      img: "https://randomuser.me/api/portraits/men/20.jpg",
      date: "2025-07-01",
      phone: "+46 70 123 45 67",
      country: "Sweden",
      subscription: "Standard",
      userRole: "Franchise Seller",
      email: "benjamin.carter@example.se",
      block: false,
      totalListings: 13,
      activeListings: 8,
      approvedListings: 11,
      rejectedListings: 1,
      soldListing: 4,
    },
    {
      key: "21",
      no: 21,
      name: "Hannah Mitchell",
      img: "https://randomuser.me/api/portraits/women/21.jpg",
      date: "2025-04-18",
      phone: "+420 777 123 456",
      country: "Czech Republic",
      subscription: "Premium",
      userRole: "Business Broker",
      email: "hannah.mitchell@example.cz",
      block: false,
      totalListings: 21,
      activeListings: 14,
      approvedListings: 19,
      rejectedListings: 1,
      soldListing: 7,
    },
    {
      key: "22",
      no: 22,
      name: "Daniel Perez",
      img: "https://randomuser.me/api/portraits/men/22.jpg",
      date: "2025-03-25",
      phone: "+55 21 91234-5678",
      country: "Brazil",
      subscription: "Free",
      userRole: "Franchise Buyer",
      email: "daniel.perez@example.br",
      block: false,
      totalListings: 8,
      activeListings: 3,
      approvedListings: 7,
      rejectedListings: 1,
      soldListing: 2,
    },
    {
      key: "23",
      no: 23,
      name: "Victoria King",
      img: "https://randomuser.me/api/portraits/women/23.jpg",
      date: "2025-02-08",
      phone: "+41 79 123 45 67",
      country: "Switzerland",
      subscription: "Standard",
      userRole: "Business Asset Seller",
      email: "victoria.king@example.ch",
      block: false,
      totalListings: 16,
      activeListings: 9,
      approvedListings: 14,
      rejectedListings: 2,
      soldListing: 5,
    },
    {
      key: "24",
      no: 24,
      name: "Sebastian Rivera",
      img: "https://randomuser.me/api/portraits/men/24.jpg",
      date: "2025-01-14",
      phone: "+52 55 1234 5678",
      country: "Mexico",
      subscription: "Premium",
      userRole: "Franchise Seller",
      email: "sebastian.rivera@example.mx",
      block: false,
      totalListings: 24,
      activeListings: 15,
      approvedListings: 22,
      rejectedListings: 2,
      soldListing: 9,
    },
    {
      key: "25",
      no: 25,
      name: "Amelia Morris",
      img: "https://randomuser.me/api/portraits/women/25.jpg",
      date: "2025-07-05",
      phone: "+48 600 123 456",
      country: "Poland",
      subscription: "Free",
      userRole: "Franchise Buyer",
      email: "amelia.morris@example.pl",
      block: false,
      totalListings: 5,
      activeListings: 2,
      approvedListings: 4,
      rejectedListings: 1,
      soldListing: 1,
    },
    {
      key: "26",
      no: 26,
      name: "Jack White",
      img: "https://randomuser.me/api/portraits/men/26.jpg",
      date: "2025-06-14",
      phone: "+31 6 1234 5678",
      country: "Netherlands",
      subscription: "Standard",
      userRole: "Business Broker",
      email: "jack.white@example.nl",
      block: false,
      totalListings: 14,
      activeListings: 7,
      approvedListings: 12,
      rejectedListings: 1,
      soldListing: 3,
    },
    {
      key: "27",
      no: 27,
      name: "Scarlett Bailey",
      img: "https://randomuser.me/api/portraits/women/27.jpg",
      date: "2025-04-09",
      phone: "+1 (305) 555-8899",
      country: "United States",
      subscription: "Premium",
      userRole: "Business Asset Seller",
      email: "scarlett.bailey@example.com",
      block: false,
      totalListings: 20,
      activeListings: 13,
      approvedListings: 18,
      rejectedListings: 2,
      soldListing: 6,
    },
    {
      key: "28",
      no: 28,
      name: "Henry Cooper",
      img: "https://randomuser.me/api/portraits/men/28.jpg",
      date: "2025-03-03",
      phone: "+43 660 1234567",
      country: "Austria",
      subscription: "Free",
      userRole: "Franchise Buyer",
      email: "henry.cooper@example.at",
      block: true,
      totalListings: 6,
      activeListings: 2,
      approvedListings: 4,
      rejectedListings: 2,
      soldListing: 1,
    },
    {
      key: "29",
      no: 29,
      name: "Zoe Campbell",
      img: "https://randomuser.me/api/portraits/women/29.jpg",
      date: "2025-02-20",
      phone: "+45 50 12 34 56",
      country: "Denmark",
      subscription: "Standard",
      userRole: "Franchise Seller",
      email: "zoe.campbell@example.dk",
      block: false,
      totalListings: 12,
      activeListings: 7,
      approvedListings: 10,
      rejectedListings: 1,
      soldListing: 3,
    },
    {
      key: "30",
      no: 30,
      name: "Matthew Parker",
      img: "https://randomuser.me/api/portraits/men/30.jpg",
      date: "2025-01-30",
      phone: "+1 (707) 555-4455",
      country: "United States",
      subscription: "Premium",
      userRole: "Business Broker",
      email: "matthew.parker@example.com",
      block: false,
      totalListings: 28,
      activeListings: 18,
      approvedListings: 26,
      rejectedListings: 2,
      soldListing: 9,
    }
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
      // In demo mode, just close the modal
      setIsModalOpen(false);
    }
  };

  const columns = [
    { 
      title: "No", 
      key: "no",
      render: (_, record, index) => {
        return (page - 1) * 10 + index + 1;
      }
    },
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
          Pagination: {
            colorPrimary: "#00823b",
            colorPrimaryHover: "#00823b",
            itemActiveBg: "#00823b",
            itemActiveColor: "#ffffff",
            colorBgTextHover: "#00823b",
            colorText: "#00823b",
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
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 10,
          total: demoUsers.length,
          current: page,
          showSizeChanger: false,
          onChange: (page) => setPage(page),
        }}
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

export default AllUsers;
