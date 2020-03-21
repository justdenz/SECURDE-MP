import React, { Component } from 'react';
import { Form, Button, Alert, Divider, Card, Row } from 'antd';
import { Link } from 'react-router-dom'
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
      <Card>
        <Form name="normal_login" className="login-form" onFinish={this.onSubmit}>
          <UserNameInput/>
          <PasswordInput/>

          {this.state.showAlert ? <Alert message={this.state.alertMsg} type="error" showIcon /> : null}

          <Form.Item>
            <Link to="/forgot"><a>Forgot password</a></Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button"> Log in</Button>
            <Divider/>
            <span>
              <Link to="/dashboard"><a>Continue as Guest <br/></a></Link>
              Or <Link to="/register"><a> register now</a></Link>
            </span>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Page;