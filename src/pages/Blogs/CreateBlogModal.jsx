// CreateBlogModal.jsx
import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useCreateBlogMutation } from "../../redux/api/blogApi"; 

const { TextArea } = Input;

const CreateBlogModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

   const [file, setFile] = useState(null); // ✅ Store the uploaded file
  const [createBlog, { isLoading }] = useCreateBlogMutation(); // ✅ Hook from RTK Query



const handleSave = async (values) => {
  try {
    // Create FormData object for file upload
    const formData = new FormData();
    formData.append("blogTitle", values["blog-title"]);
    formData.append("content", values["blog-description"]);
    formData.append("author", values.author);
    formData.append("date", values.date.format("YYYY-MM-DD"));

    // Append actual image file, not just URL preview
    if (file) {
      formData.append("file", file);
    }

    // Call API mutation
    await createBlog(formData).unwrap();

    message.success("Blog created successfully!");
    form.resetFields();
    setImageUrl("");
    setFile(null);
    onClose();
  } catch (error) {
    message.error(error?.data?.message || "Failed to create blog!");
  }
};



const customUpload = ({ file, onSuccess, onError }) => {
  setUploading(true);

  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
    setUploading(false);
    return onError(new Error('Invalid file type'));
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!');
    setUploading(false);
    return onError(new Error('File too large'));
  }

  try {
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
    setFile(file); // ✅ Keep actual file for API upload
    onSuccess({ url: objectUrl }, file);
    setUploading(false);
  } catch (error) {
    message.error('Failed to process image');
    onError(error);
    setUploading(false);
  }
};


  const handleCancel = () => {
    form.resetFields();
    setImageUrl('');
    onClose();
  };



  const uploadProps = {
    name: 'file',
    customRequest: customUpload,
    beforeUpload: () => false, // Prevent automatic upload since we're using customRequest
    onChange: (info) => {
      if (info.file.status === 'uploading') {
        setUploading(true);
      }
    },
    onRemove: () => {
      // Clean up object URL to prevent memory leaks
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
      setImageUrl('');
      return true;
    },
    maxCount: 1,
    accept: '.jpg,.jpeg,.png',
    showUploadList: false, // We'll show our own preview
  };

  return (
    <Modal
      title={<span style={{ color: '#00823b', fontSize: '24px', fontWeight: 'bold' }}>Create New Blog</span>}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        className="mt-4"
        initialValues={{
          date: moment(), // Set default date to today
        }}
      >
        <Form.Item
          label={<span className="font-semibold text-gray-700">Blog Image</span>}
          name="blog-image"
        >
          <div className="space-y-3">
            {imageUrl && (
              <div className="flex justify-center">
                <div className="relative">
                  <img 
                    src={imageUrl} 
                    alt="Blog preview" 
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (imageUrl.startsWith('blob:')) {
                        URL.revokeObjectURL(imageUrl);
                      }
                      setImageUrl('');
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
            <Upload {...uploadProps}>
              <Button 
                icon={<UploadOutlined />}
                loading={uploading}
                style={{ borderColor: '#00823b', color: '#00823b' }}
              >
                {imageUrl ? 'Change Image' : 'Upload Image'}
              </Button>
            </Upload>
            <p className="text-xs text-gray-500">
              Supported formats: JPG, PNG. Max size: 2MB
            </p>
          </div>
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold text-gray-700">Blog Title</span>}
          name="blog-title"
          rules={[{ required: true, message: 'Please input the blog title!' }]}
        >
          <Input 
            placeholder="Enter blog title"
            className="h-12"
            style={{ borderColor: '#00823b' }}
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold text-gray-700">Blog Description</span>}
          name="blog-description"
          rules={[{ required: true, message: 'Please input the blog description!' }]}
        >
          <TextArea 
            rows={8}
            placeholder="Enter blog description"
            style={{ borderColor: '#00823b' }}
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold text-gray-700">Author</span>}
          name="author"
          rules={[{ required: true, message: 'Please input the author name!' }]}
        >
          <Input 
            placeholder="Enter author name"
            className="h-12"
            style={{ borderColor: '#00823b' }}
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold text-gray-700">Publication Date</span>}
          name="date"
          rules={[{ required: true, message: 'Please select the publication date!' }]}
        >
          <DatePicker 
            className="w-full h-12"
            style={{ borderColor: '#00823b' }}
          />
        </Form.Item>

        <Form.Item className="mb-0 mt-8">
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="border-2 border-[#00823b] text-[#00823b] font-semibold py-3 px-8 rounded-lg hover:bg-[#00823b] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#00823b] !text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#006d32] transition-colors"
            >
              Create Blog
            </button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBlogModal;