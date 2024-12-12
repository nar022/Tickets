import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, DatePicker, message } from "antd";
import styles from "./NewTicketDetails.module.css";

const { Option } = Select;
const { TextArea } = Input;

const NewTicketDetails = () => {
  const [form] = Form.useForm();
  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle form visibility
  const [userData, setUserData] = useState({ firstname: '', emailAdd: ''});
  const [deptData, setDeptData] = useState({ department: ''});
  const [helpTopicData, sethelpTopicData] = useState({ topic: ''});
  const [teamData, setTeamData] = useState({ team: ''});
  const [dataSourceUser, setdataSourceUser] = useState([]);
  const [dataSourceDepartment, setDataSourceDepartment] = useState([]);
  const [dataSourceTopic, setdataSourceTopic] = useState([]);
  const [dataSourceTeam, setdataSourceTeam] = useState([]);

  useEffect(() => {
    getUsers();
    getDepartments();
    getTopics();
    getTeams();
  }, []);

  async function getTeams() {
    try {
      let getTeams = await fetch('https://localhost:7085/api/teams', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
      let respJson = await getTeams.json();
      console.log(respJson.data);
      setdataSourceTeam(respJson.data);
    } catch (error) {
      console.log(error);
    }
  }


  async function getTopics() {
    try {
      let getTopics = await fetch('https://localhost:7085/api/HelpTopics', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
      let respJson = await getTopics.json();
      console.log(respJson.data);
      setdataSourceTopic(respJson.data);
    } catch (error) {
      console.log(error);
    }
  }


  async function getDepartments() {
    try {
      let getDepartments = await fetch('https://localhost:7085/api/departments', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
      let respJson = await getDepartments.json();
      console.log(respJson.data);
      setDataSourceDepartment(respJson.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUsers() {
    try {
      let getUsers = await fetch('https://localhost:7085/api/employees', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
      let respJson = await getUsers.json();
      console.log(respJson.data);
      setdataSourceUser(respJson.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFormSubmit = async (values) => {
    console.log("Ticket Details Submitted:", values);
  
    let Value = {
      TicketRefNo: '',
      Title: '',
      Description: '',
      EmployeeNo: '',
      Email: userData.emailAdd,
      Department: deptData.department,
      SlaPlan: '',
      Assignee: teamData.teamName,
      HelpTopic: helpTopicData.topicDescription,
      TicketStatus: '',
      PostedBy: userData.firstname,
      DueDate: '',
      Topic_Id: '',
      UserNo: '',
    };

    try {
      let postTicket = await fetch('https://localhost:7085/api/tickets', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({Value})
      });

      let respJson = await postTicket.json();
      console.log(respJson);

    } catch (error) {
      console.log(error);
    }

    message.success("Ticket created successfully!");
    setIsFormVisible(false); // Hide form after submission
  };

  const handleFormFailure = (errorInfo) => {
    console.error("Form Submission Failed:", errorInfo);
    message.error("Please correct the errors in the form.");
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Toggle form visibility
  };

  const selectUser = (value, key) => {
    const item = dataSourceUser.filter((user) => user.employeeNo === key);
    console.log('item', item);
    setUserData(item);
    console.log(value, key); 
  }; 

  const selectDepartment = (value, key) => {
    const item = dataSourceDepartment.filter((dept) => dept.id === key);
    console.log('item', item);
    setDeptData(item);
    console.log(value, key); 
  }; 

  const selectTopic = (value, key) => {
    const item = dataSourceTopic.filter((topic) =>topic.id === key);
    console.log('item', item);
    sethelpTopicData(item);
    console.log(value, key); 
  }; 

  const selectTeam = (value, key) => {
    const item = dataSourceTeam.filter((teams) =>teams.id === key);
    console.log('item', item);
    setTeamData(item);
    console.log(value, key); 
  }; 

  return (
    <div className={styles.container}>
        <div className={styles.ticketFormWrapper}>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleFormSubmit}
            onFinishFailed={handleFormFailure}
            className={styles.ticketForm}
          >
            <h2 className={styles.title}>Open a New Ticket</h2>

            {/* User Selection */}
            <Form.Item
              label="User"
              name="user"
              rules={[{ required: true, message: "Please select a user!" }]}
            >
              <Select placeholder="Select User" onChange={(value, key) => selectUser(value, key)}>
                {dataSourceUser.length > 0 && (
                  <>
                    {dataSourceUser.map((employee) => (
                      <Option key={employee.employeeNo || `user-${employee.employeeNo}`} value={employee.firstname}>
                        {employee.firstname}
                      </Option>
                    ))}
                  </>
                )}
              </Select>
            </Form.Item>

            {/* Ticket Details */}
            <Form.Item
              label="Ticket Source"
              name="ticketSource"
              rules={[{ required: true, message: "Please select a ticket source!" }]}
            >
              <Select placeholder="Select Source">
                <Option value="phone">Phone</Option>
                <Option value="email">Email</Option>
                <Option value="web">Web</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Help Topic"
              name="helpTopic"
              rules={[{ required: true, message: "Please select a help topic!" }]}
            >
             <Select placeholder="Select a help topic" onChange={(value, key) => selectTopic(value, key)}>
                {dataSourceTopic.length > 0 && (
                  <>
                    {dataSourceTopic.map((topic) => (
                      <Option key={topic.topicId || `user-${topic.topicId}`} value={topic.topicDescription}>
                        {topic.topicDescription}
                      </Option>
                    ))}
                  </>
                )}
                </Select>
            </Form.Item>

            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true, message: "Please select a department!" }]}
            >
               <Select placeholder="Select Department" onChange={(value, key) => selectDepartment(value, key)}>
                {dataSourceDepartment.length > 0 && (
                  <>
                    {dataSourceDepartment.map((dept) => (
                      <Option key={dept.department_id || `user-${dept.department1}`} value={dept.department1}>
                        {dept.department1}
                      </Option>
                    ))}
                  </>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="Due Date"
              name="dueDate"
              rules={[{ required: true, message: "Please select a due date!" }]}
            >
              <DatePicker showTime className={styles.datePicker} />
            </Form.Item>

            <Form.Item
              label="Assign To"
              name="assignTo"
              rules={[{ required: true, message: "Please select an assignee!" }]}
            >
              <Select placeholder="Select Team or Assignee" onChange={(value, key) => selectTeam(value, key)}>
                {dataSourceTeam.length > 0 && (
                  <>
                    {dataSourceTeam.map((teams) => (
                      <Option key={teams.teamId || `user-${teams.teamId}`} value={teams.teamName}>
                        {teams.teamName}
                      </Option>
                    ))}
                  </>
                )}
              </Select>
            </Form.Item>
            
            <Form.Item
              label="Issue Summary"
              name="issuesumm"
              rules={[{ required: true, message: "Please provide an issue summary!" }]}
            >
              <Input placeholder="Issue summary of the ticket" />
            </Form.Item>
            

            <Form.Item
              label="Response"
              name="response"
              rules={[{ required: true, message: "Please provide a response!" }]}
            >
              <TextArea rows={4} placeholder="Initial response for the ticket" />
            </Form.Item>

            {/* Additional Options */}
            <Form.Item label="Ticket Status" name="ticketStatus">
              <Select placeholder="Open">
                <Option value="open">Open</Option>
                <Option value="closed">Closed</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Internal Note" name="internalNote">
              <TextArea rows={4} placeholder="Optional internal note" />
            </Form.Item>

            {/* Action Buttons */}
            <Form.Item>
              <div className={styles.buttonGroup}>
                <Button
                  type="default"
                  className={styles.cancelButton}
                  onClick={toggleFormVisibility}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" className={styles.openButton}>
                  Open
                </Button>
                <Button htmlType="reset" className={styles.resetButton}>
                  Reset
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
    </div>
  );
};

export default NewTicketDetails;
