import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input, Cascader } from "antd";

const questions = [
  {
    value: 1,
    label: "In what city did you have your first ever birthday party?",
  },
  {
    value: 2,
    label: "What is the last name of your Science class teacher in high school?",
  },
  {
    value: 3,
    label: "Which company manufactured your first mobile phone?",
  },
  {
    value: 4,
    label: "Who was your childhood hero?",
  },
  {
    value: 5,
    label: "Where was your best family vacation?",
  },
]

export default () => {
  return (
    <div>
      <Form.Item
        name="security"
        label="Security Question"
        rules={[
          {
            required: true,
            message: 'Please select a security question!',
          },
        ]}
      >
        <Cascader options={questions} />
      </Form.Item>

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
    </div>
  );
};












