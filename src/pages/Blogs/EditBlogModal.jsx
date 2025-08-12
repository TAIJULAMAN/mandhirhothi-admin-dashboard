// EditBlogModal.jsx
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

const EditBlogModal = ({ isOpen, onClose, onSave, blogData }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (blogData && isOpen) {
      form.setFieldsValue({
        "blog-title": blogData["blog-title"],
        "blog-description": blogData["blog-description"],
        author: blogData.author,
        date: moment(blogData.date),
      });
      setImageUrl(blogData["blog-image"] || '');
    }
  }, [blogData, isOpen, form]);

  const handleSave = async (values) => {
    try {
      const updatedBlog = {
        "blog-title": values["blog-title"],
        "blog-description": values["blog-description"],
        author: values.author,
        date: values.date.format('YYYY-MM-DD'),
        "blog-image": imageUrl || blogData?.["blog-image"],
      };
      
      onSave(updatedBlog);
      message.success('Blog updated successfully!');
      form.resetFields();
      setImageUrl('');
    } catch (error) {
      message.error('Failed to update blog!', error.message);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setImageUrl('');
    onClose();
  };

  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setImageUrl(info.file.response?.url || URL.createObjectURL(info.file.originFileObj));
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    maxCount: 1,
  };

  return (
    <Modal
      title={<span style={{ color: '#00823b', fontSize: '24px', fontWeight: 'bold' }}>Edit Blog</span>}
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
      >
        <Form.Item
          label={<span className="font-semibold text-gray-700">Blog Image</span>}
          name="image"
        >
          <div className="space-y-3">
            {imageUrl && (
              <div className="flex justify-center">
                <img 
                  src={imageUrl} 
                  alt="Blog preview" 
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
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
              className="bg-[#00823b] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#006d32] transition-colors"
            >
              Update Blog
            </button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBlogModal;