import React, { useState } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { IoSearch } from "react-icons/io5";
import PageHeading from "../../Components/Shared/PageHeading";
import { useGetCurrentAllSubscribedMemberQuery } from "../../redux/api/subscriptionApi";
import { getImageUrl } from "../../config/envConfig";
import { FaRegEye } from "react-icons/fa";


const AllUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [page, setPage] = useState(1);

  // Fetch subscribed members
  const { data, isLoading } = useGetCurrentAllSubscribedMemberQuery({
    page,
    limit: 10,
  });

  const subscribedMembers = data?.data?.all_subscribed_memeber || [];
  const total = data?.data?.meta?.total || 0;

  const showModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_, __, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: "Name",
      key: "name",
      render: (_, record) =>
        `${record.buyerId.fastname} ${record.buyerId.lastname}`,
    },
    {
      title: "Email",
      key: "email",
      render: (_, record) => record.buyerId.email,
    },
    {
      title: "Subscription Plan",
      key: "plan",
      render: (_, record) => record.subscriptionId.subscriptionName,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => showModal(record)}
          className="border border-[#00823b] rounded-lg p-1 bg-[#cce9ff] text-[#00823b] cursor-pointer"
        >
          <FaRegEye className="w-8 h-8 text-[#00823b]" />
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="Subscribed Members" />
        <div className="relative w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-[#00823b] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
          />
          <span className="text-gray-400 absolute top-0 left-0 h-full px-5 flex items-center justify-center cursor-pointer">
            <IoSearch className="text-[1.3rem]" />
          </span>
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#00823b",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#00823b",
            },
            Pagination: {
              colorPrimary: "#00823b",
              itemActiveBg: "#00823b",
              itemActiveColor: "#ffffff",
            },
          },
        }}
      >
        <Table
          loading={isLoading}
          dataSource={subscribedMembers}
          columns={columns}
          rowKey="id"
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 10,
            total: total,
            current: page,
            showSizeChanger: false,
            onChange: (page) => setPage(page),
          }}
        />

        {/* View Modal */}
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
          width={600}
        >
          {selectedMember && (
            <div className="p-5">
              <h1 className="text-3xl font-bold text-[#00823b] mb-3">
                {selectedMember.buyerId.fastname}{" "}
                {selectedMember.buyerId.lastname}
              </h1>
              <p className="text-lg font-semibold mb-2">
                Email: {selectedMember.buyerId.email}
              </p>
              <p className="text-lg font-semibold mb-2">
                Subscription Plan:{" "}
                {selectedMember.subscriptionId.subscriptionName}
              </p>
              {selectedMember.buyerId.photo && (
                <img
                  src={getImageUrl(selectedMember.buyerId.photo)}
                  alt="User"
                  className="w-32 h-32 object-cover rounded-full mt-4"
                />
              )}
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default AllUsers;
