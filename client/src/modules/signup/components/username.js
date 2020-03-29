import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input } from "antd";

export default () => {
  return (
    <Form.Item
      name="username"
      label="Username"
      rules={[
        {
          required: true,
          message: 'Please input your Username!',
        },
      ]}
    >
      <Input autoComplete="off"/>
    </Form.Item>
  );
};