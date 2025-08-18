// CreateBlogModal.jsx
import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useCreateBlogMutation } from "../../redux/api/blogApi"; 

const { TextArea } = Input;

// Supported image types
const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
  'image/tiff'
];

const CreateBlogModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const handleSave = async (values) => {
    try {
      console.log("Form values:", values); // Log form values
      console.log("Image file:", file); // Log image file

      const formData = new FormData();
      formData.append("blogTitle", values["blog-title"]);
      formData.append("content", values["blog-description"]);
      formData.append("author", values.author);
      formData.append("date", values.date.format("YYYY-MM-DD"));

      if (file) {
        formData.append("file", file);
      }

      await createBlog(formData).unwrap();

      message.success("Blog created successfully!");
      form.resetFields();
      setImageUrl("");
      setFile(null);
      onClose();
    } catch (error) {
      console.error("Error creating blog:", error); // Log error
      message.error(error?.data?.message || "Failed to create blog!");
    }
  };

  const customUpload = ({ file, onSuccess, onError }) => {
    setUploading(true);

    // Check if file type is supported
    const isSupportedType = SUPPORTED_IMAGE_TYPES.includes(file.type);
    if (!isSupportedType) {
      message.error('You can only upload image files (JPG, PNG, GIF, WEBP, SVG, BMP, TIFF)!');
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
      console.log("Generated object URL:", objectUrl); // Log the generated URL
      setImageUrl(objectUrl);
      setFile(file);
      onSuccess({ url: objectUrl }, file);
      setUploading(false);
    } catch (error) {
      console.error("Image processing error:", error); // Log processing error
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
  name: "file",
  customRequest: customUpload,
  beforeUpload: (file) => {
    // Generate local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
    setFile(file);
    return false; // prevent automatic upload
  },
  onRemove: () => {
    if (imageUrl && imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageUrl("");
    setFile(null);
    return true;
  },
  maxCount: 1,
  accept: ".jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.tiff",
  showUploadList: false,
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
          date: moment(),
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
                    className="w-full max-h-64 object-contain rounded-lg border border-gray-200"
                    onLoad={() => console.log("Image loaded successfully")}
                    onError={() => console.log("Image failed to load")}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      console.log("Removing image via button click");
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
              Supported formats: JPG, PNG, GIF, WEBP, SVG, BMP, TIFF. Max size: 2MB
            </p>
          </div>
        </Form.Item>

        {/* Rest of your form items remain the same */}
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
              disabled={uploading || isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Blog'}
            </button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBlogModal;