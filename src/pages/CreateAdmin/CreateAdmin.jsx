// CreateAdmin.jsx
import React, { useState } from "react";
import { Table, Modal, message, ConfigProvider } from "antd";
import { MdDelete } from "react-icons/md";
import PageHeading from "../../Components/Shared/PageHeading";
import DeleteAdminModal from "./DeleteAdminModal";
import CreateAdminModal from "./CreateAdminModal";

export default function CreateAdmin() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [page, setPage] = useState(1);
  const [admins, setAdmins] = useState([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-01-15",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      joinDate: "2024-02-20",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
  ]);

  const showDeleteModal = (admin) => {
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAdmin = () => {
    setAdmins(admins.filter((admin) => admin.id !== selectedAdmin.id));
    setIsDeleteModalOpen(false);
    message.success("Admin deleted successfully");
  };

  const handleCreateAdmin = (newAdmin) => {
    setAdmins([...admins, newAdmin]);
    setIsCreateModalOpen(false);
    message.success("Admin created successfully");
  };

  const columns = [
    {
      title: "Admin",
      key: "content",
      render: (_, record) => (
        <div className="flex gap-3 items-center">
          <img
            src={record.profileImage}
            alt="Admin profile"
            className="w-12 h-12 object-cover rounded-full border-2 border-gray-200"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/48x48?text=Admin";
            }}
          />
          <div>
            <div className="text-gray-900 font-medium">{record.name}</div>
            <div className="text-sm text-gray-600">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      width: 120,
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
          rowKey="id"
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 10,
            current: page,
            onChange: (page) => setPage(page),
          }}
        />
      </ConfigProvider>

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
