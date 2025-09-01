// CreateAdminModal.jsx
import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateAdminMutation } from "../../redux/api/adminApi";

const CreateAdminModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
    const [createAdmin, { isLoading }] = useCreateAdminMutation();

    const handleSave = async (values) => {
      try {
        const newAdmin = {
          fastname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          password: values.password,
          isVerify: true,
          role: "admin",
          photo: imageUrl || "",
        };

        await createAdmin(newAdmin).unwrap();
         message.success("Admin created successfully!");
      } catch (error) {
        message.error("Failed to create admin: " + error.message);
      }
    };

    // React.useEffect(() => {
    //   if (isSuccess) {
       
    //     form.resetFields();
    //     setImageUrl("");
    //     onClose();
    //   }
    //   if (isError) {
    //     message.error("Failed to create admin.");
    //   }
    // }, [isSuccess, isError, form, onClose]);




  const handleImageChange = (info) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(imageUrl);
    }
  };

  return (
    <Modal
      title={<h2 className="text-lg font-bold">Create Admin</h2>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        {/* First Name & Last Name in one row */}
        <div style={{ display: "flex", gap: "10px" }}>
          <Form.Item
            label="First Name"
            name="firstName"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please input the first name!" }]}
          >
            <Input placeholder="John" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input placeholder="Doe" />
          </Form.Item>
        </div>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="abc@gmail.com" />
        </Form.Item>

        {/* Password fields in one row */}
        <div style={{ display: "flex", gap: "10px" }}>
          <Form.Item
            label="New Password"
            name="password"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            style={{ flex: 1 }}
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm the password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>

        {/* Profile Image */}
        <Form.Item label="Profile Image" name="profileImage">
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) message.error("You can only upload image files!");
              return isImage;
            }}
            onChange={handleImageChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ textAlign: "center" }}>
                <UploadOutlined className="text-2xl" />
                <div style={{ marginTop: 8 }}>Upload Image</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {/* Submit button */}
        <Button
          type="primary"
          htmlType="submit"
          block
          style={{
            background: "#0b8f3e",
            borderColor: "#0b8f3e",
            padding: "20px 0",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Creating..." : "Create Admin"}
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateAdminModal;
