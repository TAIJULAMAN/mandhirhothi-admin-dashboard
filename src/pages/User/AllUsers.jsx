import React, { useEffect, useState } from "react";
import { ConfigProvider, Modal, Table, Input, message } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import img from "../../assets/block.png";
import {
  useChangeStatusMutation,
  useGetAllUserQuery,
} from "../../redux/api/userApi";
import Loader from "../../Components/Shared/Loaders/Loader";
import ErrorPage from "../../Components/Shared/Error/ErrorPage";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useGetAllUserQuery({
    page,
    limit,
    searchTerm: searchTerm,
  });

  const [
    changeStatus,
    {
      isLoading: changeStatusLoading,
      isSuccess: changeStatusSuccess,
      error: changeStatusError,
    },
  ] = useChangeStatusMutation();

  useEffect(() => {
    if (!changeStatusLoading && !changeStatusSuccess && changeStatusError) {
      const errMsg =
        changeStatusError?.data?.message ||
        changeStatusError?.error ||
        changeStatusError?.message ||
        "Something went wrong";

      toast.error(errMsg);
    }
  }, [changeStatusLoading, changeStatusError, changeStatusSuccess]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage message={error?.message} />;
  }

  const users = data?.data?.all_users || [];
  const { page: currentPage, limit: pageLimit, total } = data?.data?.meta || {};

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
    setSelectedUser(null);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
    setSelectedUser(null);
  };

  const handleBlock = async (id) => {
    try {
      const result = await changeStatus({
        id,
        status: { status: selectedUser?.status === "blocked" ? true : false },
      }).unwrap();

      if (result) {
        message.success(`successfully  change status `);

        setIsModalOpen(false);
        setSelectedUser(null);
      } else {
        message.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      message.error(
        error?.data?.message || "An error occurred while updating user status"
      );
    }
  };

  // const handleSearch = (value) => {
  //   setSearchTerm(value);
  //   setPage(1);
  // };

  const transformedUsers = users.map((user) => ({
    ...user,
    key: user._id,
    name: `${user.fastname || ""} ${user.lastname || ""}`.trim(),
    email: user.email,
    phone: user.phoneNumber,
    date: new Date().toLocaleDateString(),
    img: user.photo || "https://avatar.iran.liara.run/public/15",
    block: user.isBlocked || false,
  }));

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_, record, index) => {
        return (currentPage - 1) * pageLimit + index + 1;
      },
    },
    {
      title: "Full Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record?.img}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
            onError={(e) => {
              e.target.src = "https://avatar.iran.liara.run/public/15";
            }}
          />
          <div className="flex flex-col gap-[2px]">
            <span className="leading-none">{record?.name}</span>
            <span className="leading-none text-gray-500 text-sm">
              {record.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Number",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || "N/A",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            role === "admin"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {role?.charAt(0).toUpperCase() + role?.slice(1)}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            record.isVerify
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {record.isVerify ? "Verified" : "Unverified"}
        </span>
      ),
    },
    {
      title: "Progress Status",
      dataIndex: "status",
      key: "progressStatus",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            status === "isProgress"
              ? "bg-yellow-100 text-yellow-800"
              : status === "completed"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status === "isProgress"
            ? "In Progress"
            : status?.charAt(0).toUpperCase() + status?.slice(1) || "N/A"}
        </span>
      ),
    },
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
            <MdBlockFlipped
              className={`w-8 h-8 ${
                record.block
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
          Input: {
            activeBorderColor: "#00823b",
            hoverBorderColor: "#00823b",
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
      <div className="mb-4">
        {/* Search Bar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#00823b]">All Users</h2>
          <div className="w-80">
            {/* <Input
              placeholder="Search by name, email, or role..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
              size="large"
              className="rounded-lg"
            /> */}
          </div>
        </div>
      </div>

      <Table
        dataSource={transformedUsers}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: pageLimit,
          total: total,
          current: currentPage,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} users`,
          onChange: (newPage) => setPage(newPage),
        }}
      />

      {/* Block/Unblock Modal */}
      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div className="flex flex-col justify-center items-center py-10">
          <img src={img} alt="Confirmation" className="w-40 h-40 mb-5" />
          <p className="text-3xl text-center text-gray-800">Warning</p>
          <p className="text-xl text-center mt-5">
            Do you want to {selectedUser?.block ? "unblock" : "block"} this
            user?
          </p>
          <div className="text-center py-5 w-full flex justify-center gap-4">
            <button
              onClick={handleCancel}
              className="border-2 border-[#00823b] text-[#00823b] font-semibold w-1/3 py-3 px-5 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // If user is currently blocked, unblock them (status: false)
                // If user is currently unblocked, block them (status: true)
                handleBlock(selectedUser?._id);
              }}
              disabled={changeStatusLoading}
              className="bg-[#00823b] !text-white font-semibold w-1/3 py-3 px-5 rounded-lg disabled:opacity-50"
            >
              {changeStatusLoading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={isModalOpen2}
        centered
        onCancel={handleCancel2}
        footer={null}
        width={700}
      >
        {selectedUser && (
          <div className="w-full p-5 relative mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#00823b] mb-2">
                User Details
              </h1>
              <p className="text-gray-500 text-sm">
                See all details about {selectedUser.name}
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={selectedUser.img}
                  alt="user profile picture"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://avatar.iran.liara.run/public/15";
                  }}
                />
              </div>
              <h2 className="text-xl font-bold text-[#00823b]">
                {selectedUser.name}
              </h2>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2">
                <span className="font-bold text-gray-900">Name</span>
                <span className="text-gray-900">{selectedUser.name}</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="font-bold text-gray-900">Email</span>
                <span className="text-gray-900">{selectedUser.email}</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="font-bold text-gray-900">Phone</span>
                <span className="text-gray-900">
                  {selectedUser.phone || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="font-bold text-gray-900">Role</span>
                <span className="text-gray-900 capitalize">
                  {selectedUser.role}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="font-bold text-gray-900">Status</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedUser.isVerify
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedUser.isVerify ? "Verified" : "Unverified"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="font-bold text-gray-900">Progress Status</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedUser.status === "isProgress"
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedUser.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {selectedUser.status === "isProgress"
                    ? "In Progress"
                    : selectedUser.status?.charAt(0).toUpperCase() +
                        selectedUser.status?.slice(1) || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="font-bold text-gray-900">Block Status</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedUser.block
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {selectedUser.block ? "Blocked" : "Active"}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default AllUsers;
