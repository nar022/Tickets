import React, { useState } from "react";
import { Input, Button, Row, Col } from "antd";
import styles from "./OverdueDetails.module.css"; // Import the CSS file

const OverdueDetails = () => {
  const [ticketDetails, setTicketDetails] = useState({
    ticketId: "TCKT-001",
    subject: "Login Issue",
    status: "Closed",
    user: "Juan Dela Cruz",
    priority: "Normal",
    email: "sample@intellicare.com.ph",
    department: "Information Technology Department",
    source: "Email",
    createdDate: "10/29/24 2:15 PM",
    dateClosed: "11/20/24 9:26 AM",
    closedBy: "H.O - Marlon Lorida",
    slaPlan: "Custom SLA - 1 Week",
    helpTopic: "Dev Support / Web App Concern",
    lastMessage: "10/29/24 2:15 PM",
    lastResponse: "11/20/24 9:26 AM",
    message: "",
    messageThread: [], // New state for storing the message thread
  });

  // Handler for Post Reply
  const handlePostReply = () => {
    const { subject, message } = ticketDetails;

    if (subject.trim() === "" || message.trim() === "") {
      alert("Please fill out both the subject and message fields.");
    } else {
      // Add message to the message thread
      const newMessage = {
        sender: "Marlon Lorida", // Assuming user sending the message
        message,
        timestamp: new Date().toLocaleString(),
      };
      const updatedMessageThread = [...ticketDetails.messageThread, newMessage];

      // Update ticket details
      setTicketDetails({
        ...ticketDetails,
        message: "", // Clear message field after posting
        messageThread: updatedMessageThread, // Update the message thread
      });

      console.log("Posting reply...");
      console.log("Subject:", subject);
      console.log("Message:", message);
      alert("Reply posted successfully!");
    }
  };

  // Handler for Reset button
  const handleReset = () => {
    setTicketDetails({
      ...ticketDetails,
      message: "", // Reset message field
    });
  };

  return (
    <div className={styles.container}>
      {/* Ticket# and Subject */}
      <div className={styles.ticketHeader}>
        <h3 className={styles.ticketId}>Ticket# {ticketDetails.ticketId}</h3>
        <h4 className={styles.subject}>{ticketDetails.subject}</h4>
      </div>

      {/* Message thread display */}

      {/* Form fields */}
      <div className={styles.formContainer}>
        <Row gutter={16}>
          {/* Status */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>Status</label>
              <Input
                value={ticketDetails.status}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* Priority */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>Priority</label>
              <Input
                value={ticketDetails.priority}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* Department */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>Department</label>
              <Input
                value={ticketDetails.department}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* Created Date */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>Create Date</label>
              <Input
                value={ticketDetails.createdDate}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* User */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>User</label>
              <Input
                value={ticketDetails.user}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* Email */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>Email</label>
              <Input
                value={ticketDetails.email}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* Source */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>Source</label>
              <Input
                value={ticketDetails.source}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* Closed By */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>Closed By</label>
              <Input
                value={ticketDetails.closedBy}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* SLA Plan */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>SLA Plan</label>
              <Input
                value={ticketDetails.slaPlan}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* Close Date */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>Close Date</label>
              <Input
                value={ticketDetails.dateClosed}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* Help Topic */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>Help Topic</label>
              <Input
                value={ticketDetails.helpTopic}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* Last Message */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>Last Message</label>
              <Input
                value={ticketDetails.lastMessage}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* Last Response */}
          <Col span={12}>
            <div className={styles.formField}>
              <label>Last Response</label>
              <Input
                value={ticketDetails.lastResponse}
                className={styles.input}
                readOnly
              />
            </div>
          </Col>

          {/* Message field for reply */}
          <Col span={24}>
            <div className={styles.formField}>
              <label>Message</label>
              <Input.TextArea
                value={ticketDetails.message}
                onChange={(e) =>
                  setTicketDetails({
                    ...ticketDetails,
                    message: e.target.value,
                  })
                }
                className={styles.input}
                rows={4}
              />
            </div>
          </Col>
        </Row>

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <Button
            className={styles.saveButton}
            type="primary"
            onClick={handlePostReply}
          >
            Post Reply
          </Button>
          <Button className={styles.resetButton} onClick={handleReset}>
            Reset
          </Button>
        </div>

        <div className={styles.messageThread}>
          <h4>Message Thread</h4>
          {ticketDetails.messageThread.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            ticketDetails.messageThread.map((msg, index) => (
              <div key={index} className={styles.messageItem}>
                <p className={styles.sender}>
                  <strong>{msg.sender}</strong>{" "}
                  <span className={styles.timestamp}>({msg.timestamp})</span>:
                </p>
                <p className={styles.messageContent}>{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OverdueDetails;
