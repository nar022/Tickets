import React, { useState } from "react";
import { Tabs, Menu, Dropdown, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./Home.module.css";
import logo from "../../assets/intellicare_logo_white.png";
import PersonalSearch from "../../TicketsComponent/Search/AdvanceSearch";
import AddNewTicket from "../../TicketsComponent/Ticket/AddNewTicket";

const { TabPane } = Tabs;
const { SubMenu } = Menu;

const Home = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeTicketOption, setActiveTicketOption] = useState("Open");
  const [iframeSrc, setIframeSrc] = useState("");
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false); // Separate state for search modal
  const [isNewTicketModalVisible, setIsNewTicketModalVisible] = useState(false); // Separate state for new ticket modal

  const showSearchModal = () => setIsSearchModalVisible(true);
  const closeSearchModal = () => setIsSearchModalVisible(false);

  const showNewTicketModal = () => setIsNewTicketModalVisible(true);
  const closeNewTicketModal = () => setIsNewTicketModalVisible(false);

  const handleSearch = (searchQuery) => {
    console.log("Search Query:", searchQuery);
    closeSearchModal();
  };

  const handleSaveNewTicket = () => {
    console.log("New Ticket Saved");
    closeNewTicketModal();
  };

  const ticketMenuItems = [
    { key: "Open", label: "Open" },
    { key: "My Tickets", label: "My Tickets" },
    { key: "Closed", label: "Closed" },
    { key: "Search", label: "Search" },
    { key: "New Ticket", label: "New Ticket" },
  ];

  // Ticket Dropdown Menus
  const searchDropdownMenuItems = [
    {
      key: "AddPersonalSearch",
      label: (
        <>
          <PlusOutlined /> Add Personal Search
        </>
      ),
      onClick: showSearchModal,
    },
  ];

  const createNewTicketMenuItems = [
    {
      key: "AddNewTicket",
      label: (
        <>
          <PlusOutlined /> Create New Ticket
        </>
      ),
      onClick: showNewTicketModal,
    },
  ];

  const handleTicketOptionClick = (key) => {
    if (key && key !== "Closed") {
      setActiveTicketOption(key);
      setIframeSrc(`/tickets/${key.toLowerCase()}`);
    }
  };

  const handleSubMenuClick = (event, path) => {
    event.preventDefault();
    setIframeSrc(path);
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
          <Menu
            mode="horizontal"
            selectedKeys={[activeTicketOption]}
            onClick={({ key }) => handleTicketOptionClick(key)}
            className={styles.ticketMenu}
          >
            {ticketMenuItems.map((item) =>
              item.key === "Search" ? (
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

          {/* Search Modal */}
          <Modal
            title="Advanced Ticket Search"
            visible={isSearchModalVisible}
            onCancel={closeSearchModal}
            footer={null}
            width={800}
            className={styles.modal}
          >
            <PersonalSearch
              onClose={closeSearchModal}
              onSearch={handleSearch}
            />
          </Modal>

        {/* New Ticket Modal */}
          <Modal
            title="Create New Ticket"
            visible={isNewTicketModalVisible}
            onCancel={closeNewTicketModal}
            footer={null}
            width={800}
            className={styles.modal}
          >
            {/* Render only the form */}
            <AddNewTicket
              onClose={closeNewTicketModal}
              onSave={handleSaveNewTicket}
            />
          </Modal>


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
