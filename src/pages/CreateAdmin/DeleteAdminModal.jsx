// DeleteAdminModal.jsx
import React from "react";
import { Modal } from "antd";
import img from "../../assets/block.png";

const DeleteAdminModal = ({ isOpen, onClose, adminData }) => {
  const handleDelete = () => {
    console.log("Admin data to delete:", adminData);
    onClose();
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
        <p className="text-3xl text-center text-gray-800 font-bold mb-2">
          Warning
        </p>
        <p className="text-lg text-center mt-2 mb-6 text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">
            {adminData?.firstName} {adminData?.lastName}
          </span>
          ?
        </p>
        <p className="text-red-600 text-sm text-center mb-6">
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4 w-full">
          <button
            onClick={onClose}
            className="border-2 border-[#00823b] text-[#00823b] font-semibold w-1/3 py-3 px-5 rounded-lg hover:bg-[#00823b] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white font-semibold w-1/3 py-3 px-5 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAdminModal;
