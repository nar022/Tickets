import React, { useState } from "react";
import { Input, Form, Button, Select, message } from "antd";
import NewTicketDetails from "./NewTicketDetails"; // Import NewTicketDetails
import styles from "./AddNewTicket.module.css";

const { Option } = Select;

const AddNewTicket = () => {
  const [form] = Form.useForm(); // Initialize form instance
  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle NewTicketDetails form visibility

  // Handle form submission
  const handleFormSubmit = (values) => {
    console.log("Form Submitted:", values);
    message.success("User added successfully!");
    setIsFormVisible(true); // Show the NewTicketDetails form after adding a user
  };

  // Handle form failure
  const handleFormFailure = (errorInfo) => {
    console.error("Form Submission Failed:", errorInfo);
    message.error("Please correct the errors in the form.");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search or Add a New User</h2>
      <p className={styles.infoText}>
        Search for an existing user or add a new user to create a ticket.
      </p>

      {/* Form Section */}
      <Form
        layout="vertical"
        form={form} // Connect form instance
        onFinish={handleFormSubmit}
        onFinishFailed={handleFormFailure}
        className={styles.userForm}
      >
        {/* Search Input */}
        <Form.Item>
          <Input
            placeholder="Search by email, phone, or name"
            className={styles.searchInput}
          />
        </Form.Item>

        <div className={styles.divider}></div>

        {/* Create New User Section */}
        <h3 className={styles.formHeading}>Create New User:</h3>

        {/* Email Address */}
        <Form.Item
          label="Email Address:"
          name="email"
          rules={[{ required: true, message: "Email address is required!" }]}>
          <Input placeholder="Enter email address" />
        </Form.Item>

        {/* Full Name */}
        <Form.Item
          label="Full Name:"
          name="fullName"
          rules={[{ required: true, message: "Full name is required!" }]}>
          <Input placeholder="Enter full name" />
        </Form.Item>

        {/* Department Selection */}
        <Form.Item
          label="Department:"
          name="department"
          rules={[{ required: true, message: "Please select a department!" }]}>
          <Select placeholder="— Select —">
            <Option value="sales">Sales</Option>
            <Option value="support">Support</Option>
            <Option value="development">Development</Option>
          </Select>
        </Form.Item>

        {/* Action Buttons */}
        <Form.Item>
          <div className={styles.buttonGroup}>
            <Button
              type="default"
              onClick={() => setIsFormVisible(false)} // Reset visibility if needed
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.addButton}
            >
              Add User
            </Button>
          </div>
        </Form.Item>
      </Form>

      {/* Conditionally Render NewTicketDetails form below menus */}
      {isFormVisible && (
        <div className={styles.ticketDetailsContainer}>
          <NewTicketDetails />
        </div>
      )}
    </div>
  );
};

export default AddNewTicket;
