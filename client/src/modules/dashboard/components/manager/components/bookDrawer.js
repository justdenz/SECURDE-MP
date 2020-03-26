import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Row, Col, Select, DatePicker,  } from "antd";

const { Option } = Select;

export default () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter book title' }]}
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
              <Option value="Xiaoxiao Fu">Xiaoxiao Fu</Option>
              <Option value="Maomao Zhou">Maomao Zhou</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="publisher"
            label="Publisher"
            rules={[{ required: true, message: 'Please enter book publisher' }]}
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
              {  min: 4, message: 'Please input a valid year!'},
              {  max: 4, message: 'Please input a valid year!'},
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
              // {  min: 13, message: 'Please input a valid ISBN number!'},
              // {  max: 13, message: 'Please input a valid ISBN number!'},
            ]}
          >
            <Input type="number" autoComplete="off" placeholder="Please enter book ISBN"/>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};