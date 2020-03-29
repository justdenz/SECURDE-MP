import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input } from "antd";
import { UserOutlined } from '@ant-design/icons';

export default () => {
  return (
    <Form.Item
      name="username"
      rules={[
          {
          required: true,
          message: 'Please input your Username!',
          },
      ]}
      >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" autoComplete="off"/>
    </Form.Item>
  );
};