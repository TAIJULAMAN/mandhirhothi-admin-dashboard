import { Modal, Form, Input, Select } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import PageHeading from "../../Components/Shared/PageHeading";
import {
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetAllFaqQuery,
  useUpdateFaqMutation,
} from "../../redux/api/faqApi";
import Loader from "../../Components/Shared/Loaders/Loader";

const { Option } = Select;

const FAQ = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [createFaq] = useCreateFaqMutation();
  const { data: faData, isLoading, isError } = useGetAllFaqQuery();
  const [deleteFaq] = useDeleteFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load FAQs.</p>;

  const questionTypes = [
    { value: "general", label: "General" },
    { value: "buying", label: "Buying" },
    { value: "selling", label: "Selling" },
    { value: "valuation", label: "Valuation" },
  ];

  const faqData = faData?.data?.allFaqList || [];

  const handleClick = (index) => {
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  const FAQAccordion = ({ faqs }) => (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={faq._id} className="border rounded-lg">
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => handleClick(index)}
          >
            <div className="flex items-center gap-2">
              <FaRegQuestionCircle className="text-primary" />
              <div>
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                  {faq.question_type}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#00823b] rounded px-1.5 py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditModal(faq);
                  }}
                >
                  <CiEdit className="text-xl text-white font-bold" />
                </button>
              </div>
              <div className="bg-[#FECACA] border border-[#EF4444] rounded px-1.5 py-1">
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
                className={`transition-transform duration-300 ${
                  isAccordionOpen === index ? "rotate-180" : ""
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
  }).then((result) => {
    if (result.isConfirmed) {
      deleteFaq(faq._id)
        .unwrap()
        .then(() => {
          Swal.fire("Deleted!", "The FAQ has been deleted.", "success");
        })
        .catch(() => {
          Swal.fire("Error!", "Something went wrong while deleting.", "error");
        });
    }
  });
};


  const handleAddFaq = async (values) => {
    try {
      await createFaq(values).unwrap(); // ✅ unwrap throws error if request fails

      // only shows if API confirms success
      Swal.fire({
        icon: "success",
        title: "FAQ Added",
        text: "New FAQ was added successfully!",
      });

      setIsAddModalVisible(false);
      form.resetFields();
    } catch (error) {
      // error handling
      Swal.fire({
        icon: "error",
        title: "Failed to Add FAQ",
        text: error?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  const handleEditFaq = async (values) => {
    console.log(values);
    try {
      await updateFaq({ _id: values._id, data: values }).unwrap();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Update FAQ",
        text: error?.data?.message || "Something went wrong. Please try again.",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "FAQ Updated",
      text: "FAQ has been updated successfully!",
    });
    setIsEditModalVisible(false);
    editForm.resetFields();
  };

  const handleOpenEditModal = (faq) => {
    editForm.setFieldsValue({
      _id: faq._id,
      question: faq.question,
      answer: faq.answer,
      question_type: faq.question_type,
    });
    setIsEditModalVisible(true);
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="FAQ Management" />
        <button
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
          </div>,
        ]}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Add FAQ</h2>
          <p className="text-center mb-6 text-gray-700">
            Fill out the details below to add a new FAQ.
          </p>
          <Form
            requiredMark={false}
            form={form}
            onFinish={handleAddFaq}
            layout="vertical"
          >
            <Form.Item
              name="question_type"
              label="Question Type"
              rules={[
                { required: true, message: "Please select question type" },
              ]}
            >
              <Select placeholder="Select question type">
                {questionTypes.map((type) => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="question"
              label="Question"
              rules={[
                { required: true, message: "Please enter the question" },
                {
                  max: 200,
                  message: "Question cannot be longer than 200 characters",
                },
              ]}
            >
              <Input placeholder="Enter question" />
            </Form.Item>
            <Form.Item
              name="answer"
              label="Answer"
              rules={[
                { required: true, message: "Please enter the answer" },
                {
                  max: 1000,
                  message: "Answer cannot be longer than 1000 characters",
                },
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
          </div>,
        ]}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Edit FAQ</h2>
          <p className="text-center mb-6 text-gray-700">
            Update the FAQ details below.
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
              name="question_type"
              label="Question Type"
              rules={[
                { required: true, message: "Please select question type" },
              ]}
            >
              <Select placeholder="Select question type">
                {questionTypes.map((type) => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="question"
              label="Question"
              rules={[
                { required: true, message: "Please enter the question" },
                {
                  max: 200,
                  message: "Question cannot be longer than 200 characters",
                },
              ]}
            >
              <Input placeholder="Enter question" />
            </Form.Item>
            <Form.Item
              name="answer"
              label="Answer"
              rules={[
                { required: true, message: "Please enter the answer" },
                {
                  max: 1000,
                  message: "Answer cannot be longer than 1000 characters",
                },
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
