import React, { useEffect, useState } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { TbFileDownload } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { useGetPlateSellPaymentsQuery } from "../../redux/api/Earnings/plateSellApi";
import { getImageUrl } from "../../config/envConfig";

const TransactionTable = ({ search = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const queryArgs = { page, limit: pageSize, searchTerm: search };
  const { data, isLoading, refetch } = useGetPlateSellPaymentsQuery(queryArgs, { refetchOnMountOrArgChange: true });
  console.log("plateSell query args:", queryArgs);
  console.log("plateSell data", data);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  // Ensure API includes the latest searchTerm and refetch on changes
  useEffect(() => {
    // Whenever search, page, or pageSize changes, make sure to refetch
    // RTK Query should refetch on arg change, but we call refetch explicitly as requested
    refetch();
  }, [search, page, pageSize, refetch]);

  const rows = (data?.data?.all_payments || []).map((item, idx) => ({
    key: item._id,
    no: (page - 1) * pageSize + idx + 1,
    Buyer: `${item?.buyerId?.fastname || ""} ${item?.buyerId?.lastname || ""}`.trim(),
    Seller: `${item?.sellerId?.fastname || ""} ${item?.sellerId?.lastname || ""}`.trim(),
    date: new Date(item.createdAt).toLocaleDateString(),
    amount: item.price,
    Trx_ID: item._id,
    Plate: item.platesalesId?.registrationId,
    raw: item,
  }));

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Buyer",
      key: "Buyer",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={
              record.raw?.buyerId?.photo
                ? getImageUrl(record.raw?.buyerId?.photo)
                : "https://avatar.iran.liara.run/public/16"
            }
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
            src={
              record.raw?.sellerId?.photo
                ? getImageUrl(record.raw?.sellerId?.photo)
                : "https://avatar.iran.liara.run/public/8"
            }
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
      key: "Plate",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <span className="leading-none">{record?.Plate}</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          {/* <button
            className="border border-[#00823b] rounded-lg p-1 bg-[#cce9ff] text-[#00823b]"
          >
            <TbFileDownload className="w-8 h-8 text-[#00823b]" />
          </button> */}
          <button
            onClick={() => showModal(record.raw)}
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
          dataSource={rows}
          columns={columns}
          pagination={{
            pageSize,
            total: data?.data?.meta?.total || 0,
            current: page,
            showSizeChanger: false,
            onChange: (page) => setPage(page),
          }}
          scroll={{ x: "max-content" }}
          loading={isLoading}
        />

        {/*View Modal */}
        <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
          {selectedUser && (
            <div className="flex flex-col justify-center items-center p-5">
              <div className="max-w-xl w-full mx-auto bg-white">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-semibold text-green-600 mb-2">
                    Transaction Details
                  </h1>
                </div>
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Transaction ID</span>
                    <span className="text-gray-700">{selectedUser._id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Plate</span>
                    <span className="text-gray-700">{selectedUser?.platesalesId?.registrationId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Date</span>
                    <span className="text-gray-700">
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Buyer</span>
                    <span className="text-gray-700">
                      {selectedUser?.buyerId?.fastname} {selectedUser?.buyerId?.lastname}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Seller</span>
                    <span className="text-gray-700">
                      {selectedUser?.sellerId?.fastname} {selectedUser?.sellerId?.lastname}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Email</span>
                    <span className="text-gray-700">{selectedUser?.buyerId?.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Transaction amount</span>
                    <span className="text-gray-700">£{selectedUser?.price}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default TransactionTable;
