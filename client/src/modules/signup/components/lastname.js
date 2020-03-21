import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input } from "antd";

export default () => {
  return (
    <Form.Item
      name="lastname"
      label="Last Name"
      rules={[
        {
          required: true,
          message: 'Please input your Last Name!',
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};