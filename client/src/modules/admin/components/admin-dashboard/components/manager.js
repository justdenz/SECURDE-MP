import React, { Component } from 'react';
import "antd/dist/antd.css";
import { Form, Row, Select, Table, Button, Modal, Tag, message, Radio, Col } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { Firstname, Lastname, Username, Password, Email, IdNum } from "../../../../signup/components/index"

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
class Page extends Component {
  state = {
    managers: [],
    modalVisible: false,
    columns: [
      {
        title: 'User ID',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
      },
      {
        title: 'Username',
        dataIndex: 'user_name',
        key: 'user_name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
    ],
  }

  componentDidMount(){
    this.getAllManagers()
  }

  getAllManagers(){
    fetch("http://localhost:8000/admin/get_all_manager")
      .then(res => res.json())
      .then(res => {
        if(res.status !== "ERROR"){
          console.log(res.payload);
          // let managers = res.payload.map(managers => {
          //   return({
          //     key: book.book_id,
          //     ...book,
          //   })
          // })
          // this.setState({books})
        }
      })
  }

  toggleAddModal = modalVisible => {
    this.setState({modalVisible})
  }

  handleAddManager = values => {
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id_number: values.idnumber, 
        first_name: values.firstname,
        last_name: values.lastname,
        username: values.username,
        password: values.password,
        email: values.email,
        role_name: "MANAGER"
      })
    }
    fetch("http://localhost:8000/user/validate_signup", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          message.error(res.payload)
        else{
          this.toggleAddModal(false);
          message.success("Successfuly created manager!")
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Managers Page</h1>
        <Button type="primary" style={{marginTop: 20, marginBottom: 20}} onClick={() => this.toggleAddModal(true)}>
          <PlusOutlined /> Add amanager
        </Button>
        <Table columns={this.state.columns} dataSource={[]}></Table>

        <Modal
          title="Add Manager"
          visible={this.state.modalVisible}
          footer={null}
          onCancel={() => this.toggleAddModal(false)}
          destroyOnClose
        >
          <Form {...formItemLayout} layout="inline" hideRequiredMark onFinish={this.handleAddManager} scrollToFirstError>
            <Col>
              <Firstname/>
              <Lastname/>
              <Username/>
              <Password/>
              <Email/>
              <IdNum/>
            </Col>
            <Row style={{width: "100%", marginTop: 20}} justify="end">
              <Button onClick={() => this.toggleAddModal(false)} style={{ marginRight: 8 }}>Cancel</Button>
              <Button type="primary" htmlType="submit">Add</Button>
            </Row>      
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Page;