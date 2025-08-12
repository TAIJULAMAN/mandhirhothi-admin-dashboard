import React from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import img from "../../assets/block.png";
import { TbFileDownload } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";


const TransactionTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };



  const dataSource = [
    {
      _id: "1",
      Buyer: "John Doe",
      Seller: "James Smith",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      date: "2025-05-25",
      amount: "£10",
      Trx_ID: "#123456",
      Plate: "83JU",
    },
    {
      _id: "2",
      Buyer: "Emma Johnson",
      Seller: "Olivia Brown",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      date: "2025-05-24",
      amount: "$150",
      Trx_ID: "#234567",
      Plate: "AB12",
    },
    {
      _id: "3",
      Buyer: "Liam Williams",
      Seller: "Noah Miller",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      date: "2025-05-23",
      amount: "€75",
      Trx_ID: "#345678",
      Plate: "XZ90",
    },
    {
      _id: "4",
      Buyer: "Sophia Jones",
      Seller: "Mia Davis",
      img: "https://randomuser.me/api/portraits/women/4.jpg",
      date: "2025-05-22",
      amount: "$200",
      Trx_ID: "#456789",
      Plate: "CD34",
    },
    {
      _id: "5",
      Buyer: "James Garcia",
      Seller: "Benjamin Martinez",
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      date: "2025-05-21",
      amount: "£45",
      Trx_ID: "#567890",
      Plate: "EF56",
    },
    {
      _id: "6",
      Buyer: "Ava Rodriguez",
      Seller: "Isabella Hernandez",
      img: "https://randomuser.me/api/portraits/women/6.jpg",
      date: "2025-05-20",
      amount: "$320",
      Trx_ID: "#678901",
      Plate: "GH78",
    },
    {
      _id: "7",
      Buyer: "Mason Lopez",
      Seller: "Elijah Gonzalez",
      img: "https://randomuser.me/api/portraits/men/7.jpg",
      date: "2025-05-19",
      amount: "€150",
      Trx_ID: "#789012",
      Plate: "IJ90",
    },
    {
      _id: "8",
      Buyer: "Charlotte Wilson",
      Seller: "Amelia Moore",
      img: "https://randomuser.me/api/portraits/women/8.jpg",
      date: "2025-05-18",
      amount: "$75",
      Trx_ID: "#890123",
      Plate: "KL12",
    },
    {
      _id: "9",
      Buyer: "Ethan Taylor",
      Seller: "Alexander Anderson",
      img: "https://randomuser.me/api/portraits/men/9.jpg",
      date: "2025-05-17",
      amount: "£90",
      Trx_ID: "#901234",
      Plate: "MN34",
    },
    {
      _id: "10",
      Buyer: "Harper Thomas",
      Seller: "Evelyn Jackson",
      img: "https://randomuser.me/api/portraits/women/10.jpg",
      date: "2025-05-16",
      amount: "$110",
      Trx_ID: "#012345",
      Plate: "OP56",
    },
    {
      _id: "11",
      Buyer: "Daniel White",
      Seller: "Logan Harris",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
      date: "2025-05-15",
      amount: "€210",
      Trx_ID: "#112233",
      Plate: "QR78",
    },
    {
      _id: "12",
      Buyer: "Ella Martin",
      Seller: "Aria Thompson",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      date: "2025-05-14",
      amount: "$130",
      Trx_ID: "#223344",
      Plate: "ST90",
    },
    {
      _id: "13",
      Buyer: "Henry Lee",
      Seller: "Sebastian Scott",
      img: "https://randomuser.me/api/portraits/men/13.jpg",
      date: "2025-05-13",
      amount: "£55",
      Trx_ID: "#334455",
      Plate: "UV12",
    },
    {
      _id: "14",
      Buyer: "Scarlett Adams",
      Seller: "Lily Walker",
      img: "https://randomuser.me/api/portraits/women/14.jpg",
      date: "2025-05-12",
      amount: "$90",
      Trx_ID: "#445566",
      Plate: "WX34",
    },
    {
      _id: "15",
      Buyer: "Owen Hall",
      Seller: "Jack Young",
      img: "https://randomuser.me/api/portraits/men/15.jpg",
      date: "2025-05-11",
      amount: "€175",
      Trx_ID: "#556677",
      Plate: "YZ56",
    },
    {
      _id: "16",
      Buyer: "Chloe Allen",
      Seller: "Zoey King",
      img: "https://randomuser.me/api/portraits/women/16.jpg",
      date: "2025-05-10",
      amount: "$250",
      Trx_ID: "#667788",
      Plate: "AB78",
    },
    {
      _id: "17",
      Buyer: "Jacob Wright",
      Seller: "Lucas Hill",
      img: "https://randomuser.me/api/portraits/men/17.jpg",
      date: "2025-05-09",
      amount: "£120",
      Trx_ID: "#778899",
      Plate: "CD90",
    },
    {
      _id: "18",
      Buyer: "Grace Green",
      Seller: "Victoria Baker",
      img: "https://randomuser.me/api/portraits/women/18.jpg",
      date: "2025-05-08",
      amount: "$310",
      Trx_ID: "#889900",
      Plate: "EF12",
    },
    {
      _id: "19",
      Buyer: "Michael Nelson",
      Seller: "William Carter",
      img: "https://randomuser.me/api/portraits/men/19.jpg",
      date: "2025-05-07",
      amount: "€85",
      Trx_ID: "#990011",
      Plate: "GH34",
    },
    {
      _id: "20",
      Buyer: "Luna Perez",
      Seller: "Hannah Rivera",
      img: "https://randomuser.me/api/portraits/women/20.jpg",
      date: "2025-05-06",
      amount: "$95",
      Trx_ID: "#001122",
      Plate: "IJ56",
    },
    {
      _id: "21",
      Buyer: "Samuel Cooper",
      Seller: "Matthew Reed",
      img: "https://randomuser.me/api/portraits/men/21.jpg",
      date: "2025-05-05",
      amount: "£300",
      Trx_ID: "#112200",
      Plate: "KL78",
    },
    {
      _id: "22",
      Buyer: "Avery Bailey",
      Seller: "Nora Price",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
      date: "2025-05-04",
      amount: "$65",
      Trx_ID: "#221100",
      Plate: "MN90",
    },
    {
      _id: "23",
      Buyer: "David Torres",
      Seller: "Anthony Wood",
      img: "https://randomuser.me/api/portraits/men/23.jpg",
      date: "2025-05-03",
      amount: "€140",
      Trx_ID: "#331122",
      Plate: "OP12",
    },
    {
      _id: "24",
      Buyer: "Ella Ramirez",
      Seller: "Penelope Ward",
      img: "https://randomuser.me/api/portraits/women/24.jpg",
      date: "2025-05-02",
      amount: "$170",
      Trx_ID: "#441133",
      Plate: "QR34",
    },
    {
      _id: "25",
      Buyer: "Joseph Brooks",
      Seller: "Gabriel Foster",
      img: "https://randomuser.me/api/portraits/men/25.jpg",
      date: "2025-05-01",
      amount: "£60",
      Trx_ID: "#551144",
      Plate: "ST56",
    },
    {
      _id: "26",
      Buyer: "Aria Gray",
      Seller: "Madison Torres",
      img: "https://randomuser.me/api/portraits/women/26.jpg",
      date: "2025-04-30",
      amount: "$80",
      Trx_ID: "#661155",
      Plate: "UV78",
    },
    {
      _id: "27",
      Buyer: "Christopher James",
      Seller: "Andrew Bennett",
      img: "https://randomuser.me/api/portraits/men/27.jpg",
      date: "2025-04-29",
      amount: "€125",
      Trx_ID: "#771166",
      Plate: "WX90",
    },
    {
      _id: "28",
      Buyer: "Mila Hughes",
      Seller: "Paisley Hayes",
      img: "https://randomuser.me/api/portraits/women/28.jpg",
      date: "2025-04-28",
      amount: "$145",
      Trx_ID: "#881177",
      Plate: "YZ12",
    },
    {
      _id: "29",
      Buyer: "Nathan Ross",
      Seller: "Ryan Morris",
      img: "https://randomuser.me/api/portraits/men/29.jpg",
      date: "2025-04-27",
      amount: "£95",
      Trx_ID: "#991188",
      Plate: "AB34",
    },
    {
      _id: "30",
      Buyer: "Zoe Sanders",
      Seller: "Aurora Bryant",
      img: "https://randomuser.me/api/portraits/women/30.jpg",
      date: "2025-04-26",
      amount: "$200",
      Trx_ID: "#101199",
      Plate: "CD56",
    }
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Buyer",
      key: "Buyer",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src="https://avatar.iran.liara.run/public/16"
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <div className="flex flex-col gap-[2px]">
            <span className="leading-none">{record.Buyer}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Seller",
      key: "Seller",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src="https://avatar.iran.liara.run/public/8"
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <div className="flex flex-col gap-[2px]">
            <span className="leading-none">{record.Seller}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Price",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Trx ID",
      dataIndex: "Trx_ID",
      key: "Trx_ID",
    },
    {
      title: "Plate",
      key: "amount",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <span className="leading-none">${record?.amount}</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            // onClick={() => showModal2(record)}
            className="border border-[#00823b] rounded-lg p-1 bg-[#cce9ff] text-[#00823b]"
          >
            <TbFileDownload className="w-8 h-8 text-[#00823b]" />
          </button>
          <button
            onClick={() => showModal(record)}
            className="border border-[#00823b] rounded-lg p-1 bg-[#cce9ff] text-[#00823b]"
          >
            <FaRegEye className="w-8 h-8 text-[#00823b]" />
          </button>
        </div>
      ),
    },

  ];

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#14803c",
            },
            Table: {
              headerBg: "#14803c",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#14803c",
            },
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 10,
            total: dataSource.length,
            current: page,
            showSizeChanger: false,
            onChange: (page) => setPage(page),
          }}
          scroll={{ x: "max-content" }}
        />

        {/*View Modal */}
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center items-center p-5">
            <div className="max-w-xl w-full mx-auto bg-white">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-green-600 mb-2">Transaction Details</h1>
              </div>
              {/* Transaction Information */}
              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Transaction ID</span>
                  <span className="text-gray-700">#12345678</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Plans</span>
                  <span className="text-gray-700">Premium/Monthly</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Date</span>
                  <span className="text-gray-700">02-24-2024</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Name</span>
                  <span className="text-gray-700">John Doe.</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">A/C number</span>
                  <span className="text-gray-700">**** **** **** *545</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Email</span>
                  <span className="text-gray-700">john@email.com</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Transaction amount</span>
                  <span className="text-gray-700">£10</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default TransactionTable;
