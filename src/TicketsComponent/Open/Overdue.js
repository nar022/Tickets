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
import styles from "./Overdue.module.css";

// Limit the dataSource to 15 rows
const dataSource = [
  {
    key: "1",
    ticket: "TCKT-001",
    lastUpdated: "2024-11-01",
    subject: "Login Issue",
    from: "John Doe",
    priority: "High",
    assignedTo: "Admin A",
  },
  {
    key: "2",
    ticket: "TCKT-002",
    lastUpdated: "2024-11-01",
    subject: "Password Reset",
    from: "Jane Smith",
    priority: "Medium",
    assignedTo: "Admin B",
  },
  {
    key: "3",
    ticket: "TCKT-003",
    lastUpdated: "2024-11-01",
    subject: "System Outage",
    from: "Michael Brown",
    priority: "Low",
    assignedTo: "Admin C",
  },
  {
    key: "4",
    ticket: "TCKT-004",
    lastUpdated: "2024-11-01",
    subject: "Account Lockout",
    from: "Emily Davis",
    priority: "High",
    assignedTo: "Admin D",
  },
  {
    key: "5",
    ticket: "TCKT-005",
    lastUpdated: "2024-11-01",
    subject: "Email Not Received",
    from: "Chris Johnson",
    priority: "Low",
    assignedTo: "Admin E",
  },
  {
    key: "6",
    ticket: "TCKT-006",
    lastUpdated: "2024-11-01",
    subject: "Network Error",
    from: "Sarah White",
    priority: "Medium",
    assignedTo: "Admin F",
  },
  {
    key: "7",
    ticket: "TCKT-007",
    lastUpdated: "2024-11-01",
    subject: "Access Request",
    from: "William Martinez",
    priority: "High",
    assignedTo: "Admin G",
  },
  {
    key: "8",
    ticket: "TCKT-008",
    lastUpdated: "2024-11-01",
    subject: "Page Not Loading",
    from: "Jessica Wilson",
    priority: "Medium",
    assignedTo: "Admin H",
  },
  {
    key: "9",
    ticket: "TCKT-009",
    lastUpdated: "2024-11-01",
    subject: "Server Downtime",
    from: "David Thomas",
    priority: "High",
    assignedTo: "Admin I",
  },
  {
    key: "10",
    ticket: "TCKT-010",
    lastUpdated: "2024-11-01",
    subject: "VPN Connectivity",
    from: "Olivia Taylor",
    priority: "Low",
    assignedTo: "Admin J",
  },
  {
    key: "11",
    ticket: "TCKT-011",
    lastUpdated: "2024-11-01",
    subject: "Slow Performance",
    from: "Daniel Harris",
    priority: "Medium",
    assignedTo: "Admin K",
  },
  {
    key: "12",
    ticket: "TCKT-012",
    lastUpdated: "2024-11-01",
    subject: "File Upload Error",
    from: "Megan Lee",
    priority: "Low",
    assignedTo: "Admin L",
  },
  {
    key: "13",
    ticket: "TCKT-013",
    lastUpdated: "2024-11-01",
    subject: "Data Retrieval Issue",
    from: "Paul King",
    priority: "Medium",
    assignedTo: "Admin M",
  },
  {
    key: "14",
    ticket: "TCKT-014",
    lastUpdated: "2024-11-01",
    subject: "Form Submission Error",
    from: "Anna Lewis",
    priority: "High",
    assignedTo: "Admin N",
  },
  {
    key: "15",
    ticket: "TCKT-015",
    lastUpdated: "2024-11-01",
    subject: "User Permissions",
    from: "James Scott",
    priority: "Medium",
    assignedTo: "Admin O",
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
    title: "Last Updated",
    dataIndex: "lastUpdated",
    key: "lastUpdated",
    sorter: (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated),
    render: (text) => <span>{new Date(text).toLocaleDateString()}</span>, // Format the date
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
    render: (text, record) => (
      <Link to={`/overdue-details/${record.key}`}>{text}</Link>
    ),
  },
  { title: "From", dataIndex: "from", key: "from" },
  { title: "Priority", dataIndex: "priority", key: "priority" },
  { title: "Assigned To", dataIndex: "assignedTo", key: "assignedTo" },
];

const Overdue = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredData = dataSource.filter(
    (ticket) =>
      ticket.ticket.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className={styles.header}>Overdue</h2>
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
        pagination={{ pageSize: 20 }}
        className={styles.table}
      />
    </div>
  );
};

export default Overdue;
