// Reports.jsx
import React, { useState } from "react";
import { Table, ConfigProvider } from "antd";
import PageHeading from "../../Components/Shared/PageHeading";

export default function Reports() {
  const [page, setPage] = useState(1);

  const columns = [
    { title: "Report From", dataIndex: "from", key: "from" },
    { title: "Report To", dataIndex: "to", key: "to" },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    { title: "Date", dataIndex: "date", key: "date", width: 120 },
  ];

  const data = [
    {
      id: 1,
      from: "John Doe",
      to: "Jane Smith",
      reason: "Inappropriate behavior",
      date: "2025-08-10",
    },
    {
      id: 2,
      from: "Mike Ross",
      to: "Harvey Specter",
      reason: "Spam messages",
      date: "2025-08-11",
    },
    {
      id: 3,
      from: "Rachel Zane",
      to: "Louis Litt",
      reason: "Harassment",
      date: "2025-08-12",
    },
    {
      id: 1,
      from: "John Doe",
      to: "Jane Smith",
      reason: "Inappropriate behavior",
      date: "2025-08-10",
    },
    {
      id: 2,
      from: "Mike Ross",
      to: "Harvey Specter",
      reason: "Spam messages",
      date: "2025-08-11",
    },
    {
      id: 3,
      from: "Rachel Zane",
      to: "Louis Litt",
      reason: "Harassment",
      date: "2025-08-12",
    },
    {
      id: 1,
      from: "John Doe",
      to: "Jane Smith",
      reason: "Inappropriate behavior",
      date: "2025-08-10",
    },
    {
      id: 2,
      from: "Mike Ross",
      to: "Harvey Specter",
      reason: "Spam messages",
      date: "2025-08-11",
    },
    {
      id: 3,
      from: "Rachel Zane",
      to: "Louis Litt",
      reason: "Harassment",
      date: "2025-08-12",
    },
    {
      id: 1,
      from: "John Doe",
      to: "Jane Smith",
      reason: "Inappropriate behavior",
      date: "2025-08-10",
    },
    {
      id: 2,
      from: "Mike Ross",
      to: "Harvey Specter",
      reason: "Spam messages",
      date: "2025-08-11",
    },
    {
      id: 3,
      from: "Rachel Zane",
      to: "Louis Litt",
      reason: "Harassment",
      date: "2025-08-12",
    },
    {
      id: 1,
      from: "John Doe",
      to: "Jane Smith",
      reason: "Inappropriate behavior",
      date: "2025-08-10",
    },
    {
      id: 2,
      from: "Mike Ross",
      to: "Harvey Specter",
      reason: "Spam messages",
      date: "2025-08-11",
    },
    {
      id: 3,
      from: "Rachel Zane",
      to: "Louis Litt",
      reason: "Harassment",
      date: "2025-08-12",
    },
    {
      id: 1,
      from: "John Doe",
      to: "Jane Smith",
      reason: "Inappropriate behavior",
      date: "2025-08-10",
    },
    {
      id: 2,
      from: "Mike Ross",
      to: "Harvey Specter",
      reason: "Spam messages",
      date: "2025-08-11",
    },
    {
      id: 3,
      from: "Rachel Zane",
      to: "Louis Litt",
      reason: "Harassment",
      date: "2025-08-12",
    },
    {
      id: 1,
      from: "John Doe",
      to: "Jane Smith",
      reason: "Inappropriate behavior",
      date: "2025-08-10",
    },
    {
      id: 2,
      from: "Mike Ross",
      to: "Harvey Specter",
      reason: "Spam messages",
      date: "2025-08-11",
    },
    {
      id: 3,
      from: "Rachel Zane",
      to: "Louis Litt",
      reason: "Harassment",
      date: "2025-08-12",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="Reports" />
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
          dataSource={data}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            current: page,
            onChange: (page, pageSize) => {
              setPage(page);
              console.log("Current Page:", page, "Page Size:", pageSize);
              console.log("Total Records:", data.length);
            },
          }}
        />
      </ConfigProvider>
    </>
  );
}
