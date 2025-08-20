import React, { useState } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { IoSearch } from "react-icons/io5";
import PageHeading from "../../Components/Shared/PageHeading";
import { useGetAllSubscriptionQuery } from "../../redux/api/subscriptionApi";

const AllUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [page, setPage] = useState(1);

  // Fetch subscriptions
  const { data, isLoading, isError } = useGetAllSubscriptionQuery({
    page,
    limit: 10,
  });

  const subscriptions = data?.data?.all_subscription || [];

  // Show details modal
  const showModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_, __, index) => {
        return (page - 1) * 10 + index + 1;
      },
    },
    {
      title: "Plan Name",
      dataIndex: "subscriptionName",
      key: "subscriptionName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Features",
      key: "features",
      render: (_, record) => (
        <ul className="list-disc pl-5">
          {record.featuresList?.map((f) => (
            <li key={f._id}>{f.value}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => showModal(record)}
          className="bg-[#00823b] text-white px-4 py-2 rounded-md"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="Subscription Management" />
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="relative w-full sm:w-[300px] ">
            <input
              type="text"
              placeholder="Search..."
              className="border-2 border-[#00823b] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
            />
            <span className=" text-gray-400 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
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
          dataSource={subscriptions}
          columns={columns}
          rowKey="_id"
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 2,
            total: data?.data?.meta?.total || 0,
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
          {selectedPlan && (
            <div className="p-5">
              <h1 className="text-3xl font-bold text-[#00823b] mb-3">
                {selectedPlan.subscriptionName}
              </h1>
              <p className="text-lg font-semibold mb-2">
                Price: ${selectedPlan.price}
              </p>
              <p className="mb-4">{selectedPlan.description}</p>
              <h3 className="text-lg font-semibold">Features:</h3>
              <ul className="list-disc pl-5">
                {selectedPlan.featuresList?.map((f) => (
                  <li key={f._id}>{f.value}</li>
                ))}
              </ul>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default AllUsers;
