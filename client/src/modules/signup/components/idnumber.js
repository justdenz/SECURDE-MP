import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input } from "antd";

export default () => {
  return (
    <Form.Item
      name="idnumber"
      label="ID Number"
      rules={[
        {
          required: true,
          message: 'Please input your ID number!',
        },
        {
          len: 8,
          message: 'Please input an 8 digit ID number!',
        },
      ]}
    >
      <Input autoComplete="off"/>
    </Form.Item>
  );
};