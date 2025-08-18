import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Upload, Button, message, App } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useUpdateBlogMutation } from "../../redux/api/blogApi";


const { TextArea } = Input;

const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
  'image/tiff'
];

const EditBlogModal = ({ isOpen, onClose, blogData }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();

  useEffect(() => {
    if (blogData && isOpen) {
      form.setFieldsValue({
        "blog-title": blogData.blogTitle,
        "blog-description": blogData.content,
        author: "ADMIN", // Default author or from blogData if available
        date: moment(blogData.date || new Date()),
      });
      setImageUrl(blogData.photo || '');
    }
  }, [blogData, isOpen, form]);

  const handleSave = async (values) => {
    try {
      const formData = new FormData();
      formData.append("blogTitle", values["blog-title"]);
      formData.append("content", values["blog-description"]);
      formData.append("author", values.author);
      formData.append("date", values.date.format("YYYY-MM-DD"));
      
      // Only append file if it's a new upload
      if (file) {
        formData.append("file", file);
      } else if (blogData.photo) {
        // If no new file but existing photo, send the existing photo path
        formData.append("photo", blogData.photo);
      }

      // Add the blog ID to the form data
      formData.append("id", blogData._id);

      await updateBlog({ id: blogData._id, formData }).unwrap();

      message.success(`Blog updated successfully!`);
      form.resetFields();
      setImageUrl("");
      setFile(null);
      onClose();
    } catch (error) {
      console.error("Error updating blog:", error);
      message.error(error?.data?.message || "Failed to update blog. Please try again.");
    }
  };

  const customUpload = async ({ file: uploadedFile, onSuccess, onError }) => {
    try {
      // Validate file type
      const isSupportedType = SUPPORTED_IMAGE_TYPES.includes(uploadedFile.type);
      if (!isSupportedType) {
        throw new Error('You can only upload image files (JPG, PNG, GIF, WEBP, SVG, BMP, TIFF)!');
      }

      // Validate file size
      const isLt2M = uploadedFile.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        throw new Error('Image must be smaller than 2MB!');
      }

      // Create preview URL
      const objectUrl = URL.createObjectURL(uploadedFile);
      setImageUrl(objectUrl);
      setFile(uploadedFile);
      onSuccess("Upload successful", uploadedFile);
    } catch (error) {
      message.error(error.message);
      onError(error);
    }
  };

  const handleCancel = () => {
    // Clean up object URL if it's a new upload
    if (imageUrl && imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }
    form.resetFields();
    setImageUrl(blogData?.photo || '');
    setFile(null);
    onClose();
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: SUPPORTED_IMAGE_TYPES.map(type => `.${type.split('/')[1]}`).join(','),
    showUploadList: false,
    beforeUpload: () => false, // Prevent automatic upload
    customRequest: customUpload,
    onChange: ({ file: uploadedFile }) => {
      if (uploadedFile.status === 'removed') {
        setImageUrl(blogData?.photo || '');
        setFile(null);
      }
    }
  };

  return (
    <App>
      <Modal
        title={<span style={{ color: '#00823b', fontSize: '24px', fontWeight: 'bold' }}>Edit Blog</span>}
        open={isOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          className="mt-4"
        >
          <Form.Item
            label={<span className="font-semibold text-gray-700">Blog Image</span>}
          >
            <div className="space-y-3">
              {imageUrl && (
                <div className="flex justify-center">
                  <img 
                    src={imageUrl} 
                    alt="Blog preview" 
                    className="w-full max-h-64 object-contain rounded-lg border border-gray-200"
                  />
                </div>
              )}
              <Upload {...uploadProps}>
                <Button 
                  icon={<UploadOutlined />}
                  style={{ borderColor: '#00823b', color: '#00823b' }}
                >
                  {imageUrl ? 'Change Image' : 'Upload Image'}
                </Button>
              </Upload>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, GIF, WEBP, SVG, BMP, TIFF. Max size: 2MB
              </p>
            </div>
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold text-gray-700">Blog Title</span>}
            name="blog-title"
            rules={[{ required: true, message: 'Please input the blog title!' }]}
          >
            <Input placeholder="Enter blog title" className="h-12" />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold text-gray-700">Blog Description</span>}
            name="blog-description"
            rules={[{ required: true, message: 'Please input the blog description!' }]}
          >
            <TextArea rows={8} placeholder="Enter blog description" />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold text-gray-700">Author</span>}
            name="author"
            rules={[{ required: true, message: 'Please input the author name!' }]}
          >
            <Input placeholder="Enter author name" className="h-12" />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold text-gray-700">Publication Date</span>}
            name="date"
            rules={[{ required: true, message: 'Please select the publication date!' }]}
          >
            <DatePicker className="w-full h-12" />
          </Form.Item>

          <Form.Item className="mb-0 mt-8">
            <div className="flex justify-end gap-4">
              <Button onClick={handleCancel} className="border-2 border-[#00823b] text-[#00823b] font-semibold py-3 px-8 h-auto">
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="bg-[#00823b] text-white font-semibold py-3 px-8 h-auto hover:bg-[#006d32]"
                loading={isLoading}
              >
                Update Blog
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </App>
  );
};

export default EditBlogModal;