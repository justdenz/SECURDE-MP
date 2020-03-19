import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Button } from "antd"
import 'antd/dist/antd.css';
import './index.css';

import UserNameInput from "./components/username"
import PasswordInput from "./components/password"

class Page extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        const username = values.username
        const password = values.password
      }
    });
  };

  render() {
    return (
      <Form
        name="normal_login"
        className="login-form"
        onSubmit={e => {this.handleSubmit(e)}}
      >
        <UserNameInput form={this.props.form}/>
        <PasswordInput form={this.props.form}/>
        
        <Form.Item>
          <a className="login-form-forgot" href=""> Forgot password </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <a href="">Sign Up</a>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create()(Page);
export default LoginForm;