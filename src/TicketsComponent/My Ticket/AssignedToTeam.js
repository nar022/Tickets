import React, { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
import {
  EditOutlined,
  UserAddOutlined,
  MergeCellsOutlined,
  LinkOutlined,
  ShareAltOutlined,
} from "@ant-design/icons"; // Import Ant Design icons
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./AssignedToTeam.module.css";

const columns = [
  {
    title: "Ticket",
    dataIndex: "ticketNo",
    key: "ticketNo",
    sorter: (a, b) => a.ticketNo.localeCompare(b.ticketNo),
  },
  {
    title: "Last Updated",
    dataIndex: "posted",
    key: "posted",
    sorter: (a, b) => new Date(a.posted) - new Date(b.posted),
    render: (text) => <span>{new Date(text).toLocaleDateString()}</span>, // Format the date
  },
  {
    title: "Subject",
    dataIndex: "title",
    key: "title",
    render: (text, record) => (
      <Link to={`/assignedtoteam-details/${record.key}`}>{text}</Link>
    ),
  },
  { title: "From", dataIndex: "email", key: "email" },
  {
    title: "Priority",
    dataIndex: "slaPlan",
    key: "slaPlan",
    sorter: (a, b) => a.slaPlan.localeCompare(b.slaPlan),
  },
  { title: "Assigned To", dataIndex: "department", key: "department" },
];

const AssignedToTeam = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSourceNew, setdataSourceNew] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  useEffect(() => {
    getTickets();
  }, []);

  async function getTickets() {
    try {
      let getTicket = await fetch(
        "https://localhost:7085/api/tickets/status/open?" +
          new URLSearchParams({ status: "MY TICKETS" }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let respJson = await getTicket.json();

      // Find the department of kmartin
      const kmartinTicket = respJson.data.find(
        (ticket) => ticket.assignee === "John Doe"
      );
      const kmartinDepartment = kmartinTicket ? kmartinTicket.department : null;

      // Filter tickets by the same department as kmartin
      const filteredTickets = respJson.data.filter(
        (ticket) => ticket.department === kmartinDepartment
      );

      setdataSourceNew(filteredTickets);
    } catch (error) {
      console.log(error);
    }
  }

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
        <h2 className={styles.header}>Assigned To Team</h2>
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
        dataSource={dataSourceNew}
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

export default AssignedToTeam;
