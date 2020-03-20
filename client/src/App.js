import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//import LoginForm from "./modules/login/Page"
class App extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = values => {
      console.log(values)
      const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: values.username, password: values.password})
      }
      fetch("http://localhost:8000/validate_login", reqOptions)
        .then(res => res.text())
        .then(res => console.log("Result:", res))
        .catch((error) => {
          console.error(error);
        });
    };

    render() {
        return (
            <div className="App">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onSubmit}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <a className="login-form-forgot" href="">
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
            </div>
        );
    }
}

export default App;

