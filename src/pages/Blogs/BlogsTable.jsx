import React, { useState } from "react";
import { ConfigProvider, message, Table } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import EditBlogModal from "./EditBlogModal";
import DeleteBlogModal from "./DeleteBlogModal";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "../../redux/api/blogApi";
import Loader from "../../Components/Shared/Loaders/Loader";
import { getImageBaseUrl } from "../../config/envConfig";

const AllBlogs = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [page, setPage] = useState(1);

  // 🔹 Call your API
  const { data, isLoading, isError } = useGetAllBlogsQuery({ page, limit: 10 });
  const [deleteBlog] = useDeleteBlogMutation();

  // 🔹 Extract blogs safely
  const blogs = data?.data?.allBlogsList || [];
  const onConfirm = async () => {
    if (!selectedBlog?._id) return;

    try {
      await deleteBlog(selectedBlog._id).unwrap();

      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Delete error:", err);
      message.error("Failed to delete blog!");
    }
  };
  const showEditModal = (blog) => {
    setSelectedBlog(blog);
    // console.log(blog)
    //  console.log(selectedBlog, "selectedBlog in showEditModal");
    setIsEditModalOpen(true);
  };

  const showDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const columns = [
    {
      title: "Blog",
      key: "content",
      render: (_, record) => (
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img
              src={getImageBaseUrl() + record.photo}
              alt="Blog thumbnail"
              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/80x80?text=No+Image";
              }}
            />
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <div className="text-gray-900 leading-relaxed">
              {record.blogTitle}
            </div>
            <div className="text-gray-900 leading-relaxed">admin</div>
          </div>
        </div>
      ),
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
      render: (text) => {
        const words = text ? text.split(" ") : [];
        const shortText =
          words.length > 7
            ? words.slice(0, 7).join(" ") + "..."
            : text;
        return shortText;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => showEditModal(record)}
            className="border border-[#00823b] rounded-lg p-1 cursor-pointer text-[#00823b] hover:bg-[#00823b] hover:text-white transition-colors"
            title="Edit Blog"
          >
            <MdEdit className="w-6 h-6" />
          </button>
          <button
            onClick={() => showDeleteModal(record)}
            className="border border-red-500 rounded-lg p-1 cursor-pointer text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            title="Delete Blog"
          >
            <MdDelete className="w-6 h-6" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading)
    return (
      <>
        <Loader></Loader>
      </>
    );
  if (isError) return <p>Failed to load blogs.</p>;

  return (
    <ConfigProvider
      theme={{
        components: {
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
        dataSource={blogs}
        columns={columns}
        rowKey="_id"
        scroll={{ x: "max-content" }}
        loading={isLoading}
        pagination={{
          pageSize: 10,
          total: data?.data?.meta?.total,
          current: page,
          showSizeChanger: false,
          onChange: (page) => setPage(page),
          loading: isLoading,
        }}
      />

      <EditBlogModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        blogData={selectedBlog}
      />

      <DeleteBlogModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirm}
        blogData={selectedBlog}
      />
    </ConfigProvider>
  );
};

export default AllBlogs;
