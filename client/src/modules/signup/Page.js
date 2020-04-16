import React, { Component } from 'react';
import { Form, Button, Card, message } from 'antd';
import { Link, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.css'

import { Firstname, Lastname, Username, Password, Email, IdNum, Security } from "./components/index"

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
  state = {successSignUp: false};

  onSubmit = values => {
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
        role_name: "EDUCATION"
      })
    }
    fetch("http://localhost:8000/user/validate_signup", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          message.error(res.payload)
        else{
          this.setState({successSignUp: true})
          message.success("Successfuly created an account!")
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div style={{width: 600, marginBottom: "100px"}}>
        {this.state.successSignUp ? <Redirect to="/login" /> :
        <Card>
          <h1 style={{marginBottom: 20}}>Registration</h1>
          <Form {...formItemLayout} name="register" onFinish={this.onSubmit} scrollToFirstError>
            <Firstname/>
            <Lastname/>
            <Username/>
            <Password/>
            <Email/>
            <IdNum/>
            <Security/>
        
            <Button type="primary" htmlType="submit">
                Register
            </Button>
            <Link to="/login">
              <Button style={{marginLeft: 20}}>
                Cancel
              </Button>
            </Link>
            
          </Form>
        </Card>}
      </div>
    );
  }
}

export default Page;