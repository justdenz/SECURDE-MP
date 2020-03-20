import React, { Component } from 'react';
import { Form, Button, Alert } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

import UserNameInput from "./components/username"
import PasswordInput from "./components/password"

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertMsg: "",
    }
  }

  onSubmit = values => {
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: values.username, password: values.password})
    }
    fetch("http://localhost:8000/validate_login", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          this.setState({showAlert: true, alertMsg: res.payload})
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={this.onSubmit}
      >
        <UserNameInput/>
        <PasswordInput/>
        {this.state.showAlert ? <Alert message={this.state.alertMsg} type="error" showIcon /> : null}
        <Form.Item>
          <a href="">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export default Page;