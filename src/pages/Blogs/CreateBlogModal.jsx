// CreateBlogModal.jsx
import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

const CreateBlogModal = ({ isOpen, onClose, onSave }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSave = async (values) => {
    try {
      const newBlog = {
        id: Date.now().toString(), // Generate unique ID
        "blog-title": values["blog-title"],
        "blog-description": values["blog-description"],
        author: values.author,
        date: values.date.format('YYYY-MM-DD'),
        "blog-image": imageUrl || "https://via.placeholder.com/400x300?text=No+Image",
      };
      
      onSave(newBlog);
      message.success('Blog created successfully!');
      form.resetFields();
      setImageUrl('');
    } catch (error) {
      message.error('Failed to create blog!', error.message);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setImageUrl('');
    onClose();
  };

  // Custom upload function that converts image to base64 or blob URL
  const customUpload = ({ file, onSuccess, onError }) => {
    setUploading(true);
    
    // Validate file type
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      onError(new Error('Invalid file type'));
      setUploading(false);
      return;
    }

    // Validate file size
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
      onError(new Error('File too large'));
      setUploading(false);
      return;
    }

    // Create object URL for preview (works locally)
    try {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      message.success(`${file.name} uploaded successfully`);
      onSuccess({ url: objectUrl }, file);
      setUploading(false);
    } catch (error) {
      message.error('Failed to process image');
      onError(error);
      setUploading(false);
    }
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