import React from "react";
import { Input, Form, Button, Select, message } from "antd";
import styles from "./AddNewTicket.module.css";

const { Option } = Select;

const AddNewTicket = ({ onClose, onFormSubmit }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    console.log("Form Submitted:", values);
    message.success("User added successfully!");

    if (onFormSubmit) {
      onFormSubmit(values); // Notify parent about the form submission
    }
    handleClose();
  };

  const handleFormFailure = (errorInfo) => {
    console.error("Form Submission Failed:", errorInfo);
    message.error("Please correct the errors in the form.");
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Ticket</h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFormSubmit}
        onFinishFailed={handleFormFailure}
        className={styles.form}
      >
        <Form.Item
          label="Email Address:"
          name="email"
          rules={[{ required: true, message: "Email address is required!" }]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>
        <Form.Item
          label="Full Name:"
          name="fullName"
          rules={[{ required: true, message: "Full name is required!" }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>
        <Form.Item
          label="Department:"
          name="department"
          rules={[{ required: true, message: "Please select a department!" }]}
        >
          <Select placeholder="Select a department">
            <Option value="sales">Sales</Option>
            <Option value="support">Support</Option>
            <Option value="development">Development</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewTicket;
