import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Row, Col, Select } from "antd";

const { Option } = Select;

export default (props) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: 'Please enter book title' }, 
              { max: 20, message: "Maximum of 20 characters"},
            ]}
          >
            <Input autoComplete="off" placeholder="Please enter book title"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="authors"
            label="Authors"
            rules={[{ required: true, message: 'Please select book author(s)' }]}
          >
            <Select mode="multiple" placeholder="Please select book author(s)">
              {props.options.map(author => <Option key={author.author_id} value={author.author_id}>{author.first_name} {author.last_name}</Option>)}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="publisher"
            label="Publisher"
            rules={[
              { required: true, message: 'Please enter book publisher' },
              { max: 25, message: "Maximum of 25 characters"},
            ]}
          >
            <Input autoComplete="off" placeholder="Please enter book publisher"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="publication"
            label="Year of Publication"
            rules={[
              { required: true, message: 'Please enter year of publication' },
              { pattern: /^(19|20)\d{2}$/, message: "Please enter a year between 1900-2099"},

            ]}
          >
            <Input type="number" placeholder="Enter year of publication"/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="isbn"
            label="ISBN"
            rules={[
              { required: true, message: 'Please enter book ISBN' },
              { min: 10, message: 'Please input a valid ISBN number!'},
              { max: 13, message: 'Please input a valid ISBN number!'},
            ]}
          >
            <Input type="number" autoComplete="off" placeholder="Please enter book ISBN"/>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};