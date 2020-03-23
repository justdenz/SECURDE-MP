import React, { Component } from 'react';
import { Table, Tag, Row, Col, Input, Drawer, Button, Form, Divider } from 'antd';

const dummy_data = [
  {
    key: '1',
    title: 'The Smiths',
    authors: 'John Smith',
    publisher: 'New York Publications',
    publication: 2010,
    status: 0,
  },
  {
    key: '2',
    title: 'The Smiths Part 2',
    authors: 'John Smith',
    publisher: 'New York Publications',
    publication: 2010,
    status: 1,
  },
];
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBook: {},
      drawerVisible: false,
      columns: [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Authors',
          dataIndex: 'authors',
          key: 'authors',
        },
        {
          title: 'Publisher',
          dataIndex: 'publisher',
          key: 'publisher',
        },
        {
          title: 'Year of Publication',
          dataIndex: 'publication',
          key: 'publication',
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          render: status => (
            <span>
              <Tag color={status ? 'green' : 'volcano'}>
                {status ? 'AVAILABLE' : 'RESERVED'}
              </Tag>
            </span>
          ),
        },
        {
          title: 'Actions',
          key: 'action',
          render: (text, record) => (
            <span onClick={() => this.setState({selectedBook: record.title, drawerVisible: true})}>
              <a style={{ marginRight: 16 }}>View Reviews</a>
              {record.status ? <a>Borrow</a> : null}
            </span>
          ),
        },
      ],
    }
  }

  toggleDrawer(drawerVisible){
    this.setState({drawerVisible})
  }

  render() {
    return (
      <div>
        <h1>Library Page</h1>
        <Table columns={this.state.columns} dataSource={dummy_data} />
        <Drawer
          title="Reviews"
          width={720}
          onClose={() => this.toggleDrawer(false)}
          visible={this.state.drawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                onClick={() => this.toggleDrawer(false)}
                style={{ marginRight: 8 }}
              >
                Back
              </Button>
              <Button onClick={() => this.toggleDrawer(false)} type="primary">
                Submit
              </Button>
            </div>
          }
        >
        {/* ADD BOOK REVIEWS HERE */}
          <Divider/>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="review"
                  label="Write a Review for this Book"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter a review!',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="Write your review for this book here" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default Page;