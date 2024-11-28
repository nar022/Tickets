import React, { useState, useEffect } from "react";
import { Modal, Select, Input, Checkbox, Button, Tabs } from "antd";
import styles from "./AdvanceSearch.module.css";

const { Option } = Select;
const { TabPane } = Tabs;

const AdvancedSearchPopup = ({ show, onClose, onSearch, onSave }) => {
  const [selectedSearch, setSelectedSearch] = useState("My Searches");
  const [keywords, setKeywords] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedTab, setSelectedTab] = useState("criteria");
  const [useStandardColumns, setUseStandardColumns] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(show);

  useEffect(() => {
    setIsModalVisible(show);
  }, [show]);

  const handleSearchChange = (value) => setSelectedSearch(value);
  const handleKeywordsChange = (event) => setKeywords(event.target.value);
  const handleCheckboxChange = (e) => setUseStandardColumns(e.target.checked);

  const handleSearchClick = () => {
    if (!keywords.trim()) {
      alert("Please enter keywords to search.");
      return;
    }
    if (onSearch) {
      onSearch({ selectedSearch, keywords, selectedFields });
    }
    handleClose();
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setKeywords("");
    setSelectedFields([]);
    setSelectedSearch("My Searches");
    setSelectedTab("criteria");
    setUseStandardColumns(false);
    if (onClose) onClose();
  };

  return (
    <Modal
      title="Advanced Ticket Search"
      visible={isModalVisible}
      onCancel={handleClose}
      footer={null}
      width="50%" /* Modal width is flexible */
      className={styles.modal}
    >
      <div className={styles.modalBody}>
        <div className={styles.searchField}>
          <Select
            value={selectedSearch}
            onChange={handleSearchChange}
            style={{ width: "100%" }}
          >
            <Option value="My Searches">--My Searches--</Option>
            <Option value="closed">Closed</Option>
            <Option value="closedThisMonth">Closed/This Month</Option>
            <Option value="closedThisQuarter">Closed/This Quarter</Option>
            <Option value="closedThisWeek">Closed/This Week</Option>
            <Option value="closedThisYear">Closed/This Year</Option>
          </Select>
        </div>
        <Tabs
          activeKey={selectedTab}
          onChange={(key) => setSelectedTab(key)}
          tabPosition="top"
        >
          <TabPane tab="Criteria" key="criteria">
            <div className={styles.inputField}>
              <Input
                value={keywords}
                onChange={handleKeywordsChange}
                placeholder="Keywords - Optional"
              />
            </div>
            <div className={styles.checkboxGroup}>
              <Checkbox className={styles.checkbox}>
                Ticket Status / Status Name
              </Checkbox>
              <Checkbox className={styles.checkbox}>
                Ticket Status / State
              </Checkbox>
              <Checkbox className={styles.checkbox}>Department</Checkbox>
              <Checkbox className={styles.checkbox}>Assignee</Checkbox>
              <Checkbox className={styles.checkbox}>Help Topic</Checkbox>
              <Checkbox className={styles.checkbox}>Create Date</Checkbox>
              <Checkbox className={styles.checkbox}>SLA Due Date</Checkbox>
              <Checkbox className={styles.checkbox}>Due Date</Checkbox>
            </div>

            <button type="button" className={styles.savedSearchLink}>
              Saved Search
            </button>

            <div className={styles.searchField}>
              <Select
                value={selectedSearch}
                onChange={handleSearchChange}
                style={{ width: "100%" }}
              >
                <Option value="My Searches">--Add Other Field--</Option>
                <Option value="answered">Answered</Option>
                <Option value="assigned">Assigned</Option>
                <Option value="assignedstaff">Assigned Staff</Option>
                <Option value="attachmentcount">Attachment Count</Option>
                <Option value="closedate">Closed Date</Option>
              </Select>
            </div>
          </TabPane>
          <TabPane tab="Columns" key="columns">
            <div className={styles.checkboxGroup}>
              <Checkbox
                className={styles.checkbox}
                checked={useStandardColumns}
                onChange={handleCheckboxChange}
              >
                Use standard columns
              </Checkbox>
            </div>
            {/* Table for Captions and Labels */}
            <table className={styles.columnsTable}>
              <thead>
                <tr>
                  <th>Column Caption</th>
                  <th>Column Label</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ticket #</td>
                  <td>Ticket #</td>
                </tr>
                <tr>
                  <td>Last Updated</td>
                  <td>Last Updated</td>
                </tr>
                <tr>
                  <td>Subject</td>
                  <td>Subject</td>
                </tr>
                <tr>
                  <td>From</td>
                  <td>From</td>
                </tr>
                <tr>
                  <td>Priority</td>
                  <td>Priority</td>
                </tr>
                <tr>
                  <td>Assigned To</td>
                  <td>Assigned To</td>
                </tr>
                <tr>
                  <td>User Name</td>
                  <td>User Name</td>
                </tr>
                <tr>
                  <td>Assignee</td>
                  <td>Assignee</td>
                </tr>
              </tbody>
            </table>

            {/* Saved Search Link */}
            <button type="button" className={styles.savedSearchLink}>
              Saved Search
            </button>
          </TabPane>
        </Tabs>
      </div>
      <div className={styles.modalFooter}>
        <div className={styles.buttonsContainer}>
          <Button onClick={handleClose} type="primary">
            Close
          </Button>
          <Button onClick={handleSearchClick} type="primary">
            Search
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AdvancedSearchPopup;
