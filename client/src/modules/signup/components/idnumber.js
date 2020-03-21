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
          min: 8,
          message: 'Please input a valid ID number!',
        },
      ]}
    >
      <Input/>
    </Form.Item>
  );
};