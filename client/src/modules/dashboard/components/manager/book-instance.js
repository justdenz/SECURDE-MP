import React, { Component } from 'react';
import "antd/dist/antd.css";
import { Form, Row, Select, Table, Button, Modal } from "antd";
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const dummy_data = [
  {
    key: '1',
    bookinstance_id: 2,
    book_id: 2,
  },
]
class Page extends Component {
  state = {
    selectedBookInstance: {},
    books: [],
    instances: [],
    modalVisible: false,
    columns: [
      {
        title: 'Book Instance ID',
        dataIndex: 'bookinstance_id',
        key: 'bookinstance_id',
      },
      {
        title: 'Book Title',
        dataIndex: 'book_id',
        key: 'book_id',
        // render: (book_id) => {
        //   //get the book title corresponding to the book id then display on table
        // }
      },
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => {
          return(
            <span>
              <a style={{ marginRight: 16 }} 
                onClick={() => this.setState({selectedBookInstance: record, modalVisible: true})}>Edit</a>
              <a>Delete</a>
            </span>
          )
        },
      },
    ],
  }

  componentDidMount(){
    //get all book ids then load it to Select
    //get all book instances then load it to the Table
  }

  handleAddBookInstanceSubmit = value => {
    console.log("Value: ", value);
  }

  handleUpdateBookInstance = value => {
    console.log("");
  }

  toggleModal = modalVisible => {
    this.setState({modalVisible})
  }

  render() {
    return (
      <div>
        <h1 style={{marginBottom: 50}}>Book Instances Page</h1>
        <Form layout="inline" hideRequiredMark onFinish={this.handleAddBookInstanceSubmit}>
          <Row style={{width: "100%"}} justify="center">
            <Form.Item
              name="instance"
              rules={[{ required: true, message: 'Please select a book'}]}
            >
              <Select style={{ width: 300 }} placeholder="Please select a book">
                <Option value="Xiaoxiao Fu">Xiaoxiao Fu</Option>
                <Option value="Maomao Zhou">Maomao Zhou</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <PlusOutlined /> Add book instance
              </Button>
            </Form.Item>
          </Row>
        </Form>
        <Table style={{marginTop: 50}} columns={this.state.columns} dataSource={dummy_data}/>
        <Modal
          title="Edit Book Instance"
          visible={this.state.modalVisible}
          onOk={() => this.toggleModal(false)}
          onCancel={() => this.toggleModal(false)}
        >
          <p>Hello World</p>
        </Modal>
      </div>
    );
  }
}

export default Page;