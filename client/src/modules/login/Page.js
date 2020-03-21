import React, { Component } from 'react';
import { Form, Button, Alert, Divider, Card, Row } from 'antd';
import { Link, Redirect } from 'react-router-dom'
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
      isAuthenticated: false,
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
        else
          this.setState({isAuthenticated: true})
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div style={{width: 400, marginBottom: "100px"}}>
        <Card>
          <h1 style={{marginBottom: 20}}>Login</h1>
          <Form name="normal_login" className="login-form" onFinish={this.onSubmit}>
            <UserNameInput/>
            <PasswordInput/>

            {this.state.showAlert ? <Alert message={this.state.alertMsg} type="error" showIcon /> : null}

            <Form.Item>
              <Link to="/forgot">Forgot password</Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button"> Log in</Button>
              <Divider/>
              <span>
                <Link to="/dashboard">Continue as guest <br/></Link>
                or <Link to="/register">Register here</Link>
              </span>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Page;