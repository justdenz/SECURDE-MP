import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, PageHeader, message, Input, Card, Row } from 'antd';
import 'antd/dist/antd.css';
import bcrypt from "../../../../bcrypt"

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
    defaultValue: ""
  }

  onSubmit = values => {
    if(this.props.userType === "ADMIN"){
      const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          admin_id: this.props.user.admin_id, 
          new_password: values.new_password,
        })
      }
      fetch("http://localhost:8000/admin/change_password", reqOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status === "ERROR")
            message.error(res.payload)
          else{
            message.success("Successfuly changed password")
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_id: this.props.user.user_id, 
          new_password: values.new_password,
        })
      }
      fetch("http://localhost:8000/user/change_password", reqOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status === "ERROR")
            message.error(res.payload)
          else{
            message.success("Successfuly changed password")
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  render() {
    const { user, userType } = this.props
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Password Page"
          subTitle="Change the password of your account"
          backIcon={false}
          style={{marginBottom: "20px"}}
        />
        <Row justify="center">
          <Form {...formItemLayout} name="changePassword" onFinish={this.onSubmit} initialValues={{old: "", new_password: "", confirm: ""}} scrollToFirstError>
            <Card style={{width: "600px", marginTop: 80}}>
              <Form.Item
                name="old"
                label="Old Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your old password!',
                  },
                  () => ({
                    validator(rule, value) {
                      if (!value || bcrypt.compare(value, user.password)) 
                        return Promise.resolve();
                      
                      return Promise.reject('Invalid Password!');
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              
              <Form.Item
                name="new_password"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password!',
                  },
                  {
                    min: 8,
                    message: 'Minimum of 8 characters'
                  },
                  {
                    pattern: /^[@#]/,
                    message: "Password must start with '@' or '#'"
                  },
                  {
                    pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
                    message: "Password must be alphanumeric"
                  },
                  {
                    pattern: /(?=.*[A-Z])/,
                    message: "Password must contain an upper case letter"
                  },
                  {
                    pattern: /(?=.*[a-z])/,
                    message: "Password must contain a lower case letter"
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('old') !== value) {
                        return Promise.resolve();
                      }

                      return Promise.reject('Please input a new password!');
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm New Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your new password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('new_password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject('Passwords do not match!');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Row justify="center">
                <Form.Item>
                  <Button style={{marginTop: 20}} type="primary" htmlType="submit">Update</Button>
                </Form.Item>
              </Row>
            </Card>
          </Form>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  user: state.simpleReducer.user,
  userType: state.simpleReducer.userType,
})

export default connect(mapStateToProps, mapDispatchToProps)(Page);