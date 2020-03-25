import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input } from "antd";
import { LockOutlined } from '@ant-design/icons';

export default () => {
  return (
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
  );
};