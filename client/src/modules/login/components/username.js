import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input } from "antd";
import { UserOutlined } from '@ant-design/icons';

export default ({ form }) => {
    const nameError = form.isFieldTouched("username") && form.getFieldError("username");
    return (
        <Form.Item validateStatus={nameError ? "error" : ""} help={nameError || ""}>
        {form.getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
        })(<Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" placeholder="username" />)}
        </Form.Item>
    );
};