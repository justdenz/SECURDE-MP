import React from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input, Cascader } from "antd";

const questions = [
  {
    value: "In what city did you have your first ever birthday party?",
    label: "In what city did you have your first ever birthday party?",
  },
  {
    value: "What is the last name of your Science class teacher in high school?",
    label: "What is the last name of your Science class teacher in high school?",
  },
  {
    value: "Which company manufactured your first mobile phone?",
    label: "Which company manufactured your first mobile phone?",
  },
  {
    value: "Who was your childhood hero?",
    label: "Who was your childhood hero?",
  },
  {
    value: "Where was your best family vacation?",
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












