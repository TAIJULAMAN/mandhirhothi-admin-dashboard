// CreateAdmin.jsx
import React, { useState, useEffect } from "react";
import { Table, Modal, message, ConfigProvider, Spin } from "antd";
import { MdDelete } from "react-icons/md";
import PageHeading from "../../Components/Shared/PageHeading";
import DeleteAdminModal from "./DeleteAdminModal";
import CreateAdminModal from "./CreateAdminModal";
import { useGetAllAdminsQuery } from "../../redux/api/adminApi";
import { getImageUrl } from "../../config/envConfig";

export default function CreateAdmin() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [page, setPage] = useState(1);
  const { data: adminData, isLoading, error, refetch } = useGetAllAdminsQuery({ limit: 10, page });
  const [admins, setAdmins] = useState([]);
  const [totalAdmins, setTotalAdmins] = useState(0);

  // Update admins when data changes
  useEffect(() => {
    if (adminData && adminData.success) {
      setAdmins(adminData.data.all_users || []);
      setTotalAdmins(adminData.data.meta.total || 0);
    }
  }, [adminData]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      message.error("Failed to fetch admins");
      console.error("Admin fetch error:", error);
    }
  }, [error]);

  // Function to show delete modal
  const showDeleteModal = (admin) => {
    setSelectedAdmin(admin);
    console.log(selectedAdmin);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAdmin = () => {
  
    setIsDeleteModalOpen(false);
    message.success("Admin deleted successfully");
  };

  const handleCreateAdmin = (newAdmin) => {
    // Add the new admin to the beginning of the list
    setAdmins([newAdmin, ...admins]);
    setIsCreateModalOpen(false);
    message.success("Admin created successfully");
    
    // Refetch data to ensure we have the latest from the server
    refetch();
  };

  const columns = [
    {
      title: "Admin",
      key: "content",
      render: (_, record) => (
        <div className="flex gap-3 items-center">
          <img
            src={getImageUrl(record?.photo) || "https://picsum.photos/200"}
            alt="Admin profile"
            className="w-12 h-12 object-cover rounded-full border-2 border-gray-200"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/48x48?text=Admin";
            }}
          />
          <div>
            <div className="text-gray-900 font-medium">
              {record.fastname} {record.lastname}
            </div>
            <div className="text-sm text-gray-600">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === "isProgress" 
            ? "bg-blue-100 text-blue-800" 
            : "bg-gray-100 text-gray-800"
        }`}>
          {status || "Unknown"}
        </span>
      ),
    },
    {
      title: "Verified",
      dataIndex: "isVerify",
      key: "isVerify",
      width: 100,
      render: (isVerify) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          isVerify 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {isVerify ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 100,
      render: (role) => (
        <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs">
          {role || "User"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <button
          onClick={() => showDeleteModal(record)}
          className="border border-red-500 rounded-lg p-1 cursor-pointer text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          title="Delete Admin"
        >
          <MdDelete className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="Admins" />
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#00823b] !text-white font-semibold max-w-[200px] whitespace-nowrap py-3 px-5 rounded-lg"
        >
          + Add Admin
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#00823b",
                headerColor: "#ffffff",
              },
            },
          }}
        >
          <Table
            dataSource={admins}
            columns={columns}
            rowKey="_id"
            scroll={{ x: "max-content" }}
            pagination={{
              pageSize: 10,
              current: page,
              total: totalAdmins,
              onChange: (page) => setPage(page),
              showSizeChanger: false,
            }}
          />
        </ConfigProvider>
      )}

      <DeleteAdminModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAdmin}
        adminData={selectedAdmin}
      />

      <CreateAdminModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateAdmin}
      />
    </>
  );
}