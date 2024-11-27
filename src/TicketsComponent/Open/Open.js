import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import {
  EditOutlined,
  UserAddOutlined,
  MergeCellsOutlined,
  LinkOutlined,
  ShareAltOutlined,
} from "@ant-design/icons"; // Import Ant Design icons
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./Open.module.css";

const dataSource = [
  {
    key: "1",
    ticket: "TCKT-001",
    dateClosed: "2024-11-01",
    subject: "Login Issue",
    from: "John Doe",
    closedBy: "Admin A",
  },
  {
    key: "2",
    ticket: "TCKT-002",
    dateClosed: "2024-11-01",
    subject: "Password Reset",
    from: "Jane Smith",
    closedBy: "Admin B",
  },
  {
    key: "3",
    ticket: "TCKT-003",
    dateClosed: "2024-11-01",
    subject: "System Outage",
    from: "Michael Brown",
    closedBy: "Admin C",
  },
  {
    key: "4",
    ticket: "TCKT-004",
    dateClosed: "2024-11-01",
    subject: "Account Lockout",
    from: "Emily Davis",
    closedBy: "Admin D",
  },
  {
    key: "5",
    ticket: "TCKT-005",
    dateClosed: "2024-11-01",
    subject: "Email Not Received",
    from: "Chris Johnson",
    closedBy: "Admin E",
  },
  {
    key: "6",
    ticket: "TCKT-006",
    dateClosed: "2024-11-01",
    subject: "Network Error",
    from: "Sarah White",
    closedBy: "Admin F",
  },
  {
    key: "7",
    ticket: "TCKT-007",
    dateClosed: "2024-11-01",
    subject: "Access Request",
    from: "William Martinez",
    closedBy: "Admin G",
  },
  {
    key: "8",
    ticket: "TCKT-008",
    dateClosed: "2024-11-01",
    subject: "Page Not Loading",
    from: "Jessica Wilson",
    closedBy: "Admin H",
  },
  {
    key: "9",
    ticket: "TCKT-009",
    dateClosed: "2024-11-01",
    subject: "Server Downtime",
    from: "David Thomas",
    closedBy: "Admin I",
  },
  {
    key: "10",
    ticket: "TCKT-010",
    dateClosed: "2024-11-01",
    subject: "VPN Connectivity",
    from: "Olivia Taylor",
    closedBy: "Admin J",
  },
  {
    key: "11",
    ticket: "TCKT-011",
    dateClosed: "2024-11-01",
    subject: "Slow Performance",
    from: "Daniel Harris",
    closedBy: "Admin K",
  },
  {
    key: "12",
    ticket: "TCKT-012",
    dateClosed: "2024-11-01",
    subject: "File Upload Error",
    from: "Megan Lee",
    closedBy: "Admin L",
  },
  {
    key: "13",
    ticket: "TCKT-013",
    dateClosed: "2024-11-01",
    subject: "Data Retrieval Issue",
    from: "Paul King",
    closedBy: "Admin M",
  },
  {
    key: "14",
    ticket: "TCKT-014",
    dateClosed: "2024-11-01",
    subject: "Form Submission Error",
    from: "Anna Lewis",
    closedBy: "Admin N",
  },
  {
    key: "15",
    ticket: "TCKT-015",
    dateClosed: "2024-11-01",
    subject: "User Permissions",
    from: "James Scott",
    closedBy: "Admin O",
  },
];

const columns = [
  {
    title: "Ticket",
    dataIndex: "ticket",
    key: "ticket",
    sorter: (a, b) => a.ticket.localeCompare(b.ticket),
  },
  {
    title: "Date Closed",
    dataIndex: "dateClosed",
    key: "dateClosed",
    sorter: (a, b) => new Date(a.dateClosed) - new Date(b.dateClosed),
    render: (text) => <span>{new Date(text).toLocaleDateString()}</span>, // Format the date
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
    render: (text, record) => (
      <Link to={`/open-details/${record.key}`}>{text}</Link> // Create a link to TodayDetails.js with the ticket key
    ),
  },
  { title: "From", dataIndex: "from", key: "from" },
  { title: "Closed By", dataIndex: "closedBy", key: "closedBy" },
];

const Open = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredData = dataSource.filter(
    (ticket) =>
      ticket.ticket.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.closedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <Input
          className={styles.searchInput}
          placeholder="Search Tickets"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
        />
        <Button
          className={styles.searchButton}
          onClick={() => handleSearch(searchTerm)}
        >
          Search
        </Button>
      </div>

      <div className={styles.headerContainer}>
        <h2 className={styles.header}>Open</h2>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.actionButton}
            icon={<EditOutlined />}
            style={{ backgroundColor: "#1890ff", borderColor: "#52c41a" }}
          >
            Change Status
          </Button>
          <Button
            className={styles.actionButton}
            icon={<UserAddOutlined />}
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            Assign
          </Button>
          <Button
            className={styles.actionButton}
            icon={<MergeCellsOutlined />}
            style={{ backgroundColor: "#1890ff", borderColor: "#faad14" }}
          >
            Merge
          </Button>
          <Button
            className={styles.actionButton}
            icon={<LinkOutlined />}
            style={{ backgroundColor: "#1890ff", borderColor: "#722ed1" }}
          >
            Link
          </Button>
          <Button
            className={styles.actionButton}
            icon={<ShareAltOutlined />}
            style={{ backgroundColor: "#1890ff", borderColor: "#ff4d4f" }}
          >
            Transfer
          </Button>
        </div>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        rowSelection={{
          type: "checkbox",
        }}
        pagination={{ pageSize: 10 }}
        className={styles.table}
      />
    </div>
  );
};

export default Open;
