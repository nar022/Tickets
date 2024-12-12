import React, { useState } from "react";
import { Tabs, Menu, Dropdown, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./Home.module.css";
import logo from "../../assets/intellicare_logo_white.png";
import AdvancedSearchPopup from "../../TicketsComponent/Search/AdvanceSearch";
import AddNewTicket from "../../TicketsComponent/Ticket/AddNewTicket";

const { TabPane } = Tabs;
const { SubMenu } = Menu;

const Home = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [iframeSrc, setIframeSrc] = useState("");
  const [modalVisibility, setModalVisibility] = useState({
    advancedSearch: false,
    newTicket: false,
  });

  const toggleModal = (modalKey, isVisible) => {
    setModalVisibility((prev) => ({ ...prev, [modalKey]: isVisible }));
    if (modalKey === "newTicket" && isVisible) {
      setIframeSrc("/tickets/newticketdetails");
    }
  };

  const menuItems = {
    open: [
      { key: "Open", label: "Open", path: "/tickets/open" },
      { key: "Answered", label: "Answered", path: "/tickets/answered" },
      { key: "Overdue", label: "Overdue", path: "/tickets/overdue" },
    ],
    myTickets: [
      {
        key: "AssignedToMe",
        label: "Assigned To Me",
        path: "/tickets/assignedtome",
      },
      {
        key: "AssignedToTeam",
        label: "Assigned To Team",
        path: "/tickets/assignedtoteam",
      },
      {
        key: "AddPersonQueue",
        label: (
          <>
            <PlusOutlined /> Add Personal Queue
          </>
        ),
      },
    ],
    closed: [
      { key: "today", label: "Today", path: "/tickets/closed/today" },
      {
        key: "yesterday",
        label: "Yesterday",
        path: "/tickets/closed/yesterday",
      },
      {
        key: "this-week",
        label: "This Week",
        path: "/tickets/closed/this-week",
      },
      {
        key: "this-month",
        label: "This Month",
        path: "/tickets/closed/this-month",
      },
      {
        key: "this-quarter",
        label: "This Quarter",
        path: "/tickets/closed/this-quarter",
      },
      {
        key: "this-year",
        label: "This Year",
        path: "/tickets/closed/this-year",
      },
    ],
  };

  const createMenu = (items, modalKey = null) => (
    <Menu>
      {items.map(({ key, label, path }) => (
        <Menu.Item
          key={key}
          onClick={() =>
            path ? setIframeSrc(path) : toggleModal(modalKey, true)
          }
        >
          {label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={styles.container}>
      <div>
        <header className={styles.header}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </header>
      </div>

      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarStyle={{ marginBottom: 20 }}
        className={styles.tabs}
      >
        <TabPane tab="Dashboard" key="1" />
        <TabPane tab="Users" key="2" />
        <TabPane tab="Tasks" key="3" />
        <TabPane tab="Tickets" key="4">
          <Menu mode="horizontal" className={styles.ticketMenu}>
            <SubMenu key="Open" title="Open">
              {menuItems.open.map(({ key, label, path }) => (
                <Menu.Item key={key} onClick={() => setIframeSrc(path)}>
                  {label}
                </Menu.Item>
              ))}
            </SubMenu>

            <SubMenu key="MyTickets" title="My Tickets">
              {menuItems.myTickets.map(({ key, label, path }) => (
                <Menu.Item key={key} onClick={() => path && setIframeSrc(path)}>
                  {label}
                </Menu.Item>
              ))}
            </SubMenu>

            <Menu.Item key="Closed">
              <Dropdown
                overlay={createMenu(menuItems.closed)}
                trigger={["click"]}
              >
                <Button type="link">Closed</Button>
              </Dropdown>
            </Menu.Item>

            <Menu.Item key="Search">
              <Dropdown
                overlay={createMenu(
                  [{ key: "AdvancedSearch", label: "Advanced Search" }],
                  "advancedSearch"
                )}
                trigger={["click"]}
              >
                <Button type="link">Search</Button>
              </Dropdown>
            </Menu.Item>

            <Menu.Item key="NewTicket">
              <Dropdown
                overlay={createMenu(
                  [
                    {
                      key: "AddNewTicket",
                      label: (
                        <>
                          <PlusOutlined /> Add New Ticket
                        </>
                      ),
                    },
                  ],
                  "newTicket"
                )}
                trigger={["click"]}
              >
                <Button type="link">New Ticket</Button>
              </Dropdown>
            </Menu.Item>
          </Menu>

          <AdvancedSearchPopup
            show={modalVisibility.advancedSearch}
            onClose={() => toggleModal("advancedSearch", false)}
          />

          <Modal
            title="Create New Ticket"
            visible={modalVisibility.newTicket}
            onCancel={() => toggleModal("newTicket", false)}
            footer={null}
            width={800}
            className={styles.modal}
          >
            <AddNewTicket onClose={() => toggleModal("newTicket", false)} />
          </Modal>

          {iframeSrc && (
            <iframe
              src={iframeSrc}
              title="New Ticket Details"
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
