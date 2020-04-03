import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input } from "antd";

export default () => {
  return (
    <div>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          // {
          //   min: 8,
          //   message: 'Minimum of 8 characters'
          // },
          // {
          //   pattern: /^[@#]/,
          //   message: "Password must start with '@' or '#'"
          // },
          // {
          //   pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
          //   message: "Password must be alphanumeric"
          // },
          // {
          //   pattern: /(?=.*[A-Z])/,
          //   message: "Password must contain an upper case letter"
          // },
          // {
          //   pattern: /(?=.*[a-z])/,
          //   message: "Password must contain a lower case letter"
          // },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('Passwords do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </div>
  );
};