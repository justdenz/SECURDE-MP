import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input } from "antd";
import { LockOutlined } from '@ant-design/icons';

export default ({ form }) => {
    const passwordError = form.isFieldTouched("password") && form.getFieldError("password");
    return (
        <Form.Item validateStatus={passwordError ? "error" : ""} help={passwordError || ""}>
        {form.getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your password!" }]
        })(<Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="password" />)}
        </Form.Item>
    );
};