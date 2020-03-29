import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input } from "antd";

export default () => {
  return (
    <Form.Item
      name="firstname"
      label="First Name"
      rules={[
        {
          required: true,
          message: 'Please input your First Name!',
        },
      ]}
    >
      <Input autoComplete="off"/>
    </Form.Item>
  );
};