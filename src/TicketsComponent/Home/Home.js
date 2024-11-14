import React, { useState } from "react";
import { Tabs, Menu } from "antd";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import logo from "../../assets/intellicare_logo_white.png";

const { TabPane } = Tabs;

const Home = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeTicketOption, setActiveTicketOption] = useState("Open");
  const [iframeSrc, setIframeSrc] = useState(""); // To dynamically load content in iframe
  const [isClosedSubMenuVisible, setClosedSubMenuVisible] = useState(false); // Track visibility of the "Closed" submenu

  const ticketMenuItems = [
    { key: "Open", label: "Open" },
    { key: "My Tickets", label: "My Tickets" },
    { key: "Closed", label: "Closed" },
    { key: "Search", label: "Search" },
    { key: "New Ticket", label: "New Ticket" },
  ];

  const handleTicketOptionClick = (key) => {
    setActiveTicketOption(key);
    if (key !== "Closed") {
      setClosedSubMenuVisible(false); // Hide "Closed" submenu when another option is clicked
      setIframeSrc(`/tickets/${key.toLowerCase()}`); // Update iframe src based on the key
    } else {
      setClosedSubMenuVisible(!isClosedSubMenuVisible); // Toggle the "Closed" submenu visibility
      setIframeSrc(""); // Clear iframe src when "Closed" is clicked
    }
  };

  const handleSubMenuClick = (event, path) => {
    event.preventDefault(); // Prevent the default behavior of the <Link> (redirecting to another page)
    setIframeSrc(path); // Set the iframe src to the selected path
    setClosedSubMenuVisible(false); // Hide the submenu after selection
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

          {/* Submenu for "Closed" - Conditional Rendering */}
          {isClosedSubMenuVisible && (
            <div className={styles.subMenu}>
              <Link
                to="/tickets/closed/today"
                className={styles.subMenuItem}
                onClick={(e) => handleSubMenuClick(e, "/tickets/closed/today")}
              >
                Today
              </Link>
              <Link
                to="/tickets/closed/yesterday"
                className={styles.subMenuItem}
                onClick={(e) =>
                  handleSubMenuClick(e, "/tickets/closed/yesterday")
                }
              >
                Yesterday
              </Link>
              <Link
                to="/tickets/closed/this-week"
                className={styles.subMenuItem}
                onClick={(e) =>
                  handleSubMenuClick(e, "/tickets/closed/this-week")
                }
              >
                This Week
              </Link>
              <Link
                to="/tickets/closed/this-month"
                className={styles.subMenuItem}
                onClick={(e) =>
                  handleSubMenuClick(e, "/tickets/closed/this-month")
                }
              >
                This Month
              </Link>
              <Link
                to="/tickets/closed/this-quarter"
                className={styles.subMenuItem}
                onClick={(e) =>
                  handleSubMenuClick(e, "/tickets/closed/this-quarter")
                }
              >
                This Quarter
              </Link>
            </div>
          )}

          {/* Display iframe based on selected content */}
          {iframeSrc && (
            <iframe
              src={iframeSrc}
              title="Ticket Content"
              style={{
                width: "100%",
                height: "500px",
                border: "none",
                marginTop: "20px",
              }}
            />
          )}
        </TabPane>
        <TabPane tab="Knowledgebase" key="5" disabled />
      </Tabs>
    </div>
  );
};

export default Home;
