import React, { useState } from "react";
import { Tabs, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./Home.module.css";
import logo from "../../assets/Intellicare_logo.png";

const { TabPane } = Tabs;

const Home = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeTicketOption, setActiveTicketOption] = useState("Open");

  const ticketMenuItems = [
    { key: "Open", label: "Open" },
    { key: "My Tickets", label: "My Tickets" },
    { key: "Closed", label: "Closed" },
    { key: "Search", label: "Search" },
    { key: "New Ticket", label: "New Ticket" },
  ];

  const handleTicketOptionClick = (key) => {
    setActiveTicketOption(key);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </header>

      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        tabBarStyle={{ marginBottom: 20 }}
        className={styles.tabs}
      >
        <TabPane tab="Dashboard" key="1" disabled />
        <TabPane tab="Users" key="2" disabled />
        <TabPane tab="Tasks" key="3" disabled />
        <TabPane tab="Tickets" key="4">
          {/* Horizontal Ticket Options */}
          <Menu
            mode="horizontal"
            selectedKeys={[activeTicketOption]}
            onClick={({ key }) => handleTicketOptionClick(key)}
            className={styles.ticketMenu}
          >
            {ticketMenuItems.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>

          {/* Sub-tabs for "Closed" */}
          <div className={styles.subTabs}>
            <Link to="/today" className={styles.subTabItem}>
              Today
            </Link>
            <Link to="/yesterday" className={styles.subTabItem}>
              Yesterday
            </Link>
            <Link to="/this-week" className={styles.subTabItem}>
              This Week
            </Link>
            <Link to="/this-month" className={styles.subTabItem}>
              This Month
            </Link>
            <Link to="/this-quarter" className={styles.subTabItem}>
              This Quarter
            </Link>
          </div>
        </TabPane>
        <TabPane tab="Knowledgebase" key="5" disabled />
      </Tabs>
    </div>
  );
};

export default Home;
