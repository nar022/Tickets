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
  const [isModalVisible, setIsModalVisible] = useState(show);

  useEffect(() => {
    setIsModalVisible(show);
  }, [show]);

  const handleSearchChange = (value) => setSelectedSearch(value);
  const handleKeywordsChange = (event) => setKeywords(event.target.value);
  const handleFieldChange = (value) => setSelectedFields(value);

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

  const handleSaveClick = () => {
    if (!keywords.trim()) {
      alert("Please enter keywords to save.");
      return;
    }
    if (onSave) {
      onSave({ selectedSearch, keywords, selectedFields });
    }
    handleClose();
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setKeywords("");
    setSelectedFields([]);
    setSelectedSearch("My Searches");
    setSelectedTab("criteria");
    if (onClose) onClose();
  };

  return (
    <Modal
      title="Advanced Ticket Search"
      visible={isModalVisible}
      onCancel={handleClose}
      footer={null}
      width={800}
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
          </TabPane>
          <TabPane tab="Columns" key="columns">
            <div className={styles.dropdown}>
              <label>Add Other Fields</label>
              <Select
                mode="multiple"
                value={selectedFields}
                onChange={handleFieldChange}
                style={{ width: "100%" }}
                placeholder="Select additional fields"
              >
                <Option value="field1">Field 1</Option>
                <Option value="field2">Field 2</Option>
              </Select>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div className={styles.modalFooter}>
        <div className={styles.buttonsContainer}>
          <Button onClick={handleSaveClick} type="primary">
            Save Search
          </Button>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSearchClick} type="default">
            Search
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AdvancedSearchPopup;
