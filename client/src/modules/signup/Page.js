import React, { Component } from 'react';
import { Form, Button, Card } from 'antd';
import { Link, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.css'

import Firstname from "./components/firstname"
import Lastname from "./components/lastname"
import Username from "./components/username"
import Password from "./components/password"
import Email from "./components/email"
import IdNum from "./components/idnumber"

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
  constructor(props) {
    super(props);
  }

  onSubmit = values => {
    console.log("Values:", values);
  };

  render() {
    return (
      <div style={{width: 600, marginBottom: "100px"}}>
        <Card>
          <h1 style={{marginBottom: 20}}>Registration</h1>
          <Form {...formItemLayout} name="register" onFinish={this.onSubmit} scrollToFirstError>
            <Firstname/>
            <Lastname/>
            <Username/>
            <Password/>
            <Email/>
            <IdNum/>
        
            <Button type="primary" htmlType="submit">
                Register
            </Button>
            <Link to="/login">
              <Button style={{marginLeft: 20}}>
                Cancel
              </Button>
            </Link>
            
          </Form>
        </Card>
      </div>
    );
  }
}

export default Page;