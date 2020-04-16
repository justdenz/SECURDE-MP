import React from "react";
import "antd/dist/antd.css";
import { Form, Input } from "antd";

export default () => {
  return (
    <Form.Item
      name="answer"
      label="Answer"
      rules={[
        {
          required: true,
          message: 'Please input your answer!',
        },
      ]}
    >
      <Input autoComplete="off"/>
    </Form.Item>
  );
};