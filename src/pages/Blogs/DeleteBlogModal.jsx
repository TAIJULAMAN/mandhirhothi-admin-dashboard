// DeleteBlogModal.jsx
import React from "react";
import { Modal, message } from "antd";
import img from "../../assets/block.png";

const DeleteBlogModal = ({ isOpen, onClose, onConfirm }) => {
  const handleDelete = () => {
    onConfirm();
    message.success('Blog deleted successfully!');
  };

  return (
    <Modal 
      open={isOpen} 
      centered 
      onCancel={onClose} 
      footer={null}
      width={500}
    >
      <div className="flex flex-col justify-center items-center py-10">
        <img src={img} alt="Confirmation" className="w-40 h-40 mb-5" />
        <p className="text-3xl text-center text-gray-800 font-bold mb-2">Warning</p>
        <p className="text-lg text-center mt-2 mb-6 text-gray-600">
          Are you sure you want to delete this blog?
        </p>
        
        {/* {blogData && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 w-full">
            {blogData["blog-image"] && (
              <div className="flex justify-center mb-3">
                <img 
                  src={blogData["blog-image"]} 
                  alt="Blog preview" 
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}
            <h4 className="font-semibold text-gray-800 mb-2">{blogData["blog-title"]}</h4>
            <p className="text-sm text-gray-700 line-clamp-3">
              {blogData["blog-description"]}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              — {blogData.author}
            </p>
          </div>
        )} */}

        <div className="flex justify-center gap-4 w-full">
          <button
            onClick={onClose}
            className="border-2 border-[#00823b] text-[#00823b] font-semibold w-1/3 py-3 px-5 rounded-lg hover:bg-[#00823b] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white font-semibold cursor-pointer w-1/3 py-3 px-5 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBlogModal;