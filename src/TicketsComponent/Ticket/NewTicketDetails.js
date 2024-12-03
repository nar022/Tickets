import React, { useState } from "react";
import { Button, Form, Input, Select, DatePicker, message } from "antd";
import styles from "./NewTicketDetails.module.css";

const { Option } = Select;
const { TextArea } = Input;

const NewTicketDetails = () => {
  const [form] = Form.useForm();
  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle form visibility

  const handleFormSubmit = (values) => {
    console.log("Ticket Details Submitted:", values);
    message.success("Ticket created successfully!");
    setIsFormVisible(false); // Hide form after submission
  };

  const handleFormFailure = (errorInfo) => {
    console.error("Form Submission Failed:", errorInfo);
    message.error("Please correct the errors in the form.");
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Toggle form visibility
  };

  return (
    <div className={styles.container}>
      <Button type="primary" onClick={toggleFormVisibility}>
        Add User
      </Button>

      {/* Conditionally render a div for the ticket form */}
      {isFormVisible && (
        <div className={styles.ticketFormWrapper}>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleFormSubmit}
            onFinishFailed={handleFormFailure}
            className={styles.ticketForm}
          >
            <h2 className={styles.title}>Open a New Ticket</h2>

            {/* User Selection */}
            <Form.Item
              label="User"
              name="user"
              rules={[{ required: true, message: "Please select a user!" }]}
            >
              <Select placeholder="Select User">
                <Option value="user1">User 1</Option>
                <Option value="user2">User 2</Option>
              </Select>
            </Form.Item>

            {/* Ticket Details */}
            <Form.Item
              label="Ticket Source"
              name="ticketSource"
              rules={[{ required: true, message: "Please select a ticket source!" }]}
            >
              <Select placeholder="Select Source">
                <Option value="phone">Phone</Option>
                <Option value="email">Email</Option>
                <Option value="web">Web</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Help Topic"
              name="helpTopic"
              rules={[{ required: true, message: "Please select a help topic!" }]}
            >
              <Select placeholder="Select Help Topic">
                <Option value="billing">Billing</Option>
                <Option value="technical">Technical Support</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true, message: "Please select a department!" }]}
            >
              <Select placeholder="Select Department">
                <Option value="sales">Sales</Option>
                <Option value="support">Support</Option>
              </Select>
            </Form.Item>

            <Form.Item label="SLA Plan" name="slaPlan">
              <Select placeholder="System Default">
                <Option value="default">System Default</Option>
                <Option value="priority">Priority</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Due Date"
              name="dueDate"
              rules={[{ required: true, message: "Please select a due date!" }]}
            >
              <DatePicker showTime className={styles.datePicker} />
            </Form.Item>

            <Form.Item
              label="Assign To"
              name="assignTo"
              rules={[{ required: true, message: "Please select an assignee!" }]}
            >
              <Select placeholder="Select an Agent or Team">
                <Option value="agent1">Agent 1</Option>
                <Option value="team1">Team 1</Option>
              </Select>
            </Form.Item>

            {/* Response Details */}
            <Form.Item label="Canned Response" name="cannedResponse">
              <Select placeholder="Select a canned response">
                <Option value="response1">Response 1</Option>
                <Option value="response2">Response 2</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Response"
              name="response"
              rules={[{ required: true, message: "Please provide a response!" }]}
            >
              <TextArea rows={4} placeholder="Initial response for the ticket" />
            </Form.Item>

            {/* Additional Options */}
            <Form.Item label="Ticket Status" name="ticketStatus">
              <Select placeholder="Open">
                <Option value="open">Open</Option>
                <Option value="closed">Closed</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Signature" name="signature">
              <Select placeholder="None">
                <Option value="none">None</Option>
                <Option value="department">Department Signature</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Internal Note" name="internalNote">
              <TextArea rows={4} placeholder="Optional internal note" />
            </Form.Item>

            {/* Action Buttons */}
            <Form.Item>
              <div className={styles.buttonGroup}>
                <Button
                  type="default"
                  className={styles.cancelButton}
                  onClick={toggleFormVisibility}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" className={styles.openButton}>
                  Open
                </Button>
                <Button htmlType="reset" className={styles.resetButton}>
                  Reset
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default NewTicketDetails;
