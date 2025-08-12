
// AllBlogs.jsx
import React, { useState } from "react";
import { ConfigProvider, Table } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import EditBlogModal from "./EditBlogModal";
import DeleteBlogModal from "./DeleteBlogModal";

const AllBlogs = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([
    {
      id: "1",
      "blog-description": "Switch to a climate-healthy diet with a professional nutritionist. This comprehensive guide will help you understand the impact of your food choices on the environment.",
      "blog-title": "Climate-Healthy Diet Guide",
      author: "Dr. Sarah Johnson",
      date: "2025-05-20",
      "blog-image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    },
    {
      id: "2",
      "blog-description": "10 Morning Habits That Boost Your Productivity. Start your day right with these scientifically-backed habits that will transform your daily routine.",
      "blog-title": "Morning Productivity Habits",
      author: "Michael Chen",
      date: "2025-04-15",
      "blog-image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    },
    {
      id: "3",
      "blog-description": "Why Minimalism is the Key to a Happier Life. Discover how reducing clutter and simplifying your lifestyle can lead to greater peace and satisfaction.",
      "blog-title": "Minimalism for Happiness",
      author: "Emma Thompson",
      date: "2025-03-12",
      "blog-image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    },
    {
      id: "4",
      "blog-description": "How to Save Money Without Sacrificing Quality. Learn practical strategies to cut expenses while maintaining the lifestyle you love.",
      "blog-title": "Smart Money Saving Tips",
      author: "David Wilson",
      date: "2025-05-01",
      "blog-image": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
    },
    {
      id: "5",
      "blog-description": "5 Exercises to Keep Your Heart Healthy. Simple workout routines that anyone can do to maintain cardiovascular health.",
      "blog-title": "Heart Healthy Exercises",
      author: "Lisa Parker",
      date: "2025-02-20",
      "blog-image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    },
    {
      id: "6",
      "blog-description": "The Ultimate Guide to Traveling on a Budget. Explore the world without breaking the bank with these money-saving travel tips.",
      "blog-title": "Budget Travel Guide",
      author: "James Mitchell",
      date: "2025-01-25",
      "blog-image": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    },
    {
      id: "7",
      "blog-description": "The Science of Staying Motivated Every Day. Understanding the psychology behind motivation and how to maintain it consistently.",
      "blog-title": "Daily Motivation Science",
      author: "Dr. Amanda Rodriguez",
      date: "2025-03-02",
      "blog-image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      id: "8",
      "blog-description": "Healthy Lunch Ideas for Busy Professionals. Quick and nutritious meal prep solutions for your workday.",
      "blog-title": "Healthy Professional Lunches",
      author: "Chef Maria Santos",
      date: "2025-05-18",
      "blog-image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400",
    },
    {
      id: "1",
      "blog-description": "Switch to a climate-healthy diet with a professional nutritionist. This comprehensive guide will help you understand the impact of your food choices on the environment.",
      "blog-title": "Climate-Healthy Diet Guide",
      author: "Dr. Sarah Johnson",
      date: "2025-05-20",
      "blog-image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    },
    {
      id: "2",
      "blog-description": "10 Morning Habits That Boost Your Productivity. Start your day right with these scientifically-backed habits that will transform your daily routine.",
      "blog-title": "Morning Productivity Habits",
      author: "Michael Chen",
      date: "2025-04-15",
      "blog-image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    },
    {
      id: "3",
      "blog-description": "Why Minimalism is the Key to a Happier Life. Discover how reducing clutter and simplifying your lifestyle can lead to greater peace and satisfaction.",
      "blog-title": "Minimalism for Happiness",
      author: "Emma Thompson",
      date: "2025-03-12",
      "blog-image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    },
    {
      id: "4",
      "blog-description": "How to Save Money Without Sacrificing Quality. Learn practical strategies to cut expenses while maintaining the lifestyle you love.",
      "blog-title": "Smart Money Saving Tips",
      author: "David Wilson",
      date: "2025-05-01",
      "blog-image": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
    },
    {
      id: "5",
      "blog-description": "5 Exercises to Keep Your Heart Healthy. Simple workout routines that anyone can do to maintain cardiovascular health.",
      "blog-title": "Heart Healthy Exercises",
      author: "Lisa Parker",
      date: "2025-02-20",
      "blog-image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    },
    {
      id: "6",
      "blog-description": "The Ultimate Guide to Traveling on a Budget. Explore the world without breaking the bank with these money-saving travel tips.",
      "blog-title": "Budget Travel Guide",
      author: "James Mitchell",
      date: "2025-01-25",
      "blog-image": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    },
    {
      id: "7",
      "blog-description": "The Science of Staying Motivated Every Day. Understanding the psychology behind motivation and how to maintain it consistently.",
      "blog-title": "Daily Motivation Science",
      author: "Dr. Amanda Rodriguez",
      date: "2025-03-02",
      "blog-image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      id: "8",
      "blog-description": "Healthy Lunch Ideas for Busy Professionals. Quick and nutritious meal prep solutions for your workday.",
      "blog-title": "Healthy Professional Lunches",
      author: "Chef Maria Santos",
      date: "2025-05-18",
      "blog-image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400",
    },
  ]);

  const showEditModal = (blog) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const showDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const handleEditBlog = (updatedBlog) => {
    const updatedBlogs = blogs.map(blog => 
      blog.id === selectedBlog.id 
        ? { ...blog, ...updatedBlog }
        : blog
    );
    setBlogs(updatedBlogs);
    setIsEditModalOpen(false);
  };

  const handleDeleteBlog = () => {
    const updatedBlogs = blogs.filter(blog => blog.id !== selectedBlog.id);
    setBlogs(updatedBlogs);
    setIsDeleteModalOpen(false);
  };

  const columns = [
    {
      title: "Blog",
      key: "content",
      render: (_, record) => (
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img 
              src={record["blog-image"]} 
              alt="Blog thumbnail"
              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
              }}
            />
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <div className="text-gray-900 leading-relaxed">
              {record["blog-title"]}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              — {record.author}
            </div>
          </div>
        </div>
      ),
    },
    { 
      title: "Upload Date", 
      dataIndex: "date", 
      key: "date",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
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
        dataSource={blogs}
        columns={columns}
        rowKey="id"
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 10,
          total: blogs.length,
          current: page,
          showSizeChanger: false,
          onChange: (page) => setPage(page),
        }}
      />

      <EditBlogModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditBlog}
        blogData={selectedBlog}
      />

      <DeleteBlogModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteBlog}
        blogData={selectedBlog}
      />
    </ConfigProvider>
  );
};

export default AllBlogs;