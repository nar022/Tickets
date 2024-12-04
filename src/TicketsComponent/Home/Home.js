import React, { useState } from "react";
import { Tabs, Menu, Dropdown, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons"; // Import the Plus icon
import styles from "./Home.module.css";
import logo from "../../assets/intellicare_logo_white.png";
import PersonalSearch from "../../TicketsComponent/Search/AdvanceSearch";
import AddNewTicket from "../../TicketsComponent/Ticket/AddNewTicket";

const { TabPane } = Tabs;
const { SubMenu } = Menu; // Import SubMenu from Menu

const Home = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeTicketOption, setActiveTicketOption] = useState("Open");
  const [iframeSrc, setIframeSrc] = useState(""); // To dynamically load content in iframe
  const [isPersonalSearchModalVisible, setIsPersonalSearchModalVisible] = useState(false);
  const [isNewTicketModalVisible, setIsNewTicketModalVisible] = useState(false);

  const showPersonalSearchModal = () => {
    setIsPersonalSearchModalVisible(true);
  };
  
  const showNewTicketModal = () => {
    setIsNewTicketModalVisible(true);
  };
  
  const handlePersonalSearchClose = () => {
    setIsPersonalSearchModalVisible(false);
  };
  
  const handleNewTicketClose = () => {
    setIsNewTicketModalVisible(false);
  };
  
  const handleSearch = (searchQuery) => {
    // Add your search logic here
    console.log(searchQuery);
  };

  const handleSave = () => {
    // Add your save logic here
    console.log("Saved");
    setIsNewTicketModalVisible(false); // Close the modal after saving
  };

  const ticketMenuItems = [
    { key: "Open", label: "Open" },
    { key: "My Tickets", label: "My Tickets" },
    { key: "Closed", label: "Closed" },
    { key: "Search", label: "Search" },
    { key: "New Ticket", label: "New Ticket" },
  ];

  const openSubMenuItems = [
    {
      key: "Open",
      label: (
        <Link
          to="/tickets/open"
          onClick={(e) => handleSubMenuClick(e, "/tickets/open")}
        >
          Open
        </Link>
      ),
    },

    {
      key: "Answered",
      label: (
        <Link
          to="/tickets/anwsered"
          onClick={(e) => handleSubMenuClick(e, "/tickets/answered")}
        >
          Answered
        </Link>
      ),
    },
    {
      key: "Overdue",
      label: (
        <Link
          to="/tickets/overdue"
          onClick={(e) => handleSubMenuClick(e, "/tickets/overdue")}
        >
          Overdue
        </Link>
      ),
    },
  ];

  const myTicketsSubMenuItems = [
    {
      key: "AssignedToMe",
      label: (
        <Link
          to="/tickets/assignedtome"
          onClick={(e) => handleSubMenuClick(e, "/tickets/assignedtome")}
        >
          Assigned To Me
        </Link>
      ),
    },
    {
      key: "AssignedToTeam",
      label: (
        <Link
          to="/tickets/assignedtoteam"
          onClick={(e) => handleSubMenuClick(e, "/tickets/assignedtoteam")}
        >
          Assigned To Team
        </Link>
      ),
    },

    {
      key: "AddPersonQueue",
      label: (
        <>
          <PlusOutlined /> Add Personal Queue
        </>
      ),
    },
  ];

  // Define the items for the "Search" dropdown menu
  const searchDropdownMenuItems = [
    {
      key: "AddPersonalSearch",
      label: (
        <>
          <PlusOutlined /> Add Personal Search
        </>
      ),
      onClick: showPersonalSearchModal,
    },
  ];

  const createNewTicketMenuItems = [
    {
      key: "AddNewTicket",
      label: (
        <>
          <PlusOutlined /> Add New Ticket
        </>
      ),
      onClick: showNewTicketModal,
    },
  ];

  // Define the items for the closed tickets dropdown menu
  const closedDropdownMenuItems = [
    {
      key: "today",
      label: (
        <Link
          to="/tickets/closed/today"
          onClick={(e) => handleSubMenuClick(e, "/tickets/closed/today")}
        >
          Today
        </Link>
      ),
    },
    {
      key: "yesterday",
      label: (
        <Link
          to="/tickets/closed/yesterday"
          onClick={(e) => handleSubMenuClick(e, "/tickets/closed/yesterday")}
        >
          Yesterday
        </Link>
      ),
    },
    {
      key: "this-week",
      label: (
        <Link
          to="/tickets/closed/this-week"
          onClick={(e) => handleSubMenuClick(e, "/tickets/closed/this-week")}
        >
          This Week
        </Link>
      ),
    },
    {
      key: "this-month",
      label: (
        <Link
          to="/tickets/closed/this-month"
          onClick={(e) => handleSubMenuClick(e, "/tickets/closed/this-month")}
        >
          This Month
        </Link>
      ),
    },
    {
      key: "this-quarter",
      label: (
        <Link
          to="/tickets/closed/this-quarter"
          onClick={(e) => handleSubMenuClick(e, "/tickets/closed/this-quarter")}
        >
          This Quarter
        </Link>
      ),
    },
    {
      key: "this-year",
      label: (
        <Link
          to="/tickets/closed/this-year"
          onClick={(e) => handleSubMenuClick(e, "/tickets/closed/this-year")}
        >
          This Year
        </Link>
      ),
    },
  ];

  const handleTicketOptionClick = (key) => {
    if (key && key !== "Closed") {
      setActiveTicketOption(key);
      setIframeSrc(`/tickets/${key.toLowerCase()}`);
    }
  };

  const handleSubMenuClick = (event, path) => {
    event.preventDefault(); // Prevent the default behavior of <Link>
    setIframeSrc(path); // Set the iframe src to the selected path
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
        <TabPane tab="Dashboard" key="1" />
        <TabPane tab="Users" key="2" />
        <TabPane tab="Tasks" key="3" />
        <TabPane tab="Tickets" key="4">
          {/* Horizontal Ticket Options */}
          <Menu
            mode="horizontal"
            selectedKeys={[activeTicketOption]}
            onClick={({ key }) => handleTicketOptionClick(key)}
            className={styles.ticketMenu}
          >
            {ticketMenuItems.map((item) =>
              item.key === "Open" ? (
                <SubMenu key={item.key} title={item.label}>
                  {openSubMenuItems.map((subItem) => (
                    <Menu.Item
                      key={subItem.key}
                      onClick={() => handleTicketOptionClick(subItem.key)}
                    >
                      {subItem.label}
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : item.key === "My Tickets" ? (
                <SubMenu key={item.key} title={item.label}>
                  {myTicketsSubMenuItems.map((subItem) => (
                    <Menu.Item
                      key={subItem.key}
                      onClick={() => handleTicketOptionClick(subItem.key)}
                    >
                      {subItem.label}
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : item.key === "Search" ? (
                <Menu.Item key={item.key}>
                  <Dropdown
                    overlay={<Menu items={searchDropdownMenuItems} />}
                    trigger={["click"]}
                  >
                    <Button type="link" onClick={(e) => e.preventDefault()}>
                      Search
                    </Button>
                  </Dropdown>
                </Menu.Item>
              ) : item.key === "Closed" ? (
                <Menu.Item key={item.key}>
                  <Dropdown
                    overlay={<Menu items={closedDropdownMenuItems} />}
                    trigger={["click"]}
                  >
                    <Button type="link" onClick={(e) => e.preventDefault()}>
                      Closed
                    </Button>
                  </Dropdown>
                </Menu.Item>
              ) : item.key === "New Ticket" ? (
                <Menu.Item key={item.key}>
                  <Dropdown
                    overlay={<Menu items={createNewTicketMenuItems} />}
                    trigger={["click"]}
                  >
                    <Button type="link" onClick={(e) => e.preventDefault()}>
                     New Ticket
                    </Button>
                  </Dropdown>
                </Menu.Item>
              ) : (
                <Menu.Item key={item.key}>{item.label}</Menu.Item>
              )
            )}
          </Menu>

          {/* Modal */}
          <Modal
          title="Advanced Ticket Search"
          visible={isPersonalSearchModalVisible}
          onCancel={handlePersonalSearchClose}
          footer={null}
          width={800}
          className={styles.modal}
        >
          <PersonalSearch
            show={isPersonalSearchModalVisible}
            onClose={handlePersonalSearchClose}
            onSearch={handleSearch}
            onSave={handleSave}
          />
        </Modal>

        <Modal
          title="Create New Tickets"
          visible={isNewTicketModalVisible}
          onCancel={handleNewTicketClose}
          footer={null}
          width={800}
          className={styles.modal}
        >
          <AddNewTicket
            show={isNewTicketModalVisible}
            onClose={handleNewTicketClose}
            onSearch={handleSearch}
            onSave={handleSave}
          />
        </Modal>


          {/* Display iframe based on selected content */}
          {iframeSrc && (
            <iframe
              src={iframeSrc}
              title="Ticket Content"
              className={styles.iframe}
            />
          )}
        </TabPane>
        <TabPane tab="Knowledgebase" key="5" />
      </Tabs>
    </div>
  );
};

export default Home;
