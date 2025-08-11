import { Modal, Form, Input } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import PageHeading from "../../Components/Shared/PageHeading";

const FAQ = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const faqData = [

    {
      question: "How do I find businesses for sale?",
      answer: "You can browse our marketplace, use filters to narrow down your search, and contact sellers directly through our platform."
    },
    {
      question: "What should I consider before buying a business?",
      answer: "Consider factors like financial records, business valuation, market potential, and legal requirements. We recommend conducting due diligence."
    },
    {
      question: "Can I get financing to buy a business?",
      answer: "Yes, we partner with financial institutions to offer loan options. You can apply directly through our financing section."
    },
    {
      question: "How long does the buying process usually take?",
      answer: "Depending on the complexity, it can take from a few weeks to a few months. Due diligence and negotiations impact the timeline."
    },
    {
      question: "Is there support available during the buying process?",
      answer: "Yes, we offer buyer guides, consultation services, and legal templates to assist you every step of the way."
    }
  ]





  const handleClick = (index) => {
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  const FAQAccordion = ({ faqs }) => (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-lg">
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => handleClick(index)}
          >
            <div className="flex items-center gap-2">
              <FaRegQuestionCircle className="text-primary" />
              <h3 className="text-lg font-medium">{faq.question}</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#00823b] rounded  px-1.5 py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditModal(faq);
                  }}
                >
                  <CiEdit className="text-xl text-white font-bold" />
                </button>
              </div>
              <div className="bg-[#FECACA] border border-[#EF4444] rounded  px-1.5 py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAdmin(faq);
                  }}
                >
                  <RiDeleteBin6Line className="text-xl text-[#EF4444] font-bold" />
                </button>
              </div>
              <FaChevronDown
                className={`transition-transform duration-300 ${isAccordionOpen === index ? "rotate-180" : ""
                  }`}
              />
            </div>
          </div>
          {isAccordionOpen === index && (
            <div className="p-4 pt-0">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const handleDeleteAdmin = (faq) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this FAQ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  };

  const handleAddFaq = async (values) => {
    Swal.fire({
      icon: "success",
      title: "FAQ Added",
      text: "New FAQ was added successfully!",
    });
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const handleOpenEditModal = (faq) => {
    editForm.setFieldsValue({
      _id: faq._id,
      question: faq?.question,
      answer: faq?.answer,
    });
    setIsEditModalVisible(true);
  };

  const handleEditFaq = async (values) => {
    Swal.fire({
      icon: "success",
      title: "FAQ Updated",
      text: "FAQ has been updated successfully!",
    });
    setIsEditModalVisible(false);
    editForm.resetFields();
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="FAQ Management" />
        <button
          // type="submit"
          onClick={() => setIsAddModalVisible(true)}
          className="bg-[#00823b] !text-white px-5 py-2 rounded"
        >
          + Add FAQ
        </button>
      </div>

      {/* FAQ Content */}
      <div className="bg-white p-6 rounded-lg">
        <FAQAccordion faqs={faqData} />
      </div>

      {/* Add FAQ Modal */}
      <Modal
        centered
        open={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          form.resetFields();
        }}
        footer={[
          <div key="footer" className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => {
                setIsAddModalVisible(false);
                form.resetFields();
              }}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>
            <button
              onClick={() => form.submit()}
              className="py-2 px-4 rounded-lg bg-[#00823b] !text-white"
            >
              Save
            </button>
          </div>
        ]}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Add FAQ</h2>
          <p className="text-center mb-6 text-gray-700">
            Fill out the details below to add a new FAQ. Ensure the answer provides clarity and helps users quickly
            resolve their queries.
          </p>
          <Form
            requiredMark={false}
            form={form}
            onFinish={handleAddFaq}
            layout="vertical"
          >
            <Form.Item
              name="question"
              label="Question"
              rules={[
                { required: true, message: 'Please enter the question' },
                { max: 200, message: 'Question cannot be longer than 200 characters' }
              ]}
            >
              <Input placeholder="Enter question" />
            </Form.Item>
            <Form.Item
              name="answer"
              label="Answer"
              rules={[
                { required: true, message: 'Please enter the answer' },
                { max: 1000, message: 'Answer cannot be longer than 1000 characters' }
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter answer" />
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Edit FAQ Modal */}
      <Modal
        centered
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          editForm.resetFields();
        }}
        footer={[
          <div key="footer" className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => {
                setIsEditModalVisible(false);
                editForm.resetFields();
              }}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>
            <button
              onClick={() => editForm.submit()}
              className="py-2 px-4 rounded-lg bg-[#00823b] !text-white"
            >
              Save
            </button>
          </div>
        ]}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Edit FAQ</h2>
          <p className="text-center mb-6 text-gray-700">
            Fill out the details below to edit the FAQ. Ensure the answer provides clarity and helps users quickly
            resolve their queries.
          </p>
          <Form
            requiredMark={false}
            form={editForm}
            onFinish={handleEditFaq}
            layout="vertical"
          >
            <Form.Item name="_id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              name="question"
              label="Question"
              rules={[
                { required: true, message: 'Please enter the question' },
                { max: 200, message: 'Question cannot be longer than 200 characters' }
              ]}
            >
              <Input placeholder="Enter question" />
            </Form.Item>
            <Form.Item
              name="answer"
              label="Answer"
              rules={[
                { required: true, message: 'Please enter the answer' },
                { max: 1000, message: 'Answer cannot be longer than 1000 characters' }
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter answer" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default FAQ;
