import React, { Component } from 'react';
import { Form, Button, Alert, Card, message } from 'antd';
import { Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';

import UserNameInput from "./components/username"
import PasswordInput from "./components/password"

class Page extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = values => {
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: values.username, password: values.password})
    }
    fetch("http://localhost:8000/admin/validate_login", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR"){
          message.error(res.payload)
        }
        else{
          message.success("Successfully logged in!")
          this.props.toggleIsAuthorized(true)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div style={{width: 400, marginBottom: "100px", marginTop: "100px"}}>
        <Card>
          <h1 style={{marginBottom: 20}}>Admin</h1>
          <Form name="normal_login" className="login-form" onFinish={this.onSubmit}>
            <UserNameInput/>
            <PasswordInput/>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button"> Log in</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Page;